const express = require("express");
//const bodyParser = require("body-parser");
const router = express.Router();

const pool = require("../modules/pool");

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id, "in delete");

  const queryText = `
  DELETE FROM "weekend-to-do-app"
  WHERE "id" = $1;`;

  pool
    .query(queryText, [id])
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put("/status/:id", (req, res) => {
  console.log("in status update");
  const id = req.params.id;
  console.log(id);

  let queryText = "";

  queryText = `
  UPDATE "weekend-to-do-app"
  SET "complete" = 'TRUE'
  WHERE "id" = $1;
  `;
  //console.log(queryText, queryValues);
  //why didn't it work when I put queryValues instead of [id]?

  pool
    .query(queryText, [id]) //second parameter needs an array
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
