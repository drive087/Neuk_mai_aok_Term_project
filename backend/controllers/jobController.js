const express = require("express");
const bcrypt = require("bcryptjs");
const Job = require("../models/jobModel");

exports.getAll = async (req, res, next) => {
  console.log("asdasdas");
  Job.find()
    .then((jobs) => {
      res.json(jobs);
    })
    .catch((err) => console.log(err));
};

exports.newJob = async (req, res) => {
  const job = req.body;

  const newJob = new Job({
    JobName: job.JobName,
    JobDetail: job.JobDetail,
    Wages: job.Wages,
    Amount: job.Amount,
    Location: job.Location,
    BeginTime: job.BeginTime,
    EndTime: job.EndTime,
    Date: job.Date,
    CurrentEmployee: job.CurrentEmployee,
    CurrentAcceptedEmployee: job.CurrentAcceptedEmployee,
    Status: 'Ready',
    Employer: job.Employer,
  });
  newJob
    .save()
    .then((job) => res.json(job))
    .catch((err) => console.log(err));
};

exports.apply  = async (req, res) => {
    
}

