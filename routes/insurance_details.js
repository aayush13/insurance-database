const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const {ObjectId} =  require('mongodb');
const config = {
    port : 5000,
    mongoUri : "mongodb+srv://aayush:qwerty@123@cluster0.qoffs.mongodb.net/insurance?retryWrites=true&w=majority",
};

router.get('/test',(req,res) => {
    console.log("Hello")
    res.end();
})

router.get('/getClientDetails/:id', (req,res) => { 
    let searchId = req.params.id;
    let result= []
    const client = new MongoClient(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(async(err) => {
        if (err) throw err;
        const coll = client.db("insurance").collection("client");
        let query  = {$or: [{Policy_id:searchId},{Customer_id:searchId}]};
        await coll.find(query).forEach(doc=>{
            result.push(doc);
        })
        res.status(200).json({
            data : result,
            totalResults : result.length
        })
    });   
    client.close();
})

router.get('/policyChartData', (req,res) => { 
    let result= [];
    let region = req.query.area;
    console.log(region)
    const client = new MongoClient(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(async(err) => {
        if (err) throw err;
        const coll = client.db("insurance").collection("client");
        let query  = [
            {
                $match : {Customer_Region:region}
            },
            {
                $group: {
                _id: {$substr: ['$Date of Purchase', 0, 2]}, 
                numberofbookings: {$sum: 1}
            }}
        ]
        await coll.aggregate(query).forEach(doc=>{
            result.push(doc);
        })
        res.status(200).json({
            data : result,
            totalResults : result.length
        })
    });   
})

router.post('/updateData', (req,res) => { 
    console.log(typeof(req.body));
    let searchId = req.body["_id"];
    delete req.body["_id"];
    const client = new MongoClient(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(async(err) => {
        if (err) throw err;
        const coll = client.db("insurance").collection("client");
        let query  = {_id : ObjectId (searchId)};
        console.log(query,req.body);
        await coll.findOneAndUpdate (query, {$set : req.body}, (error,doc) => {
            if (error) throw error;
            console.log("1 document updated");
        })
        res.json({
           status: 200,
           msg : "Record Updated"
        })
        client.close();
    });   

})
module.exports = router;