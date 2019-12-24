// ========================
// Postgres connection
// ========================

const Pool = require("pg").Pool;
const pool = new Pool({
  // user: "wincylaw"
  host: "localhost",
  database: "gaoutcomes",
  // password: "2168"
  port: 5432
})

// ========================
// Routes
// ========================

const getUsers = (req, res) => {
  pool.query("SELECT * FROM students", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.json(results.rows);
    }
  })
}


const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM students WHERE id = $1", [id], (err, results) => {
    if (err) {
      console.log(err);
    }else {
      res.json(results.rows);
    }
  })
}


const createUser = (req, res) => {
  const {name, course, cohort} = req.body;

  pool.query("INSERT INTO students (name, course, cohort) VALUES ($1, $2, $3)", [name, course, cohort], (err, results) => {
    if (err) {
      console.log(err);
    }else {
      res.send("User created");
    }
  })
}


const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const {name, course, cohort} = req.body;

  pool.query("UPDATE students SET name = $1, course = $2, cohort = $3 WHERE id = $4", [name, course, cohort, id], (err, results) => {
    if (err) {
      console.log(err);
    }else {
      res.send("User modified");
    }
  })
}


const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM students WHERE id =$1", [id], (err, results) => {
    if (err) {
      console.log(err);
    }else {
      res.send("User deleted");
    }
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
