const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
require("dotenv").config();

//Defining Schema

const employeeSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true
    },
    state:{
        type:String
    },
    city:{
        type:String
    },
    address:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
    
})

//creating token here or generating token

employeeSchema.methods.generateAuthToken=async function(){
    try{
        // console.log(this._id)
        const token=jwt.sign({_id:this._id.toString},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token})
        await this.save();
        // console.log(token);
        return token;

    }catch(error){
        console.log(error);
    }
}

// Using Bcrypt in this code converting our password into hash
employeeSchema.pre("save",async function(next){
    
    if(this.isModified("password")){
        // const passwordHash=await bcrypt.hash(password,10);
        console.log(`before hashing password: ${this.password}`)
        this.password=await bcrypt.hash(this.password,10);
        console.log(`after hashing password: ${this.password}`)
        this.confirmpassword=await bcrypt.hash(this.confirmpassword,10);
    }
        next();
})

// Making Collections

const Register=new mongoose.model("Register",employeeSchema);

module.exports=Register;