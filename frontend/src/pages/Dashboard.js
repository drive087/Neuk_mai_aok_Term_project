import React , { useState, useEffect, Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';


function Dashboard(props) {
  const [jobs, setJobs] = useState(null);
  

  useEffect(() => {
    
  },[])

  function login(email,password,history){
    
  }


 
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default withRouter(Dashboard);