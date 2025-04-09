import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://uroojshahab121:BoyK5UidUHD2KjPt@cluster1.vlolfvc.mongodb.net/?retryWrites=true&w=majority&appName=cluster1";
const client = new MongoClient(uri);
let collection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("blogDB");
    collection = db.collection("articles");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}

connectDB();

// CREATE
app.post("/articles", async (req, res) => {
  const article = { ...req.body, date: new Date() };
  const result = await collection.insertOne(article);
  res.json({ _id: result.insertedId, ...article });
});

// READ
app.get("/articles", async (req, res) => {
  const articles = await collection.find().sort({ date: -1 }).toArray();
  res.json(articles);
});

// UPDATE
app.put("/articles/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedData }
  );
  const updatedArticle = await collection.findOne({ _id: new ObjectId(id) });
  res.json(updatedArticle);
});

// DELETE
app.delete("/articles/:id", async (req, res) => {
  const { id } = req.params;
  await collection.deleteOne({ _id: new ObjectId(id) });
  res.json({ success: true });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

