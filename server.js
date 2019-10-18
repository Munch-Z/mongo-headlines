const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
const PORT = 5000 || process.env.PORT;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsdb";

//Connect to DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("client/build"));

//Routes
app.use("/api", apiRoutes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, err => {
  if (err) throw err;

  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
