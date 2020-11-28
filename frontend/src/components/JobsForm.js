import React, { useState, useEffect, Component } from "react";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import {
  InputLabel,
  InputBase,
  Button,
  Grid,
  Container,
  Typography,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import DatePicker from "../components/DatePicker";
import CheckBox from "../components/CheckBox";
import axios from "axios";
import JobForm from "./JobForm";
import AlreadyApplyJobForm from "./AlreadyApplyJobForm";
import OwnerJobForm from "./OwnerJobForm";
import { getAllJob } from "../actions/action";
import { API_HOST } from "../const";

const JobsForm = (props) => {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    getAllJob().then((data) => {
      setJobs(data)
    });
  }, []);

  const renderList = () => {
    if (jobs != null) {
      return jobs.map((job, key) => {
        if (job.Employer == localStorage.getItem("username")) {
          return (
            <Grid item sm={4}>
              <OwnerJobForm data={job} />
            </Grid>
          );
        }
        if (job.CurrentEmployee.includes(localStorage.getItem("username"))) {
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
