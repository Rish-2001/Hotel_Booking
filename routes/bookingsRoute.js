const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Room = require('../models/room');
const { v4: uuidv4 } = require('uuid');
const stripe=require('stripe')('sk_test_51O1ogCSH9sbFouxB8vBOyDx41cGAhJ23feNZUKgawtcAGPhXtfQ2n1hiYjUSBxCQyboKaADVTO8CRoMPAR4bTCYJ00mJyyzku1')

router.post('/bookroom', async (req, res) => {
  const {
    room,
    userid,
    FromDate,
    ToDate,
    totalammount,
    totaldays,
    token
  } = req.body;

  try {
    
    const customer=await stripe.customers.create({
      email:token.email,
      source:token.id
    })
    const payment =await stripe.paymentIntents.create(
      {
        amount:totalammount*100,
        customer:customer.id,
        currency:'INR',
        receipt_email:token.email,
        automatic_payment_methods: {enabled: true},
        
        
      },{
        idempotencyKey:uuidv4()
      }
    )
   
    if(payment){
      
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
        
        
      
    }
    

    res.send("Payment Successfull,Your room is booked");
  } catch (error) {
    return res.status(400).json({error});
  } 
});

module.exports = router;
