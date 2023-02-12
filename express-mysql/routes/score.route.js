const express = require("express");
const router = express.Router();
const controller = require("../controllers/score.controller");

router.get("/", (req, res, next) => {
  controller.getScores(req, res, next);
});

router.get("/:id", (req, res, next) => {
  controller.getScoreById(req, res, next);
});

router.post("/", (req, res, next) => {
  controller.insertScore(req, res, next);
});

router.put("/:id", (req, res, next) => {
  controller.updateScore(req, res, next);
});

router.delete("/:id", (req, res, next) => {
  controller.deleteScore(req, res, next);
});

module.exports = router;
