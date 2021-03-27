const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const insuranceAPI = require('./routes/insurance_details');
//const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;
const config = {
    port : 5000,
    mongoUri : "mongodb+srv://aayush:qwerty@123@cluster0.qoffs.mongodb.net/insurance?retryWrites=true&w=majority",
    clientRoot : path.resolve("client/")
};


// const client = new MongoClient(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     if (err) throw err;
//     const coll = client.db("insurance").collection("client");
//     let query  = {$or: [{Policy_id:"12345"},{Customer_id:"401"}]};
//     coll.find(query).forEach(doc=>{
//         console.log(doc)
//     })
// });

app.use(
    express.static(path.join(config.clientRoot,'/build/'),{
        index: ['index.html'],
    })
)
app.use(cors());

app.use('/routes',insuranceAPI);
app.listen(config.port, () => {
    console.log(`Running server on ${config.port}`)
})


