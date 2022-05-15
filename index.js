const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000
const app = express()

// middleware
app.use(cors());
app.use(express.json())



const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster1.helve.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("laptopwarehouse").collection("products");
  console.log('ok')
  // perform actions on the collection object
  client.close();
});


app.get('/', (req ,res) =>{
    res.send('ok')
})
app.listen(port ,console.log(port))