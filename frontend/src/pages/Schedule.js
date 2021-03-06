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
  Grid,
} from "@material-ui/core";
import axios from "axios";
import MyCalendar from "../components/myCalendar";
import { getAllJob, getmyJobs } from "../actions/action";
const Schedule = () => {
  const [jobs, setJobs] = useState([]);
  const [myJob, setMyJob] = useState([]);
  const [approve, setApprove] = useState([]);

  const fetchData = () => {
    getmyJobs()
      .then((res) => {
        console.log(res.data);

        setApprove(res.data.approve);
        setMyJob(res.data.myJobsCreated);
        const temp = res.data.myJobsCreated
        const myJobNotDone = temp.filter(
          (job) => job.Status !== "Done"
        );
        console.log(myJobNotDone);
        const newArray = jobs.concat(
          myJobNotDone
            .concat(res.data.approve)
            .concat(res.data.inprogress)
        );
        setJobs(newArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container>
      <h1>ddd</h1>
      <Typography variant="h3">schedule</Typography>
      <Grid style={{ display: "flex" }}>
        <Grid
          item
          sm={8}
          style={{
            marginLeft: "24px",
            marginRight: "5px",
            marginTop: "100px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {jobs.length !== 0 && <MyCalendar jobs={jobs} id={"idkrub"} />}
          {jobs.length === 0 && <MyCalendar jobs={[]} id={"idkrub"} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default withRouter(Schedule);
