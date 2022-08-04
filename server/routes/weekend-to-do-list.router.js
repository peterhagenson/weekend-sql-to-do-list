const express = require("express");
const router = express.Router();

const pg = require("pg");

const Pool = pg.Pool;

// Pool (caps P) and "new" are a constructor
const pool = new Pool({
  database: "music_library", //this can and will change for each project
  host: "localhost",
  PORT: 5432,
  max: 10, // limits how many people can use your database at a time
  idleTimeoutMillis: 30000, // how long to wait to hang up phone on someone
});

module.exports = router;
