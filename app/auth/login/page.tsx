"use client";
import React from "react";
import { LoginForm } from "../../components/auth/LoginForm";
import { UserDetailsForm } from "../../components/auth/UserDetailsForm";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SoupKitchenOutlinedIcon from "@mui/icons-material/SoupKitchenOutlined";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  return (
    <div>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Box sx={{ mr: 7 }} />
          <Image
            src="/logo.png"
            alt="Picture of the author"
            width={48}
            height={48}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, ml: 2, fontWeight: 600 }}
          >
            Kenya Cuisine Guide
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ textTransform: "none", ml: 2 }}
            onClick={() => router.push("/auth/signup")}
          >
            Sign up
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ m: 8 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} sx={{ backgroundColor: "#c8e6c9" }}>
          <Box sx={{ p: 6 }}>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: 600, mt: 2, mb: 2 }}
            >
              <SoupKitchenOutlinedIcon sx={{ fontSize: 60 }} color="primary" />
              Welcome to <br />
              Kenya Cuisine Guide
            </Typography>
            <Typography variant="subtitle1" component="div">
              Get personalized meal plans based on your health profile and food
              preferences powered by AI
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={7} sx={{ p: 10 }}>
          <Container sx={{ m: 12 }}>
            <Box sx={{ mb: 4 }} />
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <LockOutlinedIcon sx={{ mr: 2, fontSize: 50 }} color="primary" />
              <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                Log in
              </Typography>
            </Grid>

            <LoginForm />
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginPage;
