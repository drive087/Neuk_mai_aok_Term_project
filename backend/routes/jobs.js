const express = require('express')
const mongoUtil = require('../mongoUtil')
const jwt = require('jsonwebtoken');

let jobDb = mongoUtil.getJobDb()

const passport = require('passport')

let auth = require('../auth')

const router = express.Router()

router.get('/', (req, res) => {
    jobDb.collection('JobDetail').find({}).toArray(function(err, result) {
        if (err) throw err;
        return res.json({ 
                result
            });
      });
})

router.post('/create', auth.required, (req, res, next) => {
    const job = req.body.data
    
    jobDb.collection('JobDetail').insertOne({
        JobName:job.JobName,
        JobDetail:job.JobDetail,
        Wages:job.Wages,
        Amount:job.Amount,
        Location:job.Location,
        BeginTime:job.BeginTime,
        EndTime:job.EndTime,
        Date:job.Date,
        CurrentEmployee:job.CurrentEmployee,
        CurrentAcceptedEmployee:job.CurrentAcceptedEmployee,
        Status:job.Status,
        Employer:job.Employer,
    })

    return res.status(200).json({
        sucess:'create success'
    })
  })

  router.post('/apply', auth.required, (req, res, next) => {
    const data = req.body
    
    var mongo = require('mongodb');
    var o_id = new mongo.ObjectID(data._id);
    jobDb.collection('JobDetail')
    .findOneAndUpdate({
        _id: o_id,
      }, {
        $push: {
            CurrentEmployee: data.employee
        },
      });

    return res.status(200).json({
        sucess:'create success'
    })
  })

  router.post('/geteiei', auth.required, (req, res) => {
    const data = req.body
    return res.status(200).json({
      sucess:'test eiei'
  })
  })


module.exports = router