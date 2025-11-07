const mysql = require("mysql2");

/**
 * Creates and configures a MySQL database connection
 * Uses environment variables for configuration with fallback defaults
 */
const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "weather_app",
});

/**
 * Establishes the database connection and logs the result
 * @param {Function} callback - Callback function to handle connection errors
 */
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = connection;
