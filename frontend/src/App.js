import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom'

import Navbar from './pages/Navbar'
import NavbarWithUser from './pages/NavbarWithUser'

function App() {
  if(localStorage.getItem('token') == 'null'){
    return (
      <Router>
      <Route path="/" component={Navbar}/>
      </Router>
    );
  }
  return (
    <Router>
    <Route path="/" component={NavbarWithUser}/>
    </Router>
  );
}

export default App;
