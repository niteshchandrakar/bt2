const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    token:{type:String,required:true}
},{
    versionKey:false
})

const blacklistModel=mongoose.model("blacklist",userSchema)

module.exports=blacklistModel