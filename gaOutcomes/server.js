// ========================
// Dependencies
// ========================

const express = require("express");
const app = express();
const db = require("./queries.js")

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

// ========================
// Routes
// ========================
app.get("/", (req, res) => {
  res.json({info: "Node, Express and Postgres"});
})


app.get("/students", db.getUsers);
app.get("/students/:id", db.getUserById);
app.post("/students", db.createUser);
app.put("/students/:id", db.updateUser);
app.delete("/students/:id", db.deleteUser);


// ========================
// Listener
// ========================

app.listen(PORT, () => {
	console.log("listening on port: ", PORT);
});
