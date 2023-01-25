var express = require('express');
const Register = require('../public/javascripts/registers');
var router = express.Router();
const bcrypt=require("bcryptjs")
require('./register')

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/login',async (req,res,next)=>{
  try {
    const email=req.body.email;
    const password=req.body.password;

    // console.log(`email is ${email} and password is ${password}`)

    const usermail=await Register.findOne({email:email});
    // const userpassword=await Register.findOne({password:password});
    // res.send(usermail);

    // For matching the bcrypted password and user inputed password we use 
    // cbcrypt.compare to check ewther both are equal or not

    const isMatch=bcrypt.compare(password,usermail.password);

    const token=await usermail.generateAuthToken();
          console.log("The Token part "+token)
        
          // Storing Cookies same as in regester.js file
          // seperate cookie for login

          res.cookie("jwt",token,{
            expires:new Date(Date.now()+50000),
            httpOnly:true
          });

    if(isMatch){
      res.status(201).render("index");
    }
    else{
      res.send("Invalid");
    }
    
  } catch (error) {
    res.status(400).send(error);
  }
})

module.exports = router;
