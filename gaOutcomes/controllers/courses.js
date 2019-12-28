const express = require("express");
const router = express.Router();
const { pool } = require('../config.js');

// ========================
// Postgres development connection w/o env file
// ========================

// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "gaoutcomes_user",
//   host: "localhost",
//   database: "gaoutcomes",
//   password: "2168",
//   port: 5432
// })

// ========================
// Routes
// ========================

router.get('/', (req, res) => {
  pool.query("SELECT * FROM courses ORDER BY course, cohort", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.json(results.rows);
    }
  })
})


router.post('/', (req, res) => {
  const {course, cohort, dategraduated} = req.body;

  pool.query("INSERT INTO courses (course, cohort, dategraduated) VALUES ($1, $2, $3)", [course, cohort, dategraduated], (err, results) => {
    if (err) {
      console.log(err);
    }else {
      res.send("Course created");
    }
  })
})


router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const {course, cohort, dategraduated} = req.body;

  pool.query("UPDATE courses SET course = $1, cohort = $2, dategraduated = $3 WHERE id = $4", [course, cohort, dategraduated, id], (err, results) => {
    if (err) {
      console.log(err);
    }else {
      res.send("Course modified");
    }
  })
})


router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM courses WHERE id =$1", [id], (err, results) => {
    if (err) {
      console.log(err);
    }else {
      res.send("Course deleted");
    }
  })
})

module.exports = router;
