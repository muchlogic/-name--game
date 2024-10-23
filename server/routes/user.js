const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", authenticateToken, async (req, res) => {
  try {
    res.status(200).json("test");
  } catch (err) {
    res.status(500).json("server error");
  }
});
