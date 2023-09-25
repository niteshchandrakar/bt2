const express=require("express")
const blacklistModel=require("../model/blacklist.model")
const auth=require("../middleware/user.auth")
const jwt=require("jsonwebtoken")
const userModel=require("../model/user.model")
const userRouter=express.Router()
const bcrypt=require("bcrypt")
userRouter.get("/",async(req,res)=>{
    const user= await userModel.find()
    res.status(200).send({msg:user})
})
userRouter.get("/token",async(req,res)=>{
    const user= await blacklistModel.find()
    res.status(200).send({msg:user})
})

userRouter.post("/register",async(req,res)=>{
    const {email,pass,username}=req.body
    try{
const user= await userModel.findOne({email})

if(user){
 return    res.status(400).send({msg:"User exists"})
}else{
  

    bcrypt.hash(pass, 5, async(err, hash)=> {
        // Store hash in your password DB.
        const newuser= new userModel({email,pass:hash,username})
      await newuser.save()
      res.status(200).send({msg:"registerd"})
    });
}



    }catch(error){
        res.status(400).send({msg:"wrongthing"})
    }
})

userRouter.post("/login",async(req,res)=>{
    try{
const {email,pass}=req.body
const user=await userModel.findOne({email})
if(user){
    bcrypt.compare(pass, user.pass, async(err, result)=> {
        // result == false
        if(result){
            const token = jwt.sign({ email: user.email,userid:user._id }, 'masai');

            res.status(200).send({msg:"login success",token:token})
        }else{
            res.send("wrong password")
        }
    });

}else{
    res.send("user not found")
}

    }catch(error){
        res.status(200).send("wrong ")
    }
})


userRouter.get("/logout",auth,async(req,res)=>{
   
    try{
const token=req.headers.authorization
const blacklisttoken=new blacklistModel({token})
await blacklisttoken.save()
    res.status(200).send({msg:"user logout"})
}catch(err){
        res.send(err)
    }
})
module.exports=userRouter