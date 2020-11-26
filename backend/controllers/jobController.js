const express = require("express");
const bcrypt = require("bcryptjs");
const Job = require("../models/jobModel");
const User = require("../models/userModel");

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
    CurrentEmployee: job.CurrentEmployee,
    CurrentAcceptedEmployee: job.CurrentAcceptedEmployee,
    Status: "Ready",
  });
  newJob
    .save()
    .then((job) => res.json(job))
    .catch((err) => console.log(err));
};

exports.apply = async (req, res) => {
  const data = req.body;

  User.findOne({ _id: req.userInfo._id }).then((user) => {
    if (user) {
      Job.findOneAndUpdate(
        {
          _id: data._id,
        },
        {
          $push: {
            CurrentEmployee: {
              userId: user._id,
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              gender: user.gender,
              birthday: user.birthday,
            },
          },
        }
      )
        .then((job) => {
          User.findOneAndUpdate(
            { _id: user._id },
            {
              $push: {
                pending: {
                  JobId: job._id,
                  JobName: job.JobName,
                  JobDetail: job.JobDetail,
                  JobOwner: job.JobOwner,
                  Wages: job.Wages,
                  Amount: job.Amount,
                  Location: job.Location,
                  BeginTime: job.BeginTime,
                  EndTime: job.EndTime,
                },
              },
            }
          ).then((user) => {
            res.status(200).json(user);
          });
          res.status(200).json("Ok");
        })
        .catch((err) => {
          res.status(404).json({ ErrorMessage: "Not found Job" });
          console.log(err);
        });
    } else {
      res.status(404).json({ ErrorMessage: "Not found user" });
    }
  });
};

exports.approve = async (req, res) => {
  const data = req.body;

  User.findById(data.userId).then((user) => {
    Job.findOneAndUpdate(
      {
        _id: data.jobId,
      },
      {
        $push: {
          CurrentAcceptedEmployee: {
            userId: user._id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            gender: user.gender,
            birthday: user.birthday,
          },
        },
        $pull: {
          CurrentEmployee: {
            userId: user._id,
          },
        },
      }
    )
      .then((job) => {
        User.findOneAndUpdate(
          { _id: user._id },
          {
            $push: {
              approve: {
                JobId: job._id,
                JobName: job.JobName,
                JobDetail: job.JobDetail,
                JobOwner: job.JobOwner,
                Wages: job.Wages,
                Amount: job.Amount,
                Location: job.Location,
                BeginTime: job.BeginTime,
                EndTime: job.EndTime,
              },
            },
            $pull: { pending: { JobId: job._id } },
          }
        ).then((user) => {
          res.status(200).json(user);
        });
        res.status(200).json("Ok");
      })
      .catch((err) => console.log(err));
  });
};
