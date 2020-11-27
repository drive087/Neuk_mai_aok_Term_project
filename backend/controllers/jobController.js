
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

exports.getJobById = async (req, res) => {
  const jobId = req.param("id");
  Job.findById(jobId)
    .then((job) => {
      res.status(200).json(job);
    })
    .catch((err) => {
      res.status(404).json({ ErrorMessage: "Not Found this Job ID" });
    });
};

exports.editJob = async (req, res) => {
  const jobId = req.param("id");
  Job.findByIdAndUpdate(jobId, req.body)
    .then((job) => {
      res.status(201).json({ Success: "Update Job success" });
    })
    .catch((err) => {
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
                    console.log("finish cancel");
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
                  }).then((user) => console.log("finish inprogress"));
                });
              })
              .catch((err) => {
                res.json(err);
              });
          }
          res.status(200).json(user);
        });
        res.status(200).json("Ok");
      })
      .catch((err) => console.log(err));
  });
};

exports.getMyJobs = async (req, res) => {
  User.findById(req.userInfo._id).then((user) => {
    Job.find({ JobOwner: user.email }).then((jobs) => {
      res.status(200).json({
        pending: user.pending,
        inprogress: user.inprogress,
        cancel: user.cancel,
        approve: user.approve,
        myJobsCreated: jobs,
      });
    });
  });
};

exports.finishJob = async (req, res) => {
  const data = req.body;
  Job.findByIdAndUpdate(data.jobId, { Status: "Done" }).then((job) => {
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
      }).then((user) => console.log("finish done"));
    });
    res.json({ success: "finish workkkk" });
  });
};

exports.deleteJob = async (req, res) => {
  const data = req.body;
  Job.findOneAndDelete({_id : data.jobId, Status: "Ready"}).then((job) => {
    job.CurrentEmployee.map((user) => {
      User.findByIdAndUpdate(user.userId, {
        $pull: {
          pending: { JobId: job._id },
        }
      }).then((user) => {
        console.log("remove pending");
      });
    });
    job.CurrentAcceptedEmployee.map((user) => {
      User.findByIdAndUpdate(user.userId, {
        $pull: {
          approve: { JobId: job._id },
        },
      }).then((user) => console.log("remove approve"));
    });
    res.json("delete complete")
  }
  );
};
