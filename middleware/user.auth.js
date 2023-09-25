const jwt=require("jsonwebtoken")
const blacklistModel=require("../model/blacklist.model")
const auth= async(req,res,next)=>{
    
  try{
    const token=req.headers.authorization
    const isblacklist=await blacklistModel.findOne({token})
    if(isblacklist){
        res.send("already jwt")
    }
    if(token){
        jwt.verify(token, 'masai', async(err, decoded)=> {
            if(decoded){
          req.body.userid=decoded.userid
          req.body.email=decoded.email
          next()
            }else{
                res.send("wrong jwt")
            }
          });
     
    }else{
        res.send("not authorized")
    }
  }catch(err){
    res.send(err)
  }
}

module.exports=auth