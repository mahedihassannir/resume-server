const express = require("express")

const app = express()

const port = process.env.PORT || 5000


const cors = require("cors")

app.use(cors())

app.use(express.json())

require("dotenv").config()


// here is the cinfig of mongodb starts 



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_EMAIL}:${process.env.DB_PASS}@cluster0.obla9o6.mongodb.net/?retryWrites=true&w=majority`;

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

        // here is all the method in here post delete get and patch

        const Db = client.db("userData").collection("datas")


        // ===================================================================================
        // here is making cursor
        app.get('/posts', async (req, res) => {


            const cursor = Db.find()

            const result = await cursor.toArray()

            res.send(result)

        })

        // here is making cursor
        // ===================================================================================


        // ===================================================================================
        // here is the post method 
        app.post("/posts", async (req, res) => {

            // you first connect you body always your file is trensfer via body
            const user = req.body
            // you first connect you body always your file is trensfer via body

            // this is for all data send on data base via bases ofo this code we need [database name my databse name is [Db.insertOne(user)] send user on database thats it my friend
            const result = await Db.insertOne(user)

            res.send(result)

        })
        // here is the post method ends
        // ===================================================================================




        // ===================================================================================

        // here is the DELETE method  starts

        app.delete("/posts/:id", async (req, res) => {

            const id = req.params.id

            const query = { _id: new ObjectId(id) }

            const result = await Db.deleteOne(query)

            res.send(result)


        })

        // here is the DELETE method  ends



        // ===================================================================================

        // here is finding by id

        app.get("/posts/:id", async (req, res) => {

            const id = req.params.id

            const query = { _id: new ObjectId(id) }



            let options = {
                projection: { name: 1, title: 1, country: 1, number: 1, age: 1 }
            }

            const result = await Db.findOne(query,options)

            res.send(result)


        })

        // here is the DELETE method  ends



        // ===================================================================================



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error


        // resone for comment the client.close when we open the server at last this is again close the response and close or off the server  

        // await client.close();
    }
}
run().catch(console.dir);




// here is the cinfig of mongodb starts  nds




// here is the sending response fo server 

app.get('/', (req, res) => {

    res.send("server is running")

})

app.listen(port, () => {

    console.log(`server is running on port ${port}`);

})