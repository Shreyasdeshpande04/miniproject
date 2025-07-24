import express from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import { userRouter } from "./Router/user.router.js";

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(session({
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://deshpandeshreyas434:shreyas123@cluster0.xmhcnwn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    collectionName: "sessions"
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// View engine
app.set("view engine", "ejs");

// Routes
app.use(userRouter);

// MongoDB connection and server start
mongoose
  // .connect("mongodb://localhost:27017/project")
  .connect("mongodb+srv://deshpandeshreyas434:shreyas123@cluster0.xmhcnwn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });



    
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
  });
