const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const Door = require("./models/Door");

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://andrii7778768:4yDBvXJfvZXsCnRM@cluster0.zbalqkp.mongodb.net/doors_db?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes for doors
app.get("/doors", async (req, res) => {
  try {
    const doors = await Door.find();
    res.json(doors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/doors", async (req, res) => {
  try {
    const { name, price } = req.body;
    const door = new Door({ name, price });
    await door.save();
    res.status(201).json(door);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/doors/:id", async (req, res) => {
  try {
    const { name, price } = req.body;
    await Door.findByIdAndUpdate(req.params.id, { name, price });
    res.json({ message: "Door updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/doors/:id", async (req, res) => {
  try {
    await Door.findByIdAndDelete(req.params.id);
    res.json({ message: "Door deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
