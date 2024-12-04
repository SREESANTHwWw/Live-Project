const usermodel = require('../Model/Usermodel')
const express = require('express')
const ErrorHandler = require("../Utils/ErrorHandler")
const jwt = require('jsonwebtoken')
const router = express.Router()
const CatchAsyncError = require('../Middlewares/CatchAsyncError')


router.post('/registration',CatchAsyncError  (async(req,res)=>{
    try {

     
        const user = await usermodel.create(req.body)
        
        res.status(201).json({msg :"success"})
        
    } catch (error) {
       res.status(500).json({error})
    }
  
}))


router.post('/login-user', CatchAsyncError(async(req, res,next)=>{

    try {
        const {username, password} = req.body;
       
        if(!username || !password){
            return next (new ErrorHandler ("please Provide All inputs"))

        }
        const user = await usermodel.findOne({username}).select("+password")
        console.log(user)
             
        if(!user){
            return next(new ErrorHandler ("Request User not Found",400))
        }
        const isPasswordValid = await user.comparePassword(password)
        if(!isPasswordValid){
            return next(new ErrorHandler("invaild Credentials"),400)
        }
        res.status(200).json({msg:"success",user})

    } catch (error) {
        return next( new ErrorHandler(error.message,400))
    }
}))

router.get('/get-users',CatchAsyncError(async(req,res, next)=>{

    try {
        const getusers = await usermodel.find({type:{$ne: "admin"}})
        res.status(201).json({ getusers})
        
    } catch (error) {
        return next(new ErrorHandler(error.message,400))
    }
}))

router.delete('/delete-user/:id',CatchAsyncError(async(req,res,next)=>{

    try {
        const {id: User_id} = req.params
        const deleteuser =await usermodel.findOneAndDelete({_id :User_id})
        if(!deleteuser){
            res.status(401).json({msg:`No User in ${User_id}`})
        }
        res.status(200).json({msg:"success"})
        
    } catch (error) {
        return next(new ErrorHandler(error.message,400))
    }
}))


router.patch(`/edit-user/:id`, CatchAsyncError(async(req ,res, next)=>{
    try {
        const {id: User_id} = req.params
        const edituser = await usermodel.findOneAndUpdate({_id : User_id} ,req.body,{
           new:true,
           runValidators:true
        })
        if(!edituser){
            return  res.status(401).json({ msg:`No User with ${User_id}`})
        }
        return res.status(200).json({edituser})

        
    } catch (error) {
        return next(new ErrorHandler(error.message,400))
        
    }

}))





module.exports = router