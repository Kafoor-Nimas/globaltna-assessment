import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/MONGODB.js";
import jobRouter from "./routes/jobRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Connect DB
connectDB();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/jobs", jobRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log("Server started on PORT : " + port));
