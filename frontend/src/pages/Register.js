import React, { useState, useEffect, Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import GenderRadioButton from "../components/GenderRadioButton";
import DatePicker from "../components/DatePicker";
import validator from "validator";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Register(props) {
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      width: "20%",
    },
  }));

  const classes = useStyles();

  const { register, handleSubmit } = useForm();

  var history = useHistory();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    const first_name = data.firstName;
    const last_name = data.firstName;
    const gender = data.gender;
    const birthday = data.birthday;
    const confirmPassword = data.confirmPassword;

    if (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      first_name === "" ||
      last_name === "" ||
      gender === "" ||
      birthday === ""
    ) {
      alert("Please fill in the information completely!!");
    } else if (!validator.isEmail(email)) {
      alert("Invalid Email!. Please check your email format");
    } else if (password.length < 6) {
      alert("Your password must more than 6 characters!!");
    } else if (password !== confirmPassword) {
      alert("The confirm password does not match!!");
    } else {
      const req = {
        email: data.email,
        password: data.password,
        first_name: data.firstName,
        last_name: data.firstName,
        gender: data.gender,
        birthday: data.birthday,
      };
      console.log(req)
      mongoRegister(req);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      style={{ marginTop: "70px", minHeight: "520px", paddingBottom: "50px" }}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Typography
          id="title"
          component="h1"
          variant="h5"
          style={{ marginTop: "5%", fontWeight: "bold" }}
        >
          Sign up for CU PART-TIME
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                color="primary"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                inputRef={register}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                color="primary"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                color="primary"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                autoComplete="confirm-password"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                color="primary"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                color="primary"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <GenderRadioButton inputRef={register} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                id="birthday"
                name="birthday"
                label="Birthday"
                type="date"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            id="registerBtn"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{ backgroundColor: "#2f4961" }}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );

  function mongoRegister(data) {
    fetch("http://localhost:8000/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        console.log("123");
        if (response.status >= 400) {
          alert("Email already used");
          throw new Error("Bad response from server");
        } else {
          alert("Sucess!!");
          window.location.replace("/");
        }
        return response.json();
      })
      .then(function (resData) {
        console.log("sucess dii");

        props.history.push("/");
        // console.log(resData);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}

export default withRouter(Register);
