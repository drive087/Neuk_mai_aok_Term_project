import React , { useState, useEffect, Component } from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Card, Grid } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import DatePicker from '../components/DatePicker';
import CheckBox from '../components/CheckBox';
import axios from 'axios';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import StarsIcon from '@material-ui/icons/Stars';
import JobCardModal from './JobCardModal'

function JobForm(props) {

    const jobName = props.data.JobName
    const wages = props.data.Wages
    const amount = props.data.Amount
    const location = props.data.Location
    const date = props.data.Date

  return (
        <Card alignItems='center' id="ListingJobForm" style={{ marginBottom: '10px', height: '290px', backgroundColor: '#D8D8D8', opacity: '80%', borderRadius: '3%', alignItems: 'center' }}>
          <div>
            <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Grid item md={12}>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <h2>{jobName}</h2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <MonetizationOnOutlinedIcon />
                  <p> : {wages} ฿</p>&nbsp;&nbsp;&nbsp;
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <EventOutlinedIcon />
                  <p> : {date}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <LocationOnOutlinedIcon />
                  <p> : {location}</p>
                </div>

                <JobCardModal
                  job = {props}
                />

              </Grid>

            </Grid>
          </div>
        </Card>
  );
}

export default withRouter(JobForm);