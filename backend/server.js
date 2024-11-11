import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import categories from './router/catagories.js';
import mongoose from 'mongoose';
import product from './router/Product.js';
import bodyParser from 'body-parser';
import cloudinaryc from './config/cloudinary.js';
import subcate from './router/subcate.js';

const app = express();
const port = process.env.PORT;
const db=process.env.DB;


app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

// database connection
try{
     mongoose.connect(db)
     console.log("database connect sucessful")
}catch(err){
        console.log("fail connnection database",err)
}
app.use("/", categories);
app.use("/",product)
app.use("/",subcate)
// Start Server
app.listen(port, (err) => {
  if (err) {
    console.error(`Failed to start server: ${err}`);
  } else {
    console.log(`Server started at http://localhost:${port}`);
    cloudinaryc()
  }
});
