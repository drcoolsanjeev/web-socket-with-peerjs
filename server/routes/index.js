const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

router.post("/:room", (req, res) => {
  console.log(req.body);
  const body = req.body;
});

module.exports = router;
