const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectDatabase = async (DATABASE_URI) => {
  try {
    const dbOptions = {
      dbName: process.env.DB_USERNAME,
    };
    await mongoose.connect(DATABASE_URI, dbOptions);
    console.log("Database connected");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDatabase;
