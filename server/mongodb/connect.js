const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url, {})
    .then(() => console.log("Connected MongoBD"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
