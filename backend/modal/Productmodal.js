import mongoose from "mongoose";
import category from "./categorymodal.js";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "category",
    required: true,
  },
  subcate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcate",
    required: true,
  },
  catename:{
     type:String,
     required:true
  },
  subcatename:{
    type:String,
    required:true
  },
  rating: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
  img_public_id: {
    type: String,
    required: true,
  },
  iscreateddate: {
    type: Date,
    default: Date.now,
  },
});

// Remove 'await' when defining the model
const product = mongoose.model("product", productSchema);

export default product;
