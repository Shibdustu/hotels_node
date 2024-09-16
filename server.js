const express = require('express');
const app = express();
const db = require('./db');

const bodyParser= require('body-parser');
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.send("Radhe Radhe Surver is Running Fine");
});


// import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRouter = require('./routes/menuItemRoutes');

// use the routers
app.use('/person',personRoutes);
app.use('/menu',menuItemRouter);


app.listen(3000,function(){
    console.log("Server in active on port 3000 ");
});