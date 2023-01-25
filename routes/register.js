var express = require('express');
const Register = require('../public/javascripts/registers');
const bcrypt=require("bcryptjs");
var router = express.Router();

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register',);
});


router.post('/register', async function(req, res, next) {
    try{
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;

        if(password===cpassword){
          const registerEmployee=new Register({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            gender:req.body.gender,
            mobile:req.body.mobile,
            age:req.body.age,
            state:req.body.state,
            city:req.body.city,
            address:req.body.address,
            password:password,
            confirmpassword:req.body.confirmpassword
          })

          // Using Middleware or JSON Web Token

          const token=await registerEmployee.generateAuthToken();
          console.log("The Token part"+token);

          // Cookies:- used to store the data on the web browser
          // node js has inbuilt cookie function res.cookie()
          // res.cookie(name,value,[options])
          // the value parameter can be string or object converted to JSON

          res.cookie("jwt",token,{
            expires:new Date(Date.now()+ 50000),
            httpOnly:true
          });
          console.log(cookie);

         const registered=await registerEmployee.save();
         
        //  res.status(201).send("Registered Sucessfully");
         res.status(201).render("index");
        }

    }catch(error){
       res.status(400).send(error);
    }
  });

module.exports = router;
