const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err))

const clipSchema = new mongoose.Schema({
  label: String,
  date: String,
  startTime: String,
  endTime: String,
  frontUrl: String,
  rearUrl: String,
})
const Clip = mongoose.model("Clip", clipSchema)

app.get("/api/clips", async (req, res) => {
  try {
    const clips = await Clip.find()
    res.json(clips)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post("/api/clips/seed", async (req, res) => {
  try {
    await Clip.deleteMany()
    const result = await Clip.insertMany([
      { label: "08:00 - 08:15", date: "2025-05-09", startTime: "08:00", endTime: "08:15", frontUrl: "http://localhost:5173/clip1.mp4", rearUrl: "http://localhost:5173/clip2.mp4" },
      { label: "08:15 - 08:30", date: "2025-05-09", startTime: "08:15", endTime: "08:30", frontUrl: "http://localhost:5173/clip3.mp4", rearUrl: "http://localhost:5173/clip4.mp4" },
      { label: "08:30 - 08:45", date: "2025-05-09", startTime: "08:30", endTime: "08:45", frontUrl: "http://localhost:5173/clip1.mp4", rearUrl: "http://localhost:5173/clip2.mp4" },
      { label: "08:45 - 09:00", date: "2025-05-09", startTime: "08:45", endTime: "09:00", frontUrl: "http://localhost:5173/clip3.mp4", rearUrl: "http://localhost:5173/clip4.mp4" },
      { label: "09:00 - 09:15", date: "2025-05-09", startTime: "09:00", endTime: "09:15", frontUrl: "http://localhost:5173/clip1.mp4", rearUrl: "http://localhost:5173/clip2.mp4" },
      { label: "09:15 - 09:30", date: "2025-05-09", startTime: "09:15", endTime: "09:30", frontUrl: "http://localhost:5173/clip3.mp4", rearUrl: "http://localhost:5173/clip4.mp4" },
    ])
    res.json({ message: "Clips seeded successfully", count: result.length })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post("/api/login", (req, res) => {
  const { email, password } = req.body
  if (email === "demo@okdriver.in" && password === "12345678") {
    res.json({ success: true, token: "demo_token_123" })
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" })
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})