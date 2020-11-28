import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Footer from '../components/Footer';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dashboard from './Dashboard';
import CreateJob from './CreateJob';
import Schedule from './Schedule';
import JobManagementPage from './JobManagementPage'
import EditJob from "./EditJob"


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,

    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  toolbarStyle: {
    background: '#2a3649',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 48,
    padding: '0 30px',
  },

}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function onLogout(){
    localStorage.setItem('token', null);
    localStorage.setItem('username', null);
    props.history.push({
      pathname:'/',
      state: { username: null,_id: null}
    });
    window.location.reload();
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbarStyle}>
        <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>  
        <Button id='NavBarLogo' style={{maxWidth: '140px', maxHeight: '50px', minWidth: '140px', minHeight: '50px',backgroundColor:'#2a3649'}} disableElevation variant='contained' color='primary' href='/' >CU PART-TIME</Button>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button id='logoutBtn' variant='outlined' color='inherit' onClick={()=>onLogout()}>logout</Button>
        </div>
        
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
          <List>
            <ListItem><ListItemText><Button href='/'>Home</Button></ListItemText></ListItem>
            <ListItem><ListItemText><Button href='/CreateJob'>CreateJob</Button></ListItemText></ListItem>      
            <ListItem><ListItemText><Button href='/Schedule'>My Schedule</Button></ListItemText></ListItem>
            <ListItem><ListItemText><Button href='/jobmanagement'>Job Management</Button></ListItemText></ListItem>
          </List>
        <Divider />
      </Drawer>

      <Router>
        <div >
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/CreateJob" component={CreateJob} />
          <Route exact path="/Schedule" component={Schedule} />
          <Route exact path="/jobmanagement" component={JobManagementPage} />
          <Route exact path="/EditJob/:id" component={EditJob} />

        </div>
      </Router>
      <Footer id='Footer' />
    </div>
  );
}