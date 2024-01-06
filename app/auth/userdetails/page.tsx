"use client";
import React from "react";
import { UserDetailsForm } from "../../components/auth/UserDetailsForm";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SoupKitchenOutlinedIcon from "@mui/icons-material/SoupKitchenOutlined";
import { useRouter } from "next/navigation";

const UserDetails = () => {
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
        </Toolbar>
      </AppBar>

      <Box sx={{ mb: 10 }} />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box sx={{ display: "flex" }}>
          <PersonOutlinedIcon sx={{ mr: 2, fontSize: 50 }} color="primary" />
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: 600, m: 1 }}
          >
            Let us know more about you
          </Typography>
        </Box>
      </Grid>

      <UserDetailsForm />
    </div>
  );
};

export default UserDetails;
