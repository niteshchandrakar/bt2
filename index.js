require("dotenv").config()
const cors=require("cors")
const express=require("express")
const notesRouter=require("./routes/notes.routes")
const userRouter=require("./routes/user.routes")
const connection=require("./db")

const app=express()
app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use("/notes",notesRouter)


app.listen(process.env.port,async()=>{
try{
await connection
console.log("connected")
}catch(error){
    console.log(error)
}
})