// Assuming you've already set up your MySQL connection
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Route to save fine details to the database
app.post("/saveFineDetails", (req, res) => {
  const {
    fineType,
    fineAmount,
    date,
    licenseNumber,
    finePercentage,
    // licenseStatus,
    phoneNumber, // Add phoneNumber to the parameters
  } = req.body;

  // Insert fine details into the database
  con.query(
    "INSERT INTO fines (fine_type, fine_amount, date, license_number, fine_percentage, phone_number) VALUES (?, ?, ?, ?, ?, ?)",
    [
      fineType,
      fineAmount,
      date,
      licenseNumber,
      finePercentage,
      // licenseStatus,
      phoneNumber,
    ], // Include phoneNumber in the query values
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error saving fine details");
      } else {
        res.status(200).send("Fine details saved successfully");
      }
    }
  );
});

// Route to get fine amount and date from the database
app.get("/getFineDetails", (req, res) => {
  const licenseNumber = req.query.licenseNumber;

  // Query the database to get fine amount and date
  connection.query(
    "SELECT fine_amount, date FROM fines WHERE license_number = ?",
    [licenseNumber],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error fetching fine details");
      } else {
        res.status(200).send(result);
      }
    }
  );
});

app.listen(3004, () => {
  console.log("running backend server");
});
