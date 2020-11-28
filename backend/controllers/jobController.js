const logger = require("../log/logger");
const Job = require("../models/jobModel");
const User = require("../models/userModel");

exports.getAll = async (req, res, next) => {
  Job.find({Status: "Ready"})
    .then((jobs) => {
      logger.info("GET JOB");
      res.json(jobs);
    })
    .catch((err) => logger.error(err));
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
    .then((job) => {
      logger.info("CREATE NEW JOB SUCCESSFUL: ", job.JobName);
      res.json(job);
    })
    .catch((err) => logger.error(err));
};

exports.getJobById = async (req, res) => {
  const jobId = req.param("id");
  Job.findById(jobId)
    .then((job) => {
      logger.info("CREATE JOB SUCCESSFUL: ", jobId);
      res.status(200).json(job);
    })
    .catch((err) => {
      logger.warn("NOT FOUND JOBID: ", jobId);
      res.status(404).json({ ErrorMessage: "Not Found this Job ID" });
    });
};

exports.editJob = async (req, res) => {
  const jobId = req.param("id");
  Job.findByIdAndUpdate(jobId, req.body)
    .then((job) => {
      logger.info("EDIT JOB SUCCESSFUL: ", job.JobName);
      res.status(201).json({ Success: "Update Job success" });
    })
    .catch((err) => {
      logger.error("NOT FOUND JOBID: ", jobId);
      res.status(404).json({ ErrorMessage: "Not Found this Job ID" });
    });
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
            logger.info("UPDATE JOB SUCCESSFUL");
            res.status(200).json(user);
          });
          res.status(200).json("Ok");
        })
        .catch((err) => {
          logger.error("NOT FOUND JOB: ", err);
          res.status(404).json({ ErrorMessage: "Not found Job" });
        });
    } else {
      logger.error("NOT FOUND USER");
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
          if (job.Amount <= job.CurrentAcceptedEmployee.length + 1) {
            Job.findByIdAndUpdate(job._id, { Status: "Inprogress" })
              .then((job) => {
                job.CurrentEmployee.map((user) => {
                  User.findByIdAndUpdate(user.userId, {
                    $pull: {
                      pending: { JobId: job._id },
                    },
                    $push: {
                      cancel: {
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
                  }).then((user) => {
                    logger.error("FINISH CANCLE");
                  });
                });
                job.CurrentAcceptedEmployee.map((user) => {
                  User.findByIdAndUpdate(user.userId, {
                    $pull: {
                      approve: { JobId: job._id },
                    },
                    $push: {
                      inprogress: {
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
                  }).then((user) => logger.info("FINISH IN PROGRESS"));
                });
              })
              .catch((err) => {
                logger.error("NOT FOUND JOB", err);
                res.json(err);
              });
          }
          res.status(200).json(user);
        });
        logger.info("APPROVED");
        res.status(200).json("Ok");
      })
      .catch((err) => logger.error("NOT FOUND JOB", err));
  });
};

exports.getMyJobs = async (req, res) => {
  User.findById(req.userInfo._id).then((user) => {
    Job.find({ JobOwner: user.email })
      .then((jobs) => {
        logger.info("GET JOB", req.userInfo._id);
        res.status(200).json({
          pending: user.pending,
          inprogress: user.inprogress,
          cancel: user.cancel,
          approve: user.approve,
          done: user.done,
          myJobsCreated: jobs,
        });
      })
      .catch((err) => {
        logger.error("NOT FOUND JOBID");
      });
  });
};

exports.finishJob = async (req, res) => {
  const data = req.body;
  Job.findByIdAndUpdate(data.jobId, { Status: "Done" })
    .then((job) => {
      job.CurrentAcceptedEmployee.map((user) => {
        User.findByIdAndUpdate(user.userId, {
          $pull: {
            inprogress: { JobId: job._id },
          },
          $push: {
            done: {
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
        }).then((user) => logger.info("UPDATE USER COMPLETE"));
      });
      logger.info("FINISH WORK");
      res.json({ success: "finish workkkk" });
    })
    .catch((err) => {
      logger.error("NOT FOUND JOBID: ", err);
    });
};

exports.deleteJob = async (req, res) => {
  const data = req.body;
  Job.findOneAndDelete({ _id: data.jobId, Status: "Ready" })
    .then((job) => {
      job.CurrentEmployee.map((user) => {
        User.findByIdAndUpdate(user.userId, {
          $pull: {
            pending: { JobId: job._id },
          },
        }).then((user) => {
          logger.info("REMOVE PENDING");
        });
      });
      job.CurrentAcceptedEmployee.map((user) => {
        User.findByIdAndUpdate(user.userId, {
          $pull: {
            approve: { JobId: job._id },
          },
        }).then((user) => logger.info("REMOVE APPROVED"));
      });
      logger.info("DELETE COMPLETE");
      res.json("delete complete");
    })
    .catch((err) => {
      logger.error("NOT FOUND JOB: ", err);
    });
};

exports.rejectJob = async (req, res) => {
  const data = req.body;
  Job.findOneAndUpdate(
    {
      _id: data.jobId,
    },
    {
      $pull: {
        CurrentEmployee: {
          userId: data.userId,
        },
      },
    }
  )
    .then((job) => {
      User.findByIdAndUpdate(data.userId, {
        $pull: {
          pending: {
            JobId: data.jobId,
          },
        },
        $push: {
          cancel: {
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
      })
        .then((user) => {
          logger.info(`REJECT`);
          res.status(200).json({ success: "Reject Ok" });
        })
        .catch((err) => {
          logger.error("NOT FOUND USER", err);
          res.status(404).json({ ErrorMessage: "Not Found User" });
        });
    })
    .catch((err) => {
      logger.error("NOT FOUND JOB", err);
      res.status(404).json({ ErrorMessage: "Not Found Job" });
    });
};
