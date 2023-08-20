const express = require('express')
const mongoose = require('mongoose');
const router = express.Router();
const orders = require('../models/Orders')

router.post('/orderData', async (req,res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})

    let emailId = await orders.findOne({'email':req.body.email})
    //console.log(emailId)
    if(emailId===null)
    {
        try{
            await orders.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({success:true})
            })
        } catch(error) {
            console.log(error.message)
            res.send("Server Error",error.message)
        }
    }
    else{
        try{
            await orders.findOneAndUpdate({email:req.body.email},
                {
                    $push:{order_data:data}
                }).then(() => {
                    res.json({success:true})
                })
        }catch(error) {
            res.send("Server Error",error.message)
        }
    }
})

router.post('/myOrderData',async (req,res) => {
    let myOrderSummary = await orders.findOne({'email':req.body.email})
    try {
            res.send({success:true,orderData:myOrderSummary})
    }catch (error) {
        res.send("Server Error",error.message)
    }
})

module.exports = router;