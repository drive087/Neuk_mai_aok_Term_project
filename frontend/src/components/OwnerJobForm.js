import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Card, Grid } from "@material-ui/core";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import StarsIcon from "@material-ui/icons/Stars";
import OwnerJobCardModal from "./OwnerJobCardModal";

const OwnerJobForm = ({job}) => {
  
  const [jobName] = useState(job.JobName);
  const [wages] = useState(job.Wages);
  const [] = useState(job.Amount);
  const [location] = useState(job.Location);
  const [startDate] = useState(job.BeginTime);
  const [endDate] = useState(job.EndTime);

  return (
    <Card
      alignItems="center"
      id="ListingJobForm"
      style={{
        marginBottom: "10px",
        height: "290px",
        backgroundColor: "#D8D8D8",
        opacity: "80%",
        borderRadius: "3%",
        alignItems: "center",
      }}
    >
      <div>
        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item md={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StarsIcon />
              <h2>{jobName}</h2>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MonetizationOnOutlinedIcon />
              <p> : {wages} ฿</p>&nbsp;&nbsp;&nbsp;
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <EventOutlinedIcon />
              <p> : {`${startDate} - ${endDate}`} </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LocationOnOutlinedIcon />
              <p> : {location}</p>
            </div>

            <OwnerJobCardModal job={job} />
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};

export default withRouter(OwnerJobForm);
