const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000;
// console.log(process.env.DB_USER,process.env.DB_PASSWORD)
// Middleware
app.use(cors());
app.use(express.json());
//Mongo

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@crudnodejs.33uff.mongodb.net/?retryWrites=true&w=majority&appName=crudNodeJs`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // DB Collection
    const coffeeCollection = client.db("coffeeDB").collection("coffee");
    // Routes
    //Get All
    app.get('/coffee', async(req,res)=>{
      const cursor = coffeeCollection.find();
      const result = await cursor.toArray();
      console.log(`All Coffee Fetched!`);
      res.send(result);
  });
    //View Coffee
    app.get('/coffee/:id',async (req,res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coffeeCollection.findOne(query);
      console.log('View Coffee',query);
      res.send(result);
    })
    //Add New
    app.post('/coffee', async(req,res)=>{
        const newCoffee = req.body;
        console.log(`newCoffee Added to Mongo DB`);
        const result = await coffeeCollection.insertOne(newCoffee);
        res.send(result);
    });
    //Update Coffee
    app.put('/coffee/:id',async (req,res)=>{
      const id = req.params.id;
      // Identify the data
      const filter = { _id: new ObjectId(id) };
      // Set the upsert option to insert a document if no documents match the filter
      const options = { upsert: true };
      const coffee = req.body;
      console.log('Update Coffee',id)
      // Specify the update to set a value for the plot field
      const updatedCoffee = {
        $set: {
          name:coffee.name,
          photo:coffee.photo,
          details:coffee.details,
          taste:coffee.taste,
          supplier:coffee.supplier,
          category:coffee.category,
          quantity:coffee.quantity,
          quantity:coffee.quantity,
          chef:coffee.chef,
        }
      };
      // Update the defined document into the "coffee" collection
      const result = await coffeeCollection.updateOne(filter,updatedCoffee,options);

      res.send(result);
    })
  //Delete Coffee
  app.delete('/coffee/:id',async (req,res)=>{
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await coffeeCollection.deleteOne(query);
    console.log('Delete Coffee',query);
    res.send(result);
  })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//Mongo end

app.get('/', (req,res)=>{res.send(`Coffe Making Server is Running!`)})
app.listen(port, ()=>{console.log(`Coffe Making Server is Running on Port : ${port}`)})