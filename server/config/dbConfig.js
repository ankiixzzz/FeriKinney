const mongoose = require("mongoose");

// Use your MongoDB URI from the environment variable
const mongoURI = process.env.mongo_url;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongo DB Connection Successful");
});

connection.on("error", (err) => {
  console.error("Mongo DB Connection Failed:", err);
});

module.exports = connection;
