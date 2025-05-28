import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5001"], // Allow both frontend and backend origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => {
  console.log("\n✅ MongoDB Connected");
  const { host, port, name } = mongoose.connection;
  console.log(`📊 Database Details: Host: ${host}, Port: ${port}, Database: ${name}`);
})
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to StudySphere API' });
});

app.use("/api/auth", authRoutes);

// Start the Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
});
