import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { dbConnection } from "./config/database.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(dbConnection.url, dbConnection.options)
  .then(() => {
    console.log("connection established");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/", (req, res) => {
  res.send("Server is ready");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}/api`);
});
