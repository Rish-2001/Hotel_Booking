const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Room = require('../models/room');


router.post('/bookroom', async (req, res) => {
  const {
    room,
    userid,
    FromDate,
    ToDate,
    totalammount,
    totaldays
  } = req.body;

  try {
    const newbooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      FromDate,
      ToDate,
      totalammount,
      totaldays,
      transactionid: '1234'
    });

    const booking = await newbooking.save();
    
    // Updating the current booking in the room model
    const roomtemp = await Room.findOne({ _id: room._id });
    
    roomtemp.currentbookings.push({
      bookingid: booking._id,
      FromDate: FromDate,
      ToDate: ToDate,
      userid: userid,
      status: booking.status
    });
    
    // Use markModified to notify Mongoose about the array modification
    roomtemp.markModified('currentbookings');
    
    await roomtemp.save();
    
    res.json({ success: true, message: 'Room Booked Successfully', booking });
  } catch (error) {
    console.error('Booking failed:', error);
    res.status(500).json({ success: false, error: 'Booking failed due to a server error.' });
  }
});

module.exports = router;
