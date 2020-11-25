import React , { useState} from 'react';
import { withRouter } from 'react-router-dom';
import {  Button, Grid } from '@material-ui/core';
import axios from 'axios';
import Modal from 'react-modal';



function AlreadyApplyJobCardModal(props) {
    const [modalToggle, setModalToggle] = useState(false)
    const _id = props.job.data._id
    const jobName = props.job.data.JobName
    const jobDetail = props.job.data.JobDetail
    const wages = props.job.data.Wages
    const amount = props.job.data.Amount
    const location = props.job.data.Location
    const beginTime = props.job.data.BeginTime
    const endTime = props.job.data.EndTime
    const date = props.job.data.Date
    const currentEmployee = props.job.data.currentEmployee
    const currentAcceptedEmployee = props.job.data.currentAcceptedEmployee
    const employer = props.job.data.Employer

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          justifyContent: 'center',
        }    
      };

    function onModalToggle(){
        setModalToggle(!modalToggle)
    }

  function onApplyJob(){
    axios.post('/jobs/apply',{_id:_id,employee:localStorage.getItem('username')},
    {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },  
    }).then(res=>{
        if(res.status === 200){
            // window.location.reload();
            }
        })
  }

  return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color='secondary' style={{
            textAlign: 'center',
            paddingLeft: 40,
            paddingRight: 40,
            marginTop: 10,
            height: 40,
            width: 180,
            justifyContent: 'center',
            backgroundColor: '#142f55'
          }} onClick={onModalToggle}>More Detail</Button></Grid>
                
                <Modal
                isOpen={modalToggle}
                onRequestClose={onModalToggle}
                contentLabel="Example Modal"
                style={customStyles}
                >
                      <h1>{jobName}</h1>
                      <h3>Description : {jobDetail}</h3>
                      <p>Wages:{wages}</p>
                      <p>Location:{location}</p>
                      <p>Date:{date}</p>
                      <p>Time : {beginTime} - {endTime}</p>
                      <p>Employer:{employer}</p>
                      <Button disabled="True" variant="contained" color="primary" onClick={()=>onApplyJob()}>Already Apply</Button>
            </Modal>
        </div>
  );
}

export default withRouter(AlreadyApplyJobCardModal);