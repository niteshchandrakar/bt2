const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    username:String,
    email:String,
    pass:String
},{
    versionKey:false
})

const userModel=mongoose.model("users",userSchema)

module.exports=userModel