const express = require("express");
const cors = require("cors");
const connectDB = require("./mongodb/connect");
require("dotenv").config();
const postRoutes = require("./routes/postRoutes");
const dalleRoutes = require("./routes/dalleRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

// Routes
app.get("/", async (req, res) => {
  res.send("Hello from server");
});

// Run Server

const startServer = () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log("server has started on port 8080"));
  } catch (err) {
    console.log(err);
  }
};
startServer();
