import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  makeStyles,
  Grid,
  CardHeader,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";
import LabelStatus from "../components/LabelStatus";
import { approvePeople, deleteJobByID, doneJob } from "../actions/action";
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
    color: "#FFFFFF",
    "&:hover": {
      opacity: 1,
      cursor: "pointer",
      backgroundColor: "#edb879",
    },
  },
  button_show: {
    backgroundColor: "#1c77c3",
    color: "#FFFFFF",
    "&:hover": {
      opacity: 1,
      cursor: "pointer",
      backgroundColor: "#edb879",
    },
  },
  button_approve: {
    backgroundColor: "#5cb85c",
    color: "#FFFFFF",
    "&:hover": {
      opacity: 1,
      cursor: "pointer",
      backgroundColor: "#5cb85c",
    },
  },
});

const JobCard = ({ job, _status, isMyJob }) => {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobID] = useState(job._id);
  const [] = useState(true);
  const [jobName] = useState(job.JobName);
  const [] = useState(job.Wages);
  const [location] = useState(job.Location);
  const [jobDetail] = useState(job.JobDetail);
  const [startDate] = useState(job.BeginTime);
  const [endDate] = useState(job.EndTime);
  const [amount] = useState(job.Amount);
  const [collaborator] = useState(job.CurrentEmployee);
  const [status] = useState(job.Status ? job.Status : _status);

  const onShowModal = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleApprove = (userID) => {
    approvePeople({ jobId: jobID, userId: userID });
  };
  const handleEdit = () => {};
  const handleDelete = () => {
    const req = {
      jobId: jobID,
    };
    deleteJobByID(req)
      .then(() => alert("Delete Successful"))
      .catch(() => {
        alert("Something went wrong");
      });
  };
  const handleDone = () => {
    const req = {
      jobId: jobID,
    };
    doneJob(req)
      .then(() => alert("Job is Done"))
      .catch(() => {
        alert("Something went wrong");
      });
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <div>
            <LabelStatus status={"STATUS"} />
            <LabelStatus
              color={!!job.Status ? job.Status : `${_status}`}
              status={status}
            />
          </div>
        }
        subheader={
          isMyJob && (
            <div className={classes.space}>
              <Grid container className={classes.space} spacing={2}>
                <Grid item>
                  <Button className={classes.button_start}>Start</Button>
                </Grid>
                <Grid item>
                  <Button
                    className={classes.button_edit}
                    href={`/EditJob/${jobID}`}
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className={classes.button_delete}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </Grid>
                <Grid item>
                  <Button className={classes.button_show} onClick={onShowModal}>
                    Show Collaborator
                  </Button>
                </Grid>
                <Grid item>
                  <Button className={classes.button_start} onClick={handleDone}>
                    Done
                  </Button>
                </Grid>
              </Grid>
            </div>
          )
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="h6" component="h2">
              JobName
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {jobName}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" component="h2">
              JobDetail
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {jobDetail}
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
              {amount}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="h6" component="h2">
              Location
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {location}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" component="h2">
              BeginTime
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {startDate}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" component="h2">
              EndTime
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {endDate}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
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
            <h2 id="transition-modal-title">Collaborator</h2>
            {!!collaborator &&
              collaborator.map((people) => (
                <Grid key={`key_${people.first_name}`} container spacing={2}>
                  <Grid item>
                    <Typography>{people.first_name}</Typography>
                  </Grid>

                  <Grid item>
                    <Button
                      onClick={() => handleApprove(people.userId)}
                      className={classes.button_approve}
                    >
                      Approve
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button className={classes.button_delete}>Reject</Button>
                  </Grid>
                </Grid>
              ))}
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsModalOpen(false)}
            >
              OK
            </Button>
          </div>
        </Fade>
      </Modal>
    </Card>
  );
};

export default JobCard;
