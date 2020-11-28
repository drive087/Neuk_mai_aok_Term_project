import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import axios from "axios";
import Modal from "react-modal";

const OwnerJobCardModal = ({ job }) => {
  const [modalToggle, setModalToggle] = useState(false);
  const [jobID, setJobID] = useState(job.JobID);
  const [jobName, setJobName] = useState(job.JobName);
  const [wages, setWages] = useState(job.Wages);
  const [jobDetail, setJobDetail] = useState(job.JobDetail);
  const [amount, setAmount] = useState(job.Amount);
  const [location, setLocation] = useState(job.Location);
  const [startDate, setStartDate] = useState(job.BeginTime);
  const [endDate, setEndDate] = useState(job.EndTime);
  const [jobOwner, setJobOwner] = useState(job.JobOwner);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      justifyContent: "center",
    },
  };

  const onModalToggle = () => {
    setModalToggle(!modalToggle);
  };

  const onApplyJob = () => {
    axios
      .post(
        "/jobs/apply",
        { _id: jobID, employee: localStorage.getItem("username") },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          // window.location.reload();
        }
      });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Grid
        item
        xs={12}
        md={8}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Button
          variant="contained"
          color="secondary"
          style={{
            textAlign: "center",
            paddingLeft: 40,
            paddingRight: 40,
            marginTop: 10,
            height: 40,
            width: 180,
            justifyContent: "center",
            backgroundColor: "#142f55",
          }}
          onClick={onModalToggle}
        >
          More Detail
        </Button>
      </Grid>

      <Modal
        isOpen={modalToggle}
        onRequestClose={onModalToggle}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <h1>{jobName}</h1>
        <h3>Description : {jobDetail}</h3>
        <p>Wages:{wages}</p>
        <p>Location:{location}</p>
        <p>
          Data : {startDate} - {endDate}
        </p>
        <p>Employer:{jobOwner}</p>
        <Button
          disabled="True"
          variant="contained"
          color="primary"
          onClick={() => onApplyJob()}
        >
          Owner
        </Button>
      </Modal>
    </div>
  );
};

export default withRouter(OwnerJobCardModal);
