import mongoose from "mongoose";

const categorySchema= new mongoose.Schema({
    catename:{
        type:String,
        require:true
    },
   
})
const category= mongoose.model("category",categorySchema)
export default category;