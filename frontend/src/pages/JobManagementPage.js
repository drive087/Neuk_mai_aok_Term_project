import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  makeStyles,
  Container,
} from "@material-ui/core";
import axios from "axios";
import JobCard from "../components/JobCard"

const jobs = [
  {
    _id: {
      $oid: "5fa25baf763de20ef08a2ef3",
    },
    JobName: "Test",
    JobDetail: "Test",
    Wages: 200,
    Amount: 3,
    Location: "Test",
    BeginTime: "14:43",
    EndTime: "15:43",
    Date: "2020-11-04",
    CurrentEmployee: ["drive@hotmail.com", "drive2@hotmail.com"],
    CurrentAcceptedEmployee: [],
    Status: "Ready",
    Employer: "drive@hotmail.com",
  },
  {
    _id: {
      $oid: "5fa25baf763de20ef08a2ef3",
    },
    JobName: "Test",
    JobDetail: "Test",
    Wages: 200,
    Amount: 3,
    Location: "Test",
    BeginTime: "14:43",
    EndTime: "15:43",
    Date: "2020-11-04",
    CurrentEmployee: ["drive@hotmail.com", "drive2@hotmail.com"],
    CurrentAcceptedEmployee: [],
    Status: "Ready",
    Employer: "drive@hotmail.com",
  },
];

const JobManagementPage = () => {

  useEffect(() => {});

  return (
    <div>
      <Container>
        <h1>ddd</h1>
        {jobs.map((job) => (
          <JobCard/>
        ))}
      </Container>
    </div>
  );
};

export default withRouter(JobManagementPage);
