const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const express = require("express");

const cookieParser = require("cookie-parser");

const app = express();
//middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://bit-craft-e7008.web.app"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(cookieParser());

// Home and health route
app.get("/", (req, res) => {
  res.send("Hello BitCraft");
});
// health
app.get("/health", (req, res) => {
  res.status(200).send("Helth is Good");
});
// Database connection

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.08atmtx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // await client.connect();
    // ==========================> coupon related related  route implementation <=============================
    // ==========================> coupon related related  route implementation <=============================
    // ==========================> coupon related related  route implementation <=============================
    // coupon related
    const userCollection = client.db("task-management").collection("users");

    // create  user route added
    app.post("/users/post", async (req, res) => {
      const newUser = req.body;
      // Check if user already exists based on email
      const existingUser = await userCollection.findOne({
        email: newUser.email,
      });

      console.log(existingUser);
      if (existingUser) {
        // User already exists, send an appropriate response
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }
      // Insert the new user if not already existing
      const result = await userCollection.insertOne(newUser);
      res.status(201).send(result);
    });
    // get single user
    app.get("/users/details/:email", async (req, res) => {
      const result = await userCollection.findOne({
        email: req.params.email,
      });
      res.send(result);
    });
    // get user role
    app.get("/user/role/:email", async (req, res) => {
      const user = await userCollection.findOne({
        email: req.params.email,
      });
      res.send({ role: user.role });
    });
    // ========================<<<<<<<< End >>>>>>>>>>>>>>>>==========================
    // ========================<<<<<<<< End >>>>>>>>>>>>>>>>==========================
    // ========================<<<<<<<< End >>>>>>>>>>>>>>>>==========================
    // ========================<<<<<<<< End >>>>>>>>>>>>>>>>==========================
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port : http://localhost:${port}`);
});
