const express = require("express");
const bcrypt = require("bcryptjs");
const Job = require("../models/jobModel");

exports.getAll = async (req, res, next) => {
  Job.find()
    .then((jobs) => {
      res.json(jobs);
    })
    .catch((err) => console.log(err));
};

exports.newJob = async (req, res) => {
  const job = req.body;
//   const userInfo = req.userInfo

  const newJob = new Job({
    JobName: job.JobName,
    JobDetail: job.JobDetail,
    JobOwner: req.userInfo.username,
    Wages: job.Wages,
    Amount: job.Amount,
    Location: job.Location,
    BeginTime: job.BeginTime,
    EndTime: job.EndTime,
    Date: job.Date,
    CurrentEmployee: job.CurrentEmployee,
    CurrentAcceptedEmployee: job.CurrentAcceptedEmployee,
    Status: "Ready",
    Employer: job.Employer,
  });
  newJob
    .save()
    .then((job) => res.json(job))
    .catch((err) => console.log(err));
};

exports.apply = async (req, res) => {
  const data = req.body;

//   var o_id = new mongo.ObjectID(data._id);
  Job.findOneAndUpdate(
    {
      _id: data._id,
    },
    {
      $push: {
        CurrentEmployee: data.employee,
      },
    }
  )
  .then((job) => res.status(200).json("Ok"))
  .catch((err) => console.log(err));

//   return res.status(200).json({
//     sucess: "create success",
//   });
};
