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

  useEffect(() => {
    getAllJob().then((data) => {
      setJobs(data)
    });
  }, []);

  const renderList = () => {
    if (jobs != null) {
      return jobs.map((job) => {
        if (job.JobOwner == localStorage.getItem("username")) {
          return (
            <Grid item sm={4}>
              <OwnerJobForm job={job} />
            </Grid>
          );
        }
        if (jobs[1].CurrentEmployee.map((a)=> a.email).includes(localStorage.getItem("username"))) {
          return (
            <Grid item sm={4}>
              <AlreadyApplyJobForm data={job} />
            </Grid>
          );
        }
        return (
          <Grid item sm={4}>
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
