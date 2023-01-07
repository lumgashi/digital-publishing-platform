import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { connectDB } from "./config/database/db.js";
import { errorHandler } from "./middleware/error.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postroutes.js";

const app = express();
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());
app.use(helmet());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

//error middleware
app.use(errorHandler);

app.listen(5000, console.log(`server has started listening`));
