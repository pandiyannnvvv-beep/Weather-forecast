require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2");
const db = require("./db_config"); // Import database connection

const app = express();
const PORT = process.env.PORT || 3000; // backend on 3000

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const API_KEY = process.env.OPENWEATHER_API_KEY;

// 🌦 API route to fetch weather data
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "City name is required" });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = response.data;

    res.json({
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    });
  } catch (err) {
    console.error("Error fetching weather:", err.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }

  // Log API request to database
  const logQuery =
    "INSERT INTO api_requests (city, request_time) VALUES (?, NOW())";
  db.query(logQuery, [city], (logErr) => {
    if (logErr) {
      console.error("Error logging API request:", logErr);
    }
  });
});

// 📊 API route to fetch admin dashboard data
app.get("/admin/data", (req, res) => {
  // First, ensure the table exists
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS api_requests (
      id INT AUTO_INCREMENT PRIMARY KEY,
      city VARCHAR(255) NOT NULL,
      request_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  db.query(createTableQuery, (createErr) => {
    if (createErr) {
      console.error("Error creating table:", createErr);
      return res.status(500).json({ error: "Failed to create table" });
    }

    // Now fetch the data
    const query = `
      SELECT DATE(request_time) as date, COUNT(*) as total_requests
      FROM api_requests
      WHERE request_time >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY DATE(request_time)
      ORDER BY date ASC;
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching admin data:", err);
        return res.status(500).json({ error: "Failed to fetch admin data" });
      }
      res.json(results);
    });
  });
});

// Serve your frontend (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve admin dashboard HTML
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
