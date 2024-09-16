const express = require('express');
const router = express.Router();
const menuItem = require('./../models/menu');

// post method to add menu items
router.post('/',async(req,res)=>{
    try{
        const data = req.body;
        const newMenu = new menuItem(data);
        const response =await newMenu.save();
         console.log(' data saved');
         res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
});

// get method to get menu items
router.get('/',async(req,res)=>{
    try{
      const data =await menuItem.find();
      console.log("Menu Data fetched");
      res.status(200).json(data);
    }
    catch(err){
       console.log(err);
       res.status(500).json({error:"Internal Server Error"});
    }
  });

  router.get('/:tasteType',async(req,res)=>{
    try{
       const tasteType  = req.params.tasteType;
       if(tasteType == 'Sour' || tasteType == 'Spicy' || tasteType == 'Sweet'){
        const response = await menuItem.find({taste:tasteType});
        console.log("Menu Taste Fetched");
        res.status(200).json(response);
       }
       else{
        res.status(404).json({error:'Page not Found'});
       }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Invalid Server Error'});
    }
  });
  module.exports = router;