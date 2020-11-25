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
  Grid,
} from "@material-ui/core";
import axios from "axios";
import MyCalendar from  '../components/myCalendar'

const Schedule = (props) => {
  return (
    <Container>
      <h1>ddd</h1>
      <Typography variant="h3">schedule</Typography>
      <Grid style={{ display: 'flex' }}>
          <Grid item sm={8} style={{ marginLeft: '24px', marginRight: '5px', marginTop: '100px', display: 'flex', justifyContent: 'center' }}>
            <MyCalendar id={'idkrub'} />
          </Grid>
          {/* <Grid item sm={4} style={{ marginLeft: '5px', marginRight: '5px', marginTop: '5px' }}>
            <JobListCard currentJob={this.state.user.currentJob} id={'idkrub'} />
            <PendingJobListCard pendingJob={this.state.user.pendingJob} id={'idkrub'} />
          </Grid> */}
        </Grid>
    </Container>
  );
}

export default withRouter(Schedule);
