// const mongoose=require('mongoose');

// const bookingSchema=mongoose.Schema({
//     room:{
//         type:String,required:true
//     },
//     roomid:{
//         type:String,required:true
//     },
//     userid:{
//         type:String,required:true
//     },
//     FromDate:{
//         type:String,required:true
//     },
//     ToDate:{
//         type:String,required:true
//     },
//     totalammount:{
//         type:Number,required:true
//     },
//     totaldays:{
//         type:Number,required:true
//     },
//     transactionid:{
//         type:String,required:true
//     },
//     status:{
//         type:String,required:true,default:"booked"
//     }
//     },{
//         timestamps:true
// })

// const bookingmodel=mongoose.model('bookings',bookingSchema);
// module.exports=bookingmodel;

const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  room: {
    type: String,
    required: true,
  },
  roomid: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
 
  FromDate: {
    type: String,
    required: true,
  },
  ToDate: {
    type: String,
    required: true,
  },
  totalammount: {
    type: Number,
    required: true,
  },
  totaldays: {
    type: Number,
    required: true,
  },
  transactionid: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "booked",
  },
}, {
  timestamps: true
});

const bookingmodel = mongoose.model('bookings', bookingSchema);
module.exports = bookingmodel;
