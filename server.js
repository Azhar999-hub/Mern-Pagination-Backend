import express from 'express';

import mongoose from "mongoose";

import cors from "cors";

import UserRouter from "./Routes/Userroutes.js";
import * as dotenv  from "dotenv"
dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());

//-------------------------------Routes------------------------------

app.use('/users', UserRouter);


//----------------------------------------------------------------------------

mongoose
  .connect(process.env.MONGO_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server listening on ${process.env.PORT} port and also Database Connected Successfully`);
    });
  }) 
  .catch(() => {
    console.log("Database not connection established",);
  });