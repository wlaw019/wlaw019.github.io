// ========================
// Dependencies
// ========================

const express = require("express");
const app = express();
const cors = require("cors");
const studentsController = require("./controllers/students.js");
const coursesController = require("./controllers/courses.js");

// require("dotenv").config();

// ========================
// Port
// ========================

const PORT = process.env.PORT || 3000;
// const PORT = process.env.PORT;

// ========================
// Middleware
// ========================

// Use public folder for static assets
// app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(cors({origin: 'http://localhost:3001'}));
app.use(cors())

app.use("/students", studentsController);
app.use("/courses", coursesController);


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
