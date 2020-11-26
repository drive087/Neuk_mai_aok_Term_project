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
import { getAllJob } from "../actions/action";
const Schedule = () => {
  const [jobs, setJobs] = useState([]);
  const fetchData = () => {
    getAllJob()
      .then((res) => {
        console.log(res);
        setJobs(res);
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default withRouter(Schedule);
