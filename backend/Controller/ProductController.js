// import product from "../modal/Productmodal.js";

import category from "../modal/categorymodal.js";
import product from "../modal/Productmodal.js";
import subcategory from "../modal/SubCatemodal.js";
import uploadimage from "../utils/cloudimageupload.js";
import fs from 'fs'
const getproduct= async (req, res)=>{
    // console.log("getproduct")
    try{
     const getProductall=await product.find().populate("category")
     if(!getProductall){
        return res.status(400).json({
            sucess:false,
            message:"not found product "
        })
     }
     return res.status(200).json({
        sucess:true,
        message:"get all product",
         product:getProductall,
     })
    }catch(err){
        return res.status(500).json({
            sucess:false,
            message:"please try again",
            error:err.message,
        })
    }
}
// get category fussion 
const getcatfussion= async (req,res)=>{
    try{
        const findcatefussin= await product.find({catename:"fussion"})
        if(!findcatefussin){
            return res.status(400).json({
                sucess:false,
                message:"product not found"
            })
        }
        return res.status(200).json({
            sucess:true,
            product:findcatefussin,
        })
    }catch(err){
        return res.status(500).json({
            sucess:false,
            message:"please try again",
            error:err.message,
        })
    }
}
// get category beauty
const getcatebeauty= async (req,res)=>{
    try{
        const findcatebeauty= await product.find({catename:"beauty"})
        if(!findcatebeauty){
            return res.status(400).json({
                sucess:false,
                message:"product not found"
            })
        }
        return res.status(200).json({
            sucess:true,
            product:findcatebeauty,
        })
    }catch(err){
        return res.status(500).json({
            sucess:false,
            message:"please try again",
            error:err.message,
        })
    }
}
// add product 
const createproduct= async (req,res)=>{
    try{
        // console.log("creaete")
        const {productname,desription,brand,Productprice,Productcategory, productsubcatename,rating}=req.body;
        const image=req.file;
        // console.log(image)
        // console.log(productname,desription)
        // console.log(req.file)
        if(!productname){
            return res.status(400).json({
                sucess:false,
                message:"please enter product name"
            })
            
        }
        
        if(!desription){
            return res.status(400).json({
                sucess:false,
                message:"please enter product description"
            })
            
        }
        if(!Productcategory){
            return res.status(400).json({
                sucess:false,
                message:"please enter product category"
            })
        }
        if(!productsubcatename){
            return res.status(400).json({
                sucess:false,
                message:"please enter subcategory name"
            })
        }

        const findcate= await category.findOne({catename:Productcategory})
        // console.log(findcate)
        if(!findcate){
            return res.status(400).json({
                sucess:false,
                message:"not found this category name please enter valid category name"
            })
        }
        const findsubcate= await subcategory.findOne({subCateName:productsubcatename})
        console.log(findsubcate)
        if(!findsubcate){
            return res.status(400).json({
                sucess:false,
                message:"please enter valid subcategory name "
            })
        }
        // upload image cloudinary
        // console.log( await uploadimage(image.path))
        const {secure_url,public_id}= await uploadimage(image.path)
        // console.log(secure_url,public_id)
        fs.unlinkSync(image.path)
        const uploadProduct= await product.create({
            name:productname,
            description:desription,
            brand:brand,
            price:Productprice,
            category:findcate._id,
            subcate:findsubcate._id,
            catename:findcate.catename,
            subcatename:findsubcate.subCateName,
            rating:rating,
            image:secure_url,
            img_public_id:public_id,
        })
        // await category.findByIdAndUpdate(findcate._id,{$push:{products:uploadProduct._id}})
        if(!uploadProduct){
            return res.status(400).json({
                sucess:false,
                message:"upload product failed"
            })
        }

        return res.status(200).json({
            sucess:true,
            message:"product created sucessful",
            uploadProduct,
        })
    console.log(req.body)
    }catch(err){
        return res.status(500).json({
            sucess:false,
            message:" please try again",
            error:err.message,
        })
    }
}
// update product 
const updateproduct = async (req,res)=>{
    console.log("update product")
}
// delete product 
const deleteproduct = async (req,res)=>{
    console.log("delete product")
}
export {getproduct,createproduct,updateproduct,deleteproduct,getcatfussion,getcatebeauty}