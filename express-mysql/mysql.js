const mysql = require("mysql");
const CONFIG = require("./config");
const connection = mysql.createConnection({
  host: CONFIG.HOST,
  user: CONFIG.USER,
  password: CONFIG.PASSWORD,
  database: CONFIG.DATABASE,
  queueLimit: CONFIG.QUEUE_LIMIT,
  waitForConnection: CONFIG.WAIT_FOR_CONNECTION,
});

module.exports = connection;
