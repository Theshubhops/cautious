import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import { connectDB } from "./lib/db.js";
import { app, server, io } from "./lib/socket.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
	origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
	credentials: true,
};
app.use(cors(corsOptions));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
	process.env.MONGO_URI = process.env.VITE_MONGO_URI;
	connectDB();
	console.log(`Server running on port: ${PORT}`);
});
