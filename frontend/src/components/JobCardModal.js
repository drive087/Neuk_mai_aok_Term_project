import React, { useState ,useEffect} from "react";
import { withRouter } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import axios from "axios";
import Modal from "react-modal";
import { applyJob } from "../actions/action";

const JobCardModal = ({ job }) => {
  const [modalToggle, setModalToggle] = useState(false);
  const [jobName, setJobName] = useState(job.JobName)
  const [jobDetail, setJobDetail] = useState(job.JobDetail)
  const [wages, setWages] = useState(job.Wages)
  const [location, setLocation] = useState(job.Location)
  const [startDate, setStartDate] = useState(job.BeginTime)
  const [endDate, setEndDate] = useState(job.EndTime)
  const [jobOwner, setJobOwner] = useState(job.JobOwner)

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
    applyJob(job._id)
      .then((res) => setModalToggle(false))
      .catch((err) => {
        alert("Cannot Apply Job");
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
        <h3>{`Description : ${jobDetail}`}</h3>
        <p>{`Wages : ${wages}`}</p>
        <p>{`Location : ${location}`}</p>
        <p>
          {`Time : ${startDate} - ${endDate}`}
        </p>
        <p>{`Employer : ${jobOwner}`}</p>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onApplyJob()}
        >
          Apply
        </Button>
      </Modal>
    </div>
  );
};

export default withRouter(JobCardModal);
