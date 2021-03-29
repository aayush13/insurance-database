const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const insuranceAPI = require('./routes/insurance_details');

const config = {
    port : 5000,
    mongoUri : "mongodb+srv://aayush:qwerty@123@cluster0.qoffs.mongodb.net/insurance?retryWrites=true&w=majority",
    clientRoot : path.resolve("client/")
};

app.use(
    express.static(path.join(config.clientRoot,'/build/'),{
        index: ['index.html'],
    })
)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/routes',insuranceAPI);
app.listen(config.port, () => {
    console.log(`Running server on ${config.port}`)
})


