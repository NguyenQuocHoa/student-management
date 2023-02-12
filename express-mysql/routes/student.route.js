const express = require("express");
const router = express.Router();
const controller = require("../controllers/student.controller");

router.get("/", (req, res, next) => {
  controller.getStudents(req, res, next);
});

router.get("/:id", (req, res, next) => {
  controller.getStudentById(req, res, next);
});

router.post("/", (req, res, next) => {
  controller.insertStudent(req, res, next);
});

router.put("/:id", (req, res, next) => {
  controller.updateStudent(req, res, next);
});

router.delete("/:id", (req, res, next) => {
  controller.deleteStudent(req, res, next);
});

module.exports = router;
