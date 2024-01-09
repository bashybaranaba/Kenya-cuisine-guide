"use client";
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", { email, password });
      if (response.data.token) {
        // Store token and user details in local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        // Redirect to home page
        router.push("/home");
      }
      setLoading(false);
    } catch (error) {
      setError(true);
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ p: 6 }}>
        <Grid item xs={12} lg={12}>
          <TextField
            required
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} lg={12}>
          <TextField
            required
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
        </Grid>
        {error && (
          <Grid item xs={12} lg={12}>
            <p style={{ color: "red" }}>Invalid email or password</p>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ textTransform: "none" }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
