const express = require('express')
const mongoose = require('mongoose');
const router = express.Router();
const user = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtSecret = "HelloToMyMernProjectOfRasoi!!!!!"

router.post("/createUser",
body('email').isEmail(),
body('name').isLength({ min: 5 }),
body('password' , 'Invalid Password').isLength({ min: 5 , max: 20 }),
async (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() , message:"Enter valid credentials"});
    }

    const salt = await bcrypt.genSalt(8)
    let securedPassword = await bcrypt.hash(req.body.password,salt);

    try{
        let userData = await user.findOne({email:req.body.email})
        if(userData) return res.status(400).json({errors: "User already exists"})
        await user.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: securedPassword
        })
        .then(res.json({success:true}));
    }catch(err){
        console.log('Error: ',err)
        res.json({success:false})
    }
})

router.post("/loginUser",
body('email').isEmail(),
body('password' , 'Invalid Password').isLength({ min: 5 , max: 20 }),
async (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{  
        let userData = await user.findOne({email:req.body.email})
        if(!userData) return res.status(400).json({errors: "User not found",success:false})

        const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
        
        if(!pwdCompare)
        {
            return res.status(400).json({errors: "Wrong password",success:false})
        }
        //console.log(userData)
        const data = {
            user:{
                id:userData.id
            }
        }
        const authToken = jwt.sign(data,jwtSecret)
        return res.json({ success:true , authToken: authToken})
    }catch(err) {
        console.log('Error:', err)
        res.json({success:false})
    }
})

module.exports = router;
