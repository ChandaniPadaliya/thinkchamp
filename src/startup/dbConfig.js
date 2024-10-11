const mongoose = require("mongoose")
module.exports = function () {
  // Configuring the database
  mongoose.Promise = global.Promise;

  let URL = process.env.DataBase;

  mongoose.set("strictQuery", false);

  mongoose
    .connect(URL,)
    .then(() => {
      console.log("INFO: Successfully connected to the database");
    })
    .catch((err) => {
      console.log("INFO: Could not connect to the database.", err);
      process.exit();
    });
};
