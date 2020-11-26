import React , { useState, useEffect, Component } from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { InputLabel, InputBase, Button, Grid } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import DatePicker from '../components/DatePicker';
import CheckBox from '../components/CheckBox';
import axios from 'axios';


function CreateJob(props) {
  
  let today = new Date();
  let currentDate = new Date().toISOString();
  let currentDay = currentDate.substr(0, 10);
  let currentTime = today.toTimeString().substr(0,5);
  today.setHours(today.getHours() + 1);
  let nextTime = today.toTimeString().substr(0,5);

  const [jobName, setJobName] = useState(null);
  const [jobDetail, setJobDetail] = useState(null);
  const [wages, setWages] = useState(null);
  const [amount, setAmount] = useState(null);
  const [location, setLocation] = useState(null);
  const [beginTime, setBeginTime] = useState(currentTime);
  const [endTime, setEndtime] = useState(nextTime);
  const [date, setDate] = useState(currentDay);

  function createJob(props){
        //get all data from element below
        var data = {
            JobName: jobName,
            JobDetail: jobDetail,
            Wages: parseInt(wages),
            Amount: parseInt(amount),
            Location: location,
            BeginTime: beginTime,
            EndTime: endTime,
            Date: date,
            CurrentEmployee: [],
            CurrentAcceptedEmployee: [],
            Status: "Ready",
            Employer: localStorage.getItem('username')
        }
        var invalidInput = ["null", "undefined"]
        if (data.JobName.length == 0 || data.JobDetail.length == 0 || data.Wages.length == 0 || data.Amount.length == 0 || data.Location.length == 0) {
            alert("Please fill the Empty Box")
        }
        else if(invalidInput.includes(data.JobName) || invalidInput.includes(data.JobDetail) || invalidInput.includes(data.Location)) alert("Input can't be null or undefined")
        else if(data.JobName.length > 30 || data.JobDetail.length > 100 || data.Location.length > 50) alert("Invalid Input")
        
        else if((data.Wages < 1 || data.Wages > 10001) 
        || (typeof data.Wages !== "number")
        ) alert("Wage must be in range of 1-10,000 Baht")
        else if((data.Amount < 1 && data.Amount > 101) || (typeof data.Amount !== "number")) alert("Amount of employees must be in range of 1-100 people/job")
        else {
            axios.post('/jobs/create',data,
            {
                headers: { Authorization: `${localStorage.getItem('token')}` },  
            }).then(res=>{
                if(res.status === 200){
                    props.history.push({
                        pathname:'/',
                      })
                    window.location.reload();
                    }
                })
            }
        }

  return (
    <div style={{ marginTop: '100px', marginBottom: '100px', paddingLeft: '25%' }}>
      <h1>Create Job</h1>
      <form>
          <Grid xs={12} md={8}>
              <Grid style={{ margin: '16px', display: 'flex', direction: 'column' }}>
                  <h3> Jobname  </h3>
                  <TextField inputProps={{ maxLength: 30 }} name='Jobname' id="jobname" color="primary" variant="outlined" margin='dense' style={{ marginLeft: '20px', width: '300px' }} 
                  onChange={event =>setJobName(event.target.value)}/>
                  <h3 style={{ "padding-left": "20px" }}>Number of Employee </h3>
                  <TextField name='people' color="primary" id='amount' label="Limited Person" variant="outlined" type='number' style={{ marginLeft: '16px', width: '178px' }} 
                  onChange={event =>setAmount(event.target.value)} pattern="[0-9]*"/>
              </Grid>
              <Grid style={{ margin: '16px' }}>
                  <h3>Details </h3>
                  <TextField multiline={true} rows={5} color="primary" name='detail' id="jobdescription" variant="outlined" margin='dense' style={{ width: 794 }} 
                  onChange={event =>setJobDetail(event.target.value)}/>
              </Grid>
              <Grid style={{ margin: '16px', display: 'flex', direction: 'column', marginTop: '40px' }}>
                  <h3>Time </h3>
                  <DatePicker
                      id='timebegin'
                      label="Start time"
                      type='time'
                      defaultValue={currentTime}
                      inputProps={{ min: '07:00' }}
                      onChange={event =>setBeginTime(event.target.value)}
                  />

                  <h3>to</h3>
                  <DatePicker
                      id='timeend'
                      label="End time"
                      type='time'
                      defaultValue={nextTime}
                      inputProps={{ min: '08:00' }}
                      onChange={event =>setEndtime(event.target.value)}
                  />
                  <TextField name='location' color="primary" id='location' label="Location" variant="outlined" style={{ marginLeft: '25px' }} 
                  onChange={event =>setLocation(event.target.value)}/>
              </Grid>
              <Grid style={{ margin: '16px', display: 'flex', direction: 'column' }}>
                  <h3>Date </h3>
                  <DatePicker
                      id='workDate'
                      label="Select Work Date"
                      type='date'
                      defaultValue={currentDay}
                      inputProps={{ min: currentDay }}
                      onChange={event =>setDate(event.target.value)}
                  />
                  <TextField name='wages' color="primary" id='wages' label="Wages (Baht)" variant="outlined" type='number' style={{ marginLeft: '27px' }} 
                  onChange={event =>setWages(event.target.value)} pattern="[0-9]*"/>
              </Grid>
              <Grid style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
                  <Button variant="contained" color='primary' style={{ backgroundColor: '#2a3649' }} 
                  onClick={()=>createJob(props)} 
                  >Submit</Button>
              </Grid>
          </Grid>

      </form>
    </div>
  );
}

export default withRouter(CreateJob);