import React , { useState, useEffect, Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';


function CreateJob(props) {
  const [jobs, setJobs] = useState(null);
  

  useEffect(() => {
    
  },[])

  function login(email,password,history){
    
  }


 
  return (
    <div>
      <h1>CreateJob</h1>
    </div>
  );
}

export default withRouter(CreateJob);