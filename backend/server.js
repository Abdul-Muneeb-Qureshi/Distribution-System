const express = require('express')
const app = express();
require('./utils/db')
const bodyparser = require('body-parser')
const userRouter = require('./routes/userRoute');
const PORT = 3006;
//    MiddleWares
app.use(bodyparser.json());
app.use('/api' , userRouter);
app.get('/' , (req, res) => {
    res.send("Welcome to Assignment");
})

app.listen(PORT ,() => {
    console.log("Server is running on the port" , PORT);
})


