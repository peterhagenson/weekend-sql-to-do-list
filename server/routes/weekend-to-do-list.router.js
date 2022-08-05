const express = require("express");
//const bodyParser = require("body-parser");
const router = express.Router();

const pool = require("../modules/pool");

router.put("/status/:id", (req, res) => {
  console.log("in status update");
  const id = req.params.id;
  const status = req.body.complete;
  console.log(id, status);

  let queryText = "";

  //let queryValues = [req.body.id];
  queryText = `
  UPDATE "weekend-to-do-app"
  SET "complete" = 'TRUE'
  WHERE "id" = $1;
  `;
  //console.log(queryText, queryValues);

  pool
    .query(queryText, [id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in PUT", err);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  let newTask = req.body;
  console.log("Adding task", newTask);

  let queryText = `INSERT INTO "weekend-to-do-app" ("task", "complete")
                    VALUES ($1, $2);`;
  pool
    .query(queryText, [newTask.task, newTask.complete])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("error adding new book", err);
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
