import React , { useState, useEffect } from 'react';
// import './Login.css';
// import FloatingLabelInput from 'react-floating-label-input';
// import axios from '../node_modules/axios';
import TextField from '@material-ui/core/TextField';
import { Button, Grid, Link } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import Footer from '../components/Footer';
import Top from '../components/Top'


function Login(props) {
  const [username, setUser] = useState(null);
  const [password, setPass] = useState(null);
  

//   useEffect(() => {

//     if (localStorage.getItem('token') != "null"){

//       axios.get('http://localhost:8080/login',
//       {
//         headers: { Authorization: `Token ${localStorage.getItem('token')}` }
//       })
//       .then(res=>{
//           if(res.status === 200){
//             setUser(res.data.user.username) 
//             props.history.push({
//               pathname:'/Dashboard',
//               state: { username: res.data.user.username,_id: res.data.user._id}
//             });
//           }
//       })
//     }

//   },[])

//   function login(username,password,history){
//     axios.post('http://localhost:8080/login',{
//       username: username,
//       password: password
//     }).then(res=>{
//       if(res.status === 200){
//         console.log('success')
//         localStorage.setItem('token', res.data.user.token)
//         history.push({
//           pathname:'/Dashboard',
//           state: { username: username,_id: res.data.user._id}
//         });
//       }
//     }).catch(err=>{
//       if(err.response.status === 400){
//         // setStatus('*ชื่อผู้ใช้หรือรหัสผ่านผิด')
//       }
//       if(err.response.status === 422){
//         let res = err.response.data
//         if(res.errors.password){
//           // setStatus('*กรุณากรอกรหัสผ่าน')
//         }
//         if(res.errors.username){
//           // setStatus('*กรุณากรอกชื่อผู้ใช้')
//         }
//       }
//     })
//   }
 
  return (
    <div>
        <Top/>
        <h1>Login CU PART-TIME</h1>
        <TextField/>
        <TextField/>
        <Button>Login</Button>
        <Footer/>
    </div>
  );
}

export default withRouter(Login);


{/* <div>
        <Grid xs={12} md={4} style={{ minHeight: '400px',marginLeft:'auto',marginRight:'auto',marginTop:'100px'}}>
          <Grid direction='column' alignItems="center" justify="center" >
            <h1>Login CU PART-TIME</h1>
            <Grid item><TextField color="primary" size="small" id="email" label="Email" variant="outlined" fullWidth /></Grid>
            <Grid item><TextField color="primary" size="small" id="pass" label="Password" type='password' variant="outlined" onChange={this.handleChange} onKeyPress={this.onKeyPressed} style={{ marginTop: '10px' }} fullWidth /></Grid>
            <Grid container justify="flex-end">
            
          </Grid>
            <Grid direction='row' style={{float:'right',marginTop:'15px'}}>
              <Button variant='contained' id='loginBtn' color='primary' style={{ marginLeft: '10px', backgroundColor:'#2a3649', width: '150px' }} flip onClick={this.onLogin}>Login</Button>
            </Grid>
          </Grid>
          <Grid item style={{ marginTop: '80px' }}>
              <Link href="/register" variant="body4">
                Don't have an account? Sign up here
              </Link>
          </Grid>
        </Grid>
      </div> */}