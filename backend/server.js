const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { connectDB } = require("./Config/dbConnection");
const path = require("path");

connectDB();
const app = express();
const port = process.env.PORT;

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(express.json());
app.use(cors());

app.use("/hotels", require("./Routes/user.route"));
app.use("/hotels", require("./Routes/room.route"));
app.use("/hotels", require("./Routes/booking.route"));

app.listen(port, () => {
  console.log(` Serveur running on port ${port} `);
});
