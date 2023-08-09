const app = require("./app");

const mongoose = require("mongoose");

const localEnv = require("dotenv");
localEnv.config();

const DB_HOST = `mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Mongoose: failed to connect to database");
    console.log(error.message);
    process.exit(1);
  });

app.listen(3000, () => {
  console.log(`Server running. Use our API on port: 3000`);
});
