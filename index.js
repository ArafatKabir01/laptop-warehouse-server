const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    //post
    app.post('/product', async(req,res)=>{
      const newProduct = req.body;
      const result = await porductCollection.insertOne(newProduct);
      res.send(result);

    })
       // update user
        app.put('/deliveredproduct/:id', async(req, res) =>{
          const id = req.params.id;
          const updatedProduct = req.body;
          console.log(req.body);
          const filter = {_id: ObjectId(id)};
          const options = { upsert: true };
          const updatedDoc = {
              $set: {
                quantity: updatedProduct.newQuantity,
                  
                  }
              };
              const result = await porductCollection.updateOne(filter, updatedDoc, options);
              res.send(result);
  
          })
        app.put('/product/:id', async(req, res) =>{
          const id = req.params.id;
          const updatedProduct = req.body;
          console.log(req.body);
          const filter = {_id: ObjectId(id)};
          const options = { upsert: true };
          const updatedDoc = {
              $set: {
                quantity: updatedProduct.quantity,
                  
                  }
              };
              const result = await porductCollection.updateOne(filter, updatedDoc, options);
              res.send(result);
  
          })
    //Delete
    app.delete('/product/:id', async(req , res)=>{
      const id = req.params.id;
      const query ={_id: ObjectId(id)}
      const result = await porductCollection.deleteOne(query)
      res.send(result)


    })
    //single Product 
    app.get('/booking/:id', async(req , res)=>{
      const id = req.params.id;
      const query ={_id: ObjectId(id)}
      const result = await porductCollection.findOne(query)
      res.send(result)


    })
  }
  finally{}
}
run().catch(console.dir)

app.get('/', (req ,res) =>{
    res.send('ok')
})
app.listen(port ,console.log(port))