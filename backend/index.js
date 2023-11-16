const express = require("express")
const app = express();
require('./utils/db')
const bodyParser= require('body-parser');
const cardRouter = require('./routes/cardRoute');
const PORT = 3005;
//middleware
app.use(bodyParser.json());
app.use('/api',cardRouter);
app.get('/' ,(req,res)=>{
    res.send("Welcome fillas");
})
app.listen(PORT,()=>{
    console.log("Server is running on the port",PORT)
})