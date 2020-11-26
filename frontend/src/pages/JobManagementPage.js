import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  makeStyles,
  Container,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";
import axios from "axios";
import JobCard from "../components/JobCard";
import { getmyJobs } from "../actions/action";
const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#FFFFFF",
    border: "2px solid #000",
    boxShadow: "#BBBBBB",
    padding: 20,
  },
});
const JobManagementPage = () => {
  const classes = useStyles();
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    getmyJobs()
      .then((res) => {
        console.log(res.data.approve);
        console.log(res.data.pending);
        console.log(res.data.inprogress);
        console.log(res.data.cancel);
        console.log(res.data.myJobsCreated);
        setAllJobs([
          ...res.data.approve,
          ...res.data.pending,
          ...res.data.inprogress,
          ...res.data.cancel,
          ...res.data.myJobsCreated,
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <Container>
      <h1>ddd</h1>
      <Typography variant="h3">Job Management</Typography>
      {allJobs.map((job) => (
        <JobCard job={job}  />
      ))}
      
      <button onClick={()=>{console.log(allJobs)}}>TEST</button>
    </Container>
  );
};

export default withRouter(JobManagementPage);
