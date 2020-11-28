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
  Paper,
  Tabs,
  Tab,
  AppBar,
  Box,
} from "@material-ui/core";
import axios from "axios";
import JobCard from "../components/JobCard";
import { getmyJobs } from "../actions/action";
import SwipeableViews from "react-swipeable-views";
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

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
const JobManagementPage = () => {
  const classes = useStyles();
  const [approve, setApprove] = useState([]);
  const [pending, setPending] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [cancel, setCancel] = useState([]);
  const [myJob, setMyJob] = useState([]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
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
        setApprove(res.data.approve);
        setPending(res.data.pending);
        setInprogress(res.data.inprogress);
        setCancel(res.data.cancel);
        setMyJob(res.data.myJobsCreated);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <h1>ddd</h1>

      <Typography variant="h3">Job Management</Typography>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Approve" />
          <Tab label="Pending" />
          <Tab label="Inprogress" />
          <Tab label="Cancel" />
          <Tab label="MY Job" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={"x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          {approve.map((job) => (
            <JobCard _status={"Approve"} job={job} />
          ))}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {pending.map((job) => (
            <JobCard _status={"Pending"} job={job} />
          ))}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {inprogress.map((job) => (
            <JobCard  _status={"Inprogress"} job={job} />
          ))}
        </TabPanel>
        <TabPanel value={value} index={3}>
          {cancel.map((job) => (
            <JobCard _status={"Cancel"} job={job} />
          ))}
        </TabPanel>
        <TabPanel value={value} index={4}>
          {myJob.map((job) => (
            <JobCard job={job} isMyJob={true}/>
          ))}
        </TabPanel>
      </SwipeableViews>
    </Container>
  );
};

export default withRouter(JobManagementPage);
