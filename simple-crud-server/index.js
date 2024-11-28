const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://<user>:<password>@crudnodejs.33uff.mongodb.net/?retryWrites=true&w=majority&appName=crudNodeJs";
//

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("usersDB");
    const usersCollection = database.collection("users");
    // All data
    app.get('/users',async (req,res)=>{
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })
    //Single Data View
    app.get('/users/:id',async (req,res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.findOne(query);
      console.log('View User',id);
      res.send(result);
    })

    //Add new
    app.post('/users',async (req,res)=>{
      const user = req.body;
      console.log('new User',user)
      // Insert the defined document into the "users" collection
      const result = await usersCollection.insertOne(user);
      res.send(result);
    })

    //Update USer
    app.put('/user/:id',async (req,res)=>{
      const id = req.params.id;
      const user = req.body;
      console.log('Update User',id)
      const filter = { _id: new ObjectId(id) };
      // Set the upsert option to insert a document if no documents match the filter
      const options = { upsert: true };
      // Specify the update to set a value for the plot field
      const updatedUser = {
        $set: {
          name: user.name,
          email: user.email
        }
      };
      // Update the defined document into the "users" collection
      const result = await usersCollection.updateOne(filter,updatedUser,options);

      res.send(result);
    })

    //Delete
    app.delete('/users/:id',async (req,res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      console.log('Delete User',id);
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



//
app.get('/',(req,res)=>{
    res.send('Simple Crud is running');
})

app.listen(port,()=>{
    console.log(`Simple Crud is running at port no : ${port}`)
})