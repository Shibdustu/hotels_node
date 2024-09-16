const express = require('express');
const router = express.Router();
const person = require('./../models/person');

// post route to add person
router.post('/',async(req,res)=>{
    try{
        const data = req.body //Assuming the request body contains the person data
        // create a new person document using the Mongoose model
        const newPerson = new person(data);
    
        // save the newPerson to the database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
       console.log(err);
       res.status(500).json({error:'Internal Server Error'});
    }
    
 });

router.get('/',async(req,res)=>{
    try{
   const data = await person.find(); //person model main jitna data tha sab lekar 
   console.log('data fetched');      //store kardiya person.find() ne.
   res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    } 
})

router.get('/:worktype',async(req,res)=>{
    try{
       const worktype = req.params.worktype; // Extract the work type from the URL parameter
       if(worktype == 'chef' || worktype == 'waiter' || worktype == 'manager'){
          const response = await person.find({work:worktype});
          console.log('response fetched');
          res.status(200).json(response);
       }
       else{
           res.status(404).json({error:"Page Not Found"})
       }
    }
    catch(err){
       console.log(err);
       res.status(500).json({error:'Internal Server Error'});
    }
});

router.put('/:id',async(req,res)=>{
    try{
     const personId = req.params.id; //extract the id from the URL parameter
     const updatedPersonData = req.body; // updated data for the person
     const response = await person.findByIdAndUpdate(personId,updatedPersonData,{
        new:true, // return the updated document
        runValidators:true, // moongoose validation vi true kardo
     });
     console.log('Data Updated');
     res.status(200).json(response);
     if(!response){
         res.status(404).json({error:'Person Not Found'});
     }
    }
    catch(err){
         console.log(err);
         res.status(500).json('Internal Server Error');
    }
});

// router.delete('/:id', async (req, res) => {
//     try {
//         const personId = req.params.id; // Extract the person's id from the URL parameter
//         const response = await person.findByIdAndRemove(personId);
//         if (!response) {
//             return res.status(404).json({ error: "Page Not Found" });
//         }
//         res.status(200).json({ message: 'Person Deleted Successfully' });
//         console.log("Data Deleted Successfully");
//     } catch (err) {
//         console.log(err);
//         res.status(500).json('Internal Server Error');
//     }
// });


router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the person's id from the URL parameter
        const response = await person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: "Person Not Found" });
        }
        res.status(200).json({ message: 'Person Deleted Successfully' });
        console.log("Data Deleted Successfully");
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal Server Error');
    }
});



module.exports = router;