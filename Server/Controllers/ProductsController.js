const Productmodel =  require('../Model/Productmodel')
const express = require('express')
const router = express.Router()
const ErrorHandler = require('../Utils/ErrorHandler')
const CatchAsyncErr = require('../Middlewares/CatchAsyncError')
const products = require('../Controllers/AdminControllers')
const CatchAsyncError = require('../Middlewares/CatchAsyncError')


router.get('/get-products',CatchAsyncError(async(req,res ,next)=>{


    try {
        const product =await Productmodel.find()
        res.status(201).json({product})

      
        
          
    } catch (error) {
        return new ErrorHandler("Product is Not Found ")
    }
}))


router.get('/get-products/:id',CatchAsyncError(async(req,res,next)=>{
  try {
    const{id:Product_id} =req.params

    const GetcategoryProuduct = await Productmodel.find({categoryProduct:Product_id })
    res.status(201).json({msg:"success" ,GetcategoryProuduct})
    
  } catch (error) {
    return  next( new ErrorHandler(error.message,400))
  }
}))

router.get("/file/:id", async (req, res) => {
    try {
      const file = await File.findById(req.params.id); //pass file id means _id
  
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }
  
      res.status(200).json({
        filename: file.filename,
        fileUrl: file.fileUrl,
        uploadedAt: file.uploadedAt,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error retrieving file", error: err.message });
    }
  });

module.exports = router