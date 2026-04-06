import dotenv from "dotenv"

dotenv.config()
import express from 'express';
import cors from 'cors';
import { connectDb } from './config/upload.config.js';
import uploadRoutes from './routes/uploads.routes.js';
import  userRoutes from './routes/user.routes.js';   



const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors({
  origin: "https://file-flow-wine.vercel.app",
  credentials: true
}));

app.use(express.json());

app.use("/api/upload", uploadRoutes)
app.use("/api/user", userRoutes)

connectDb()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
