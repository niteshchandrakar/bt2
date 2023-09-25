const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    
    title:String,
    content:String,
    userid:String
},{
    versionKey:false
})

const notesModel=mongoose.model("notes",userSchema)

module.exports=notesModel