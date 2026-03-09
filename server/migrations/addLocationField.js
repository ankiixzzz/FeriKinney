/**
 * Migration: addLocationField
 * Sets location: "" on all existing users and products that lack the field.
 * Run once: node server/migrations/addLocationField.js
 */

require("dotenv").config({ path: require("path").join(__dirname, "../../.env") });
const mongoose = require("mongoose");

const MONGO_URI = process.env.mongo_url;

if (!MONGO_URI) {
  console.error("mongo_url not found in environment. Check your .env file.");
  process.exit(1);
}

async function run() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");

  const db = mongoose.connection.db;

  // Update users missing the location field
  const usersResult = await db.collection("users").updateMany(
    { location: { $exists: false } },
    { $set: { location: "" } }
  );
  console.log(
    `Users updated: ${usersResult.modifiedCount} (matched: ${usersResult.matchedCount})`
  );

  // Update products missing the location field
  const productsResult = await db.collection("products").updateMany(
    { location: { $exists: false } },
    { $set: { location: "" } }
  );
  console.log(
    `Products updated: ${productsResult.modifiedCount} (matched: ${productsResult.matchedCount})`
  );

  await mongoose.disconnect();
  console.log("Migration complete. Disconnected.");
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
