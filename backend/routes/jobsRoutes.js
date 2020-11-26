const express = require("express");
const mongoUtil = require("../mongoUtil");
const jobController = require("../controllers/jobController");

const router = express.Router();

router.get("/", jobController.getAll);
router.post("/create", jobController.newJob);
router.post("/apply", jobController.apply);
router.post("/approve", jobController.approve);
router.get("/myJobs", jobController.getMyJobs);

module.exports = router;
