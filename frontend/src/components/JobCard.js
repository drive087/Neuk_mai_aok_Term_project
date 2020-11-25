import React, { useEffect } from "react";
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
} from "@material-ui/core";
import axios from "axios";

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
});

const JobCard = ({ job }) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardHeader
        title={`Status ${job.Status}`}
        subheader={
          <Button variant="contained" color="primary">
            Edit
          </Button>
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="h5" component="h2">
              JobName
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {job.JobName}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h5" component="h2">
              JobDetail
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {job.JobName}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h5" component="h2">
              Wages
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {job.JobName}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h5" component="h2">
              Amount
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {job.JobName}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="h5" component="h2">
              Location
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {job.JobName}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h5" component="h2">
              BeginTime
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {job.JobName}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h5" component="h2">
              EndTime
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {job.JobName}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h5" component="h2">
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
