import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import {
  Grid,
  Container,
  Typography,
} from "@material-ui/core";
import JobForm from "./JobForm";
import AlreadyApplyJobForm from "./AlreadyApplyJobForm";
import OwnerJobForm from "./OwnerJobForm";
import { getAllJob } from "../actions/action";

const JobsForm = () => {
  const [jobs, setJobs] = useState(null);
  const [timer, setTimer] = React.useState(null)

  function updatePosition(){
    getAllJob().then((data) => {
      console.log(data)
      setJobs(data)
    });
    clearTimeout(timer)
    setTimer(setTimeout(updatePosition, 200))
  }

  useEffect(() => {
    updatePosition()
  }, []);

  const renderList = () => {
    if (jobs != null) {
      return jobs.map((job) => {
        if (job.JobOwner == localStorage.getItem("username")) {
          return (
            <Grid item xs={12} sm={6} lg={4} md={4}>
              <OwnerJobForm job={job} />
            </Grid>
          );
        }
        if (job.CurrentEmployee && job.CurrentEmployee.map((a)=> a.email).includes(localStorage.getItem("username"))) {
          return (
            <Grid item xs={12} sm={6} lg={4} md={4}>
              <AlreadyApplyJobForm job={job} />
            </Grid>
          );
        }
        return (
          <Grid item xs={12} sm={6} lg={4} md={4}>
            <JobForm job={job} />
          </Grid>
        );
      });
    }
    return <h1>Loading...</h1>;
  };

  return (
    <Container>
      <Typography variant="h3">Dash Board</Typography>
      <Grid container spacing={3}>
        {renderList()}
      </Grid>
    </Container>
  );
};

export default withRouter(JobsForm);
