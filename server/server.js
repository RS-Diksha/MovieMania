import express from "express"
import cors from "cors"
import reviews from "./api/reviews.route.js"

const app=express() //create a web server with the help of express framework

//using middleware to add extra functionality 
app.use(cors()) 
app.use(express.json()) //allow server to accept json in the body of request

//specifying routes
app.use("/api/v1/reviews",reviews) //when the endpoint is available in api then review function from imported file is executed

app.use("*",(req,res)=>res.status(404).json({error: "not found"}))    //else * used shows in any other case than gettting the response

  export default app //to export the file as module     
;
