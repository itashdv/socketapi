const mongoose = require("mongoose");

const connStr = 'mongodb://user740fbedb-2cde-4e26-a030-a1a3387b05b4:EG7VXPR-5KF4W9N-M0RA38S-71XGBD2@localhost:27017/db740fbedb-2cde-4e26-a030-a1a3387b05b4';

const clientOption = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  reconnectTries: 30000,
  poolSize: 50,
  useNewUrlParser: true,
  autoIndex: false
};

const initClientDbConnection = () => {
  const db = mongoose.createConnection(connStr, clientOption);
  db.on("error", console.error.bind(console, "MongoDB Connection Error>> : "));
  db.once("open", function() {
    console.log("client MongoDB Connection ok!");
  });
  require("user.js")
  return db;
};

module.exports = {
  initDbConnection
};