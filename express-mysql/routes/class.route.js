const express = require("express");
const router = express.Router();
const controller = require("../controllers/class.controller");

router.get("/", (req, res, next) => {
  controller.getClasses(req, res, next);
});

router.get("/:id", (req, res, next) => {
  controller.getClassById(req, res, next);
});

router.post("/", (req, res, next) => {
  controller.insertClass(req, res, next);
});

router.put("/:id", (req, res, next) => {
  controller.updateClass(req, res, next);
});

router.delete("/:id", (req, res, next) => {
  controller.deleteClass(req, res, next);
});

module.exports = router;
