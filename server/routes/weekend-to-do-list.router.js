const express = require("express");
//const bodyParser = require("body-parser");
const router = express.Router();

const pool = require("../modules/pool");

router.post("/", (req, res) => {
  let newTask = req.body;
  console.log("Adding task", newTask);

  let queryText = `INSERT INTO "weekend-to-do-app" ("task", "status")
                    VALUES ($1, $2);`;
  pool
    .query(queryText, [newTask.task, newTask.status])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error adding new book", error);
      res.sendStatus(500);
    });
});

router.get("/", (req, res) => {
  console.log("in /todo GET");
  let queryText = `SELECT * FROM "weekend-to-do-app";`;
  pool
    .query(queryText)
    .then((result) => {
      console.log(result);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`error making query ${queryText}, err`);
      res.sendStatus(500);
    });
});

module.exports = router;
