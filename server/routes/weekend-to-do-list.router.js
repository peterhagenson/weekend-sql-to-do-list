const express = require("express");
//const bodyParser = require("body-parser");
const router = express.Router();

const pool = require("../modules/pool");

//const pg = require("pg");

//const Pool = pg.Pool;

// Pool (caps P) and "new" are a constructor
// const pool = new Pool({
//   database: "weekend-to-do-list", //this can and will change for each project
//   host: "localhost",
//   PORT: 5432,
//   max: 10, // limits how many people can use your database at a time
//   idleTimeoutMillis: 30000, // how long to wait to hang up phone on someone
// });

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
