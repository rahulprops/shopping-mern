import mongoose from "mongoose";
import category from "../modal/categorymodal.js";

const getCategory= async (req,res)=>{
    try{
        const getcate= await category.find()
        if(!getcate){
          return res.status(400).json({
              sucess:false,
              message:"user not found"
          })
        }
        return res.status(200).json({
          sucess:true,
          message:"category found sucessful",
          getcate
        })
  }catch(err){

  }
}
// get one category data 
const getonecate= async (req,res)=>{
    try{
          const {id}=req.params
        //   console.log(id)
        const findone= await category.findById(id)
        // console.log(findone)
        // if(!findone){
        //     return res.status(400).json({
        //         sucess:false,
        //         message:"  please valid id"
        //     })
        // }
        return res.status(200).json({
            sucess:true,
            message:"category find sucessful",
            findone,
        })
    }catch(err){
        return res.status(500).json({
            sucess:false,
            message:"please try again",
            error:err.message
        })
    }
}

// create category 
const createcate= async (req,res)=>{
    try{
        const {name}=req.body;
        if(!name){
            return res.status(400).json({
                sucess:false,
                message:'please enter name'
            })
        }
        const createcate= await category.create({catename:name})
        if(!createcate){
            return res.status(400).json({
                sucess:false,
                message:"not create user"
            })

        }
        return res.status(201).json({
            sucess:true,
            message:"create category succesful",
            createcate
        })
    }catch(err){
        return res.status(500).json({
            sucess:false,
            message:"please try again",
            error:err.message
        })
    }
}
// update category
const updatecategory= async (req,res)=>{
    // console.log("update rouete")
    try{
         const {id}=req.params;
         const {name}=req.body;
         if(!name){
            return res.status(400).json({
                sucess:false,
                message:"name feild empty"
            })
         }
         const updatecate= await category.findByIdAndUpdate(id,{catename:name},{new:true})
        //  console.log(id)
        if(!updatecate){
            return res.status(400).json({
                sucess:false,
                message:"user not found"
            })
        }
        return res.status(200).json({
            sucess:true,
            message:"update sucessful category",
            updatecate
        })

    }catch(err){
        return res.status(500).json({
            sucess:false,
            message:"please try again",
            error:err.message
        })
    }
}
// delet route 
const deletecategroy= async (req,res)=>{
    const {id}=req.params;
    
    try{
        const deletecate= await category.findByIdAndDelete(id)
        if(!deletecate){
            return res.status(400).json({
                 sucess:false,
                 message:"delete fail or category items not found"
            })
        }
        return res.status(200).json({
            sucess:true,
            message:"delete category sucessful"
        })
    }catch(err){
        return res.status(500).json({
            sucess:false,
            message:"please try again ",
            error:err.message
        })
    }
}
export {getCategory,createcate,updatecategory,deletecategroy, getonecate}