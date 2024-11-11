import subcategory from "../modal/SubCatemodal.js"
import category from "../modal/categorymodal.js"


const getsubcate= async (req,res)=>{
    // console.log("get cate")
    try{
        const allsubcate= await subcategory.find().populate("category")
        return res.status(200).json({
            sucess:true,
            message:"get all subcate sucessful",
            data:allsubcate
        })
    }catch(err){
        return res.status(500).json({
            sucess:false,
            message:"please try again",
            error:err.message,
        })
    }
}
// get one subcate
const getonesubcate = async (req, res) => {
    try {
      const { Catename } = req.query; // Extracting Catename from query parameters
            // console.log(Catename)
      // Find the category by name first
      const findcategory = await category.findOne({ catename: Catename });
        //  console.log(findcategory)
      if (!findcategory) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
  
      // Now find the subcategories using the category _id
      const findonesubcate = await subcategory.find({ category: findcategory._id });
  
      return res.status(200).json({
        success: true,
        message: "Subcategories fetched successfully",
        data: findonesubcate,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Please try again",
        error: err.message,
      });
    }
  };
  
  
// create subcategory
const createsubcate= async (req,res)=>{
   try{
      const {subcatename,Category}= req.body
    //   console.log(subcatename,category) 
    if(!subcatename){
        return res.status(400).json({
            sucess:false,
            message:"please subcate name"
        })
    }
       const findcate= await category.findOne({catename:Category})
    //   console.log(findcate)
    if(!findcate){
        return res.status(400).json({
            sucess:false,
            message:" category not found please enter valid category"
        })
    }
       const createsub= await subcategory.create({subCateName:subcatename,category:findcate._id})
       return res.status(201).json({
        sucess:true,
        message:"create sucessful",
        createsub,
       })
   }catch(err){
    return res.status(500).json({
        sucess:false,
        message:"please try again",
        error:err.message,
    })
   }
}
// update subcategory
const updatesubcate= async (req,res)=>{
    // console.log("update subcate")
    try{
        const {udatesubname}=req.body
        const {id}=req.params
        const updatesubcate= await subcategory.findByIdAndUpdate(id,{subCateName:udatesubname},{new:true})
        if(!updatesubcate){
            return res.status(400).json({
                sucess:false,
                message:"  not found data "
            })
        }
         return res.status(200).json({
            sucess:true,
            message:'update sucessful', 
            data:updatesubcate,
         })
    }catch(err){
        return res.status(500).json({
            sucess:false,
            message:"please try again",
            error:err.message
        })
    }
}
// delete subcategory 
const deletesubcate= async (req,res)=>{
    // console.log("updated subcate")
    try{
        const {id}=req.params
        const subdelete= await subcategory.findByIdAndDelete(id)
        return res.status(200).json({
            sucess:true,
            message:"delete sucessful"
        })
    }catch(err){
        return res.status(500).json({
            sucess:false,
            message:"please try again",
            error:err.message
        })
    }
}
export {getsubcate,createsubcate,updatesubcate,deletesubcate,getonesubcate}