"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import TextField from "@mui/material/TextField";
import axios from "axios";

export const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      //check for errors
      if (
        firstName.length < 2 ||
        lastName.length < 2 ||
        email.length < 2 ||
        password.length < 2 ||
        confirmPassword != password
      ) {
        setErrors(true);
        return;
      }

      const response = await axios.post("/api/auth/register", {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      });

      console.log(response.data);
      if (response.data.token) {
        // Store token and user details in local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ p: 6 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors
              ? firstName.length < 2 && (
                  <div style={{ color: "red" }}>
                    First name must be 2 characters
                  </div>
                )
              : null}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors
              ? lastName.length < 2 && (
                  <div style={{ color: "red" }}>
                    Last name must be 2 characters
                  </div>
                )
              : null}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {errors
              ? !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && (
                  <div style={{ color: "red" }}>Invalid email address</div>
                )
              : null}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors
              ? password.length < 8 && (
                  <div style={{ color: "red" }}>
                    Password must be atleast 8 characters
                  </div>
                )
              : null}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              fullWidth
              autoComplete="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {errors
              ? confirmPassword != password && (
                  <div style={{ color: "red" }}>Passwords do not match</div>
                )
              : null}
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};