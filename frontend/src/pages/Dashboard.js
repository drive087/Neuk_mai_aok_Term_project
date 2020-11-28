import React , { useState, useEffect, Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import JobsForm from '../components/JobsForm';


function Dashboard(props) {
 
  return (
    <div>
      <h1>Dashboard</h1>
      <JobsForm/>
    </div>
  );
}

export default withRouter(Dashboard);