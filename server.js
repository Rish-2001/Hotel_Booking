const express=require('express');   // 1 and 2 line are the first step
const app=express();
const cors=require('cors');
const dbconfig=require('./db'); //this for mongoose connection   3rd step mongoose ko connect kiy  bnaye aur use server me laye

const roomsRoute=require('./routes/roomsRoutes');  // fetch the route last step
const userRoute=require('./routes/usersRoutes');
const bookingsRoute=require('./routes/bookingsRoute');

app.use(express.json());  //this is for the json file used in after clicking on book now generate the json on backend
app.use(cors());
app.use('/api/rooms',roomsRoute);  //after fetching the route we use in app 
app.use('/api/users',userRoute);
app.use('/api/bookings',bookingsRoute);

const port=process.env.PORT || 5000;                  // second step
// app.listen(port,()=>`Server running on port ${port} `);
app.listen(port,()=>console.log(`Server running on port ${port} `));