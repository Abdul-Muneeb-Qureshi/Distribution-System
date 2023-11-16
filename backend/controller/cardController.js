const card=require('../models/Card')
async function createCard(req,res){
    try{
        const newCard =await card.create(req.body);
        res.status(201).json(newCard);
    }
    catch(error){
        res.json({error:error})
        res.status(500).json({error:error})
    }
}
module.exports={
    createCard,
}
