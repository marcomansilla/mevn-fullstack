const express = require('express');
const mongodb = require('mongodb');

var router = express();

// improve this function
router.get('/search',async (req, res)=>{
    res.send(req.query[Object.keys(req.query)[0]]);

});

// Get collections
router.get('/:collection',async (req, res)=>{
    const collections = await loadCollections();
    res.send(await collections.collection(req.params.collection).find().toArray());
});

// Post collection
router.post('/:collection',async (req, res)=>{
    const collections = await loadCollections();
    await collections.collection(req.params.collection).insertOne(req.body);
    res.status(201).send();
});

// Delete posts
router.delete('/:collection/:id', async (req, res)=>{
    const collections = await loadCollections();
    await collections.collection(req.params.collection).deleteOne({_id:mongodb.ObjectID(req.params.id)});
    res.status(204).send();
});

// Update posts
router.put('/:collection/:id', async (req, res)=>{
    const collections=await loadCollections();
    await collections.collection(req.params.collection).updateOne(
	{_id:mongodb.ObjectID(req.params.id)},
	{
	    $set:req.body
	}
    );
    res.status(201).send();
});

// Database api code
var loadCollections = async ()=>{
    const client=await  mongodb.MongoClient.connect('mongodb://biblioteca:bibliotecario@localhost:27017/biblioteca',{useNewUrlParser:true});
    return client.db('biblioteca');
};
module.exports = router;

var routes = express().routes;
