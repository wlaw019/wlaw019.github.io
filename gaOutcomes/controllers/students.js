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

  pool.query("SELECT students.*, courses.course, courses.cohort, courses.dategraduated FROM students LEFT JOIN courses ON courses.id = students.course_id ORDER BY students.name", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.json(results.rows);
    }
  })
})


router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM students WHERE id = $1", [id], (err, results) => {
    if (err) {
      console.log(err);
    }else {
      res.json(results.rows);
    }
  })
})


router.post('/', (req, res) => {
  const {name, dateoffer, course_id} = req.body;

  if (dateoffer==="") {
    pool.query("INSERT INTO students (name, course_id) VALUES ($1, $2)", [name, course_id], (err, results) => {
      if (err) {
        console.log(err);
      }else {
        res.send("Student created");
      }
    })
  } else {
    pool.query("INSERT INTO students (name, dateoffer, course_id) VALUES ($1, $2, $3)", [name, dateoffer, course_id], (err, results) => {
      if (err) {
        console.log(err);
      }else {
        res.send("Student created");
      }
    })
  }

})


router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const {name, dateoffer, course_id} = req.body;

  pool.query("UPDATE students SET name = $1, dateoffer = $2, course_id = $3 WHERE id = $4", [name, dateoffer, course_id, id], (err, results) => {
    if (err) {
      console.log(err);
    }else {
      res.send("Student modified");
    }
  })
})


router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM students WHERE id =$1", [id], (err, results) => {
    if (err) {
      console.log(err);
    }else {
      res.send("Student deleted");
    }
  })
})

module.exports = router;
