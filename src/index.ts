import dotenv from "dotenv";
import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index"
dotenv.config();

const app = express();

//Midleware

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());    //Chose datatype for express
app.use(express.urlencoded())  //Accecpt html form

//Database
const URI = process.env.MONGO_URL;
mongoose.connect(URI,{
    autoIndex: false,
}, (err)=> {
    if(err) throw err;
    console.log("Connection successfully!");
});

//Routes
app.use('/api', routes);

//Start server listening
const port = process.env.PORT || 5000;
app.listen(port, ()=> {
    console.log(`Listening on port ${port}`)
})