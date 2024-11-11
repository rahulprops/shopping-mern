import mongoose from "mongoose";

const subcateSchema= new mongoose.Schema({
    subCateName:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
    }
},{timestamps:true})
const subcategory= mongoose.model("subcate",subcateSchema)
export default subcategory;