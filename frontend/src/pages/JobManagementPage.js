import React, { useEffect,useState } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onShowModal = () => {
    setIsModalOpen(true)
  }
  const handleClose = () => {
    setIsModalOpen(false)
  }
  return (
    <Container>
      <h1>ddd</h1>
      <Typography variant="h3">Job Management</Typography>
      {jobs.map((job) => (
        <JobCard job={job} onShowModal={onShowModal}/>
      ))}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isModalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpen}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Colaborator</h2>
            <p id="transition-modal-description">Hello world</p>
            <p id="transition-modal-description">Hello world</p>
            <p id="transition-modal-description">Hello world</p>
            <p id="transition-modal-description">Hello world</p>
            <Button variant="contained" color="primary" onClick={()=>setIsModalOpen(false)}>OK</Button>
          </div>
        </Fade>
      </Modal>
    </Container>
  );
};

export default withRouter(JobManagementPage);
