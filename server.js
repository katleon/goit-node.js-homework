import app from "./app.js";
import mongoose from "mongoose";

const DB_HOST = `mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.error("Mongoose: failed to connect to database");
    console.log(error.message);
    process.exit(1);
  });
