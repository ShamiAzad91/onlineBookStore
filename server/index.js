import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from 'cors'

//Routes
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";



dotenv.config();

const app = express();

//db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log("DB ERROR =>", err);
  });

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//router middleware
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);



//port
const port = process.env.PORT || 8000;

//listening port

app.listen(port, () => {
  console.log(`Server is up and running at port ${port}`);
});
