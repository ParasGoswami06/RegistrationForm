const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/employedb",
{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log("connected to DB")).catch((err)=>console.log(err))