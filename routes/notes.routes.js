const express=require("express")
const notesModel=require("../model/notes.model")
const auth=require("../middleware/user.auth")
const notesRouter=express.Router()
notesRouter.use(auth)
notesRouter.get("/",async(req,res)=>{
    const notes= await notesModel.find({userid:req.body.userid})
    res.status(200).send({msg:notes})
})

notesRouter.post("/add",async(req,res)=>{
    
    try{
        const {title,content,userid}=req.body
        const note= await new notesModel({title,content,userid})
        note.save()
        res.send("post added")
    }catch(error){
        res.send(error)
    }
})


// notesRouter.patch("/update/:noteID",async(req,res)=>{
//     const {noteID}=req.params
//     const note=await notesModel.findOne({_id:noteID})
//     console.log(req.body.userID,note.userID)
//     const payload=req.body
//     try{
//     if(req.body.userid===note.userid){
       
//         await notesModel.findByIdAndUpdate({_id:noteID},payload)
//         res.status(200).send({"msg":"Post is updated"})
//     }else{
//         res.status(200).send({"msg":"YOu are not authorized"})
//     }


// //const user=await postModel.findOne({id})

// }catch(err){
//     res.status(400).send({"error":err})
// }
// })

notesRouter.patch("/update/:noteID",async(req,res)=>{
    const {noteID}=req.params
    console.log(noteID)
const note=await notesModel.findOne({_id:noteID})
const payload=req.body
    try{
       
  
    
if(note.userid==req.body.userid){
    await notesModel.findByIdAndUpdate({_id:noteID},payload)
    res.status(200).send("updated")
}else{
    res.status(200).send({"msg":"YOu are not authorized"})
}

    }catch(error){
        res.send("something wrong")
    }
})
notesRouter.delete("/delete/:noteID",async(req,res)=>{
    const {noteID}=req.params
    console.log(noteID)
const note=await notesModel.findOne({_id:noteID})

    try{
       
  
    
if(note.userid==req.body.userid){
    await notesModel.findByIdAndDelete({_id:noteID})
    res.status(200).send("deleted")
}else{
    res.status(200).send({"msg":"YOu are not authorized"})
}

    }catch(error){
        res.send("something wrong")
    }
})


module.exports=notesRouter