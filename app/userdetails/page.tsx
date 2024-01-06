"use client";
import React from "react";
import { UserDetailsForm } from "../components/auth/UserDetailsForm";
import Box from "@mui/material/Box";
import AppNavBar from "../components/layout/AppNavBar";
import { DrawerHeader } from "../components/layout/DrawerHeader";

const SignupPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppNavBar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        <Box
          sx={{
            p: 8,
          }}
        >
          <UserDetailsForm />
        </Box>
      </Box>
    </Box>
  );
};

export default SignupPage;
