import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  makeStyles,
  Grid,
  Container,
  CardHeader,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";
import axios from "axios";
import LabelStatus from "../components/LabelStatus";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 15,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#FFFFFF",
    border: "2px solid #000",
    // boxShadow: "#BBBBBB",
    padding: 20,
  },
  space: {
    margin: 3,
  },
  button_start: {
    backgroundColor: "#00a86b",
    color: "#FFFFFF",
    "&:hover": {
      opacity: 1,
      cursor: "pointer",
      backgroundColor: "#edb879",
    },
  },
  button_edit: {
    backgroundColor: "#f2ae42",
    "&:hover": {
      opacity: 1,
      cursor: "pointer",
      backgroundColor: "#edb879",
    },
  },
  button_delete: {
    backgroundColor: "#fe2e2e",
    "&:hover": {
      opacity: 1,
      cursor: "pointer",
      backgroundColor: "#edb879",
    },
  },
  button_show: {
    backgroundColor: "#6db6d9",
    "&:hover": {
      opacity: 1,
      cursor: "pointer",
      backgroundColor: "#edb879",
    },
  },
});

const JobCard = ({ job, onShowModal }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(true);
  const bull = <span className={classes.bullet}>•</span>;
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <div>
            <LabelStatus status={"STATUS"} />
            <LabelStatus color="ready" status={job.Status} />
          </div>
        }
        subheader={
          <div className={classes.space}>
            <Grid container className={classes.space} spacing={2}>
              <Grid item>
                <Button className={classes.button_start}>Start</Button>
              </Grid>
              <Grid item>
                <Button className={classes.button_edit}>Edit</Button>
              </Grid>
              <Grid item>
                <Button className={classes.button_delete}>Delete</Button>
              </Grid>
              <Grid item>
                <Button className={classes.button_show} onClick={onShowModal}>
                  Show Colaborator
                </Button>
              </Grid>
              <Grid item>
                <Button className={classes.button_start}>Done</Button>
              </Grid>
            </Grid>
          </div>
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="h6" component="h2">
              JobName
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {job.JobName}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" component="h2">
              JobDetail
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {job.JobName}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" component="h2">
              Wages
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {job.JobName}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" component="h2">
              Amount
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {job.JobName}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="h6" component="h2">
              Location
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {job.JobName}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" component="h2">
              BeginTime
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {job.JobName}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" component="h2">
              EndTime
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {job.JobName}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" component="h2">
              Date
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {job.JobName}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default JobCard;
