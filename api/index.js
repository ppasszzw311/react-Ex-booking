import mongoose from 'mongoose';

import express from 'express';
import dotenv from 'dotenv';

// import route
import authApiRoute from './ApiRoute/auth.js';
import hotelApiRoute from './ApiRoute/hotels.js';
import roomApiRoute from './ApiRoute/room.js';
import usersApiRoute from './ApiRoute/users.js';

import cookieParser from 'cors'

const app = express();
dotenv.config();

const connect = async() => {
    try{
     await mongoose.connect(process.env.MONGODB)
        console.log("Connected to mongoDB")
    }catch(error){
        console.log("disconnected to mongoDB")
    }
}

mongoose.connection.on("connected",()=>{
    console.log("MongoDB connected!")
})
mongoose.connection.on("disconnected",()=>{
    console.log("MongoDB disconnected!")
})

const port = 5000;


app.get('/', (req, res) => {
    res.send("hello world")
})

app.listen(port, () => {
    connect();
    console.log(`Example app listening on port ${port}`);
})

app.use(express.json())
// 中介
app.use('/api/v1/auth', authApiRoute)
app.use('/api/v1/hotels', hotelApiRoute)
app.use('/api/v1/rooms', roomApiRoute)
app.use('/api/v1/users', usersApiRoute)

//如果上述ApiRoute傳接有問題可以來這邊回傳錯誤訊息
app.use((error,req,res, next )=>{
    const errorStatus =error.status || 500 ;
    const errorMessage =error.message || "中間ApiRoute出錯";
    const errorDetail = error.detail
    return res.status(errorStatus).json({ //return回去讓他可以被next(error) catch
        status:errorStatus,
        message:errorMessage,
        detail:errorDetail
    })
})