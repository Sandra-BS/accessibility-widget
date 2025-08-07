const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Basic route
app.get("/", (req, res) => {
    res.send("Accessibility Widget API is running.");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const Domain = require("./models/domain");

app.post("/api/register", async (req, res) => {
  try {
    const { domain } = req.body;

    if (!domain) {
      return res.status(400).json({ error: "Domain is required" });
    }

    // Save or find existing
    const existing = await Domain.findOne({ domain });

    if (existing) {
      return res.status(200).json({ message: "Domain already registered" });
    }

    const newDomain = new Domain({ domain });
    await newDomain.save();

    res.status(201).json({ message: "Domain registered successfully" });
  } catch (error) {
    console.error("Error registering domain:", error);
    res.status(500).json({ error: "Server error" });
  }
});
app.get("/api/domains", async (req, res) => {
  try {
    const domains = await Domain.find();
    res.status(200).json(domains);
  } catch (error) {
    console.error("Error fetching domains:", error);
    res.status(500).json({ error: "Server error" });
  }
});
