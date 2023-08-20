const express = require('express')
const mongoose = require('mongoose');
const router = express.Router();

router.get("/foodData",
async (req,res) => {
    
    try {
        return res.status(200).send([global.food_items ,global.getFoodCategory]);
    }catch(err){
        console.log('Error: ',err)
        res.json({success:false})
    }
})

module.exports = router;