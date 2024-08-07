import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/TransactionRouters.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api",router);

app.get("/", (req, res) => {
  res.send("Server is running")
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});