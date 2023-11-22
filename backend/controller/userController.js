const User = require('../models/user');
const jwt = require('jsonwebtoken'); 
const { param } = require('../routes/userRoute');


async function createUser (req ,res) {
    try {
        const newuser = await User.create(req.body); 
        res.status(201).json(newuser); 
    }
    catch (error) {
        res.status(500).json({error : error})
    }
}

async function updateUser (req , res) {
    try{
        const {id} = req.params;
        const updateUser = await User.findByIdAndUpdate(id,req.body,{new: true});
        res.json(updateUser);
    }
    catch (err) {
        res.status(500).json({error : err.message});
    }
}

async function deleteUser (req , res) {
    try {
        const {id} = req.params;
        await User.findByIdAndRemove(id);
        res.sendStatus(204).json({message : "Deleted Successfully"});
    }
    catch (err) {
        res.status(500).json({error : err.message});
    }
}

async function getAllusers (req,res) {
    try{
        const cards = await User.find();
        res.json(cards);
    }
    catch (err) {
        res.status(500).json({error : err.message});
    }
}
async function login (req,res,next) {
    const {userName , password} = req.body;
    try{
        const user = await User.findOne ({userName});
        if (!user) return res.status(404).json({error : 'User not found'}); 
        if (user.password != password) return res.status(401).json({error : 'Invalid Credentials'});
        var token = GenerateToken(user)
        return res.status(200).json({
            message : 'Logged in successfully' ,
            userName : userName ,
            userid : user.id,
            token : token
        });
    }
    catch (err) {
        res.status(500).json({error : err.message});
    }
}

function GenerateToken(user) {
    const payload = {
        role: user.role,
        id: user._id,
    };
    const token = jwt.sign(payload, "adsfasdfjkh$#asdfasdf.adsfxc");
    return token;
};

async function admindasboard (req,res){
    return res.status(200).json({message : "Welcome to admin Dashboard"});
}


module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getAllusers,
    login ,
    admindasboard
}