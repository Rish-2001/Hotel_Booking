const mongoose =require("mongoose");

var mongoURL='mongodb+srv://rishav:Q9qf9QtjLFjFNVHj@cluster0.3gsbnka.mongodb.net/mern-rooms'

mongoose.connect(mongoURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  
  var connection=mongoose.connection;

 connection.on('error',()=>{
    console.log('Mongo DB connection failed')
  })
 connection.on('connected',()=>{
    console.log('Mongo DB connection successfully')
  })

  module.exports=connection;