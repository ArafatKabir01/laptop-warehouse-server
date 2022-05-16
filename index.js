const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000
const app = express()

// middleware
app.use(cors());
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster1.helve.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
  try{
    await client.connect();
    const porductCollection = client.db('laptopwarehouse').collection('products');
    app.get("/product",async(req , res)=>{
      const query = {};
      const cursor = porductCollection.find(query);
      const products = await cursor.toArray();
      res.send(products)
    })
  }
  finally{}
}
run().catch(console.dir)

app.get('/', (req ,res) =>{
    res.send('ok')
})
app.listen(port ,console.log(port))