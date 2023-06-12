const mongoose = require("mongoose");
const debug = require("debug");

const dbConnection = async () => {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(encodeURI(process.env.DB_CONNECT), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const conn = mongoose.connection;

    console.log(`mongodb connected on port: ${conn.port}`);
    conn.on("connected", () => {
      debug("DB connected");
    });

    conn.on("error", (err) => {
      debug(`Db connection error ${err}`);
    });

    conn.on("disconnected", () => {
      debug(`Db disconnected`);
    });
    return conn;
  } catch (error) {
    console.log(error);
    debug({ message: error.message });
  }
};
module.exports = dbConnection;
