import { Paper, Grid } from '@material-ui/core';
import React from 'react';
import facebookIcon from '../pic/socialIcon/facebookIcon.png';
import lineIcon from '../pic/socialIcon/lineIcon.png';
import youtubeIcon from '../pic/socialIcon/youtubeIcon.png';
import '../pages/style.css';

function Footer(props) {
    
    return (
        <div style={{paddingTop:'23%'}}>
        <Paper square elevation={0} fullWidth style={{ backgroundColor: '#191e25', marginTop:'48px' }}>
            <Grid container style={{ width: 'auto'}} id='FooterGrid'>
                <Grid container id="FooterGrid1" item xs={12} sm={12} md={6}>
                    <Grid item md={12} xs={12}><h1 id='white'>About Us</h1></Grid>
                    <Grid id='white' item md={8} xs={12}>
                        <p> This is the website for finding jobs and employing people. 
                            We create this website because we believe all people have different talents and skills.
                            We hope that this website can encourage people to find their value.</p>
                        <h2>© 2020 - actime & CO.</h2>
                    </Grid>
                </Grid>
                <Grid id="FooterGrid2" item xs={12} sm={12} md={6}>
                    <Grid item id='white'>
                        <h2>Address: </h2>
                        <p>254 Phayathai Rd., Wang Mai, Pathum Wan District, Bangkok 10330<br/>Call : 080-778-890</p>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    </div>
    );
  }
  
  export default Footer;
  