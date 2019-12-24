// ========================
// Dependencies
// ========================

const express = require("express");
const app = express();
const studentsController = require("./controllers/students.js");

require("dotenv").config();

// ========================
// Port
// ========================

const PORT = 3000;
// const PORT = process.env.PORT;

// ========================
// Middleware
// ========================

// Use public folder for static assets
// app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/students", studentsController);

// ========================
// Routes
// ========================
app.get("/", (req, res) => {
  res.json({info: "Node, Express and Postgres"});
})


// ========================
// Listener
// ========================

app.listen(PORT, () => {
	console.log("listening on port: ", PORT);
});
