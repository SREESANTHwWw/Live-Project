const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({

 username:{
    type:String,
    required:[true ,'Must Provide a Name'],
    trim:true,
    maxlength:[20 ,'More than 20 character']
  },
  password:{
    type:String,
    required:[true ,"Must Provide A Password"],
    minlength:[8 , "less than 8 character"],
    Selection:false

  },
  shopname:{
    type:String,
    required:[true, "Must Provide a  shopname"],
   
  },
  owner:{
    type:String,
    required:[true, "Must Provide a ownername"],
  
  },
  phonenumber:{
    type:String,
    required:[true, "Must Provide a phonenumber"],
   
  },
  address:{
    type:String,
    required:[true, "Must Provide a phonenumber"],
   
  },
  gstno:{
    type:String,
    required:[true , "Must Provide a GstNumber"],
    

  },
  pincode:{
    type:String,
    required:[true, "Must Provide a phonenumber"],
   
  },
  city:{
    type:String,
    required:[true, "Must Provide a cityname"],
    
  },
  whatsappno:{
    type:String,
    required:[true, "Must Provide  a phonenumber"],
    
  },

  stateid:{
    type:String,
    required:[true, "Must Provide  a stateid"],
   
  },

  type:{
    type:String,
    default:"user"
  }


})
 
UserSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    next()
    
  }
  this.password = await bcrypt.hash(this.password, 10)
} )


UserSchema.methods.comparePassword= async function (enterpassword) {
    return await  bcrypt.compare(enterpassword, this.password )
}
module.exports = mongoose.model("User",UserSchema)