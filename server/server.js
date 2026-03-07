require("dotenv").config();
const express = require("express");
const cors = require('cors');
const dbConfig = require("./config/dbConfig");

const app = express();
const port = process.env.PORT || 5000;

// Middleware - MUST be before routes
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Routes
const usersRoute = require("./routes/usersRoute");
const productsRoute = require("./routes/productsRoute");
const bidsRoute = require("./routes/bidsRoute");
const notificationsRoute = require("./routes/notificationsRoute");

app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/bids", bidsRoute);
app.use("/api/notifications", notificationsRoute);

app.listen(port, () =>
  console.log(`Node/Express Server started on port ${port}`)
);
