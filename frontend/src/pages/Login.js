import React , { useState, useEffect, Component } from 'react';
// import './Login.css';
// import FloatingLabelInput from 'react-floating-label-input';
// import axios from '../node_modules/axios';
import TextField from '@material-ui/core/TextField';
import { Button, Grid, Link } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import axios from 'axios';


function Login(props) {
  const [email, setEmail] = useState(null);
  const [password, setPass] = useState(null);
  

  useEffect(() => {
    console.log(localStorage.getItem('token'))
    if (localStorage.getItem('token') != "null"){
      console.log('sucess1')
      axios.get('/user/login',
      {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      })
      .then(res=>{
          if(res.status === 200){
            console.log('sucess')
          }
      })
    }
  },[])

  function login(email,password,history){
    console.log(email)
    console.log(password)
    axios.post('/user/login',{
      email: email,
      password: password
    })
    .then(res=>{
      if(res.status === 200){
        console.log('success')
        console.log(res.data)
        localStorage.setItem('token', res.data.user.token)
        localStorage.setItem('username', res.data.user.username)
        history.push({
          pathname:'/',
          state: { username: res.data.user.username,_id: res.data.user._id}
        });
        
        window.location.reload();
      }
      
    }).catch(err=>{
      if (err.response.status==429){
        alert("Try again in 15min.")
      }
      else if(err.response.status === 400){
        alert("Please check email or password.")
      }
      else if(err.response.status === 422){
        let res = err.response.data
        if(res.errors.password){
          alert("Please check email or password.")
        }
        if(res.errors.username){
          alert("Please check email or password.")
        }
      }
    })
  }

  function onKeyPressed(event){
    if (event.key === 'Enter') {
  
    }    
  }
 
  return (
    <div>
        return (
      <div>
        <Grid xs={12} md={4} style={{ minHeight: '400px',marginLeft:'auto',marginRight:'auto',marginTop:'15%'}}>
          <Grid direction='column' alignItems="center" justify="center" >
            <h1>Login CU PART-TIME</h1>
            <Grid item><TextField color="primary" size="small" className="input" id="email" label="email" variant="outlined" fullWidth onChange={event =>setEmail(event.target.value)} value={email}/></Grid>
            <Grid item><TextField color="primary" size="small" className="input" id="password" label="password" type='password' variant="outlined" onKeyPress={onKeyPressed} style={{ marginTop: '10px' }} fullWidth onChange={event =>setPass(event.target.value)} value={password}/></Grid>
            <Grid container justify="flex-end">
            
          </Grid>
            <Grid direction='row' style={{float:'right',marginTop:'15px'}}>
              <Button variant='contained' id='loginBtn' color='primary' style={{ marginLeft: '10px', backgroundColor:'#2a3649', width: '150px' }} flip onClick={()=>login(email,password,props.history)}>Login</Button>
            </Grid>
          </Grid>
          <Grid item style={{ marginTop: '80px' }}>
              <Link href="/register" variant="body4">
                Don't have an account? Sign up here
              </Link>
          </Grid>
        </Grid>
      </div>
    )
    </div>
  );
}

export default withRouter(Login);