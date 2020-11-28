const express = require("express");
const jobController = require("../controllers/jobController");

const router = express.Router();

router.get("/", jobController.getAll);
router.post("/create", jobController.newJob);
router.post("/apply", jobController.apply);
router.post("/approve", jobController.approve);
router.get("/myJobs", jobController.getMyJobs);
router.get("/getJobById/:id", jobController.getJobById);
router.patch("/updateJob/:id", jobController.editJob);
router.post("/finish", jobController.finishJob);
router.delete("/deleteJob", jobController.deleteJob);

module.exports = router;
