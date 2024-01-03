"use client";
import { Box, Divider, Grid, Typography } from "@mui/material";
import AppNavBar from "../components/layout/AppNavBar";
import { DrawerHeader } from "../components/layout/DrawerHeader";
import StatBox from "../components/stats/StatBox";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import MultilineChartOutlinedIcon from "@mui/icons-material/MultilineChartOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import ScaleOutlinedIcon from "@mui/icons-material/ScaleOutlined";
import BloodtypeOutlinedIcon from "@mui/icons-material/BloodtypeOutlined";
import GetRecommendations from "../components/recommendations/GetRecommendations";
import { MealPlanDisplay } from "../components/recommendations/MealPlansDisplay";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [user, setUser] = useState(null);
  //get token from local storage and fetch user details from api
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await axios.get("/api/patients/details", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchUser();
    }
  }, []);

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
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            Today
          </Typography>
          <Grid container>
            <StatBox
              text="Blood glucose"
              icon={<BloodtypeOutlinedIcon sx={{ fontSize: 24 }} />}
              value={(user as any)?.blood_sugar}
              bgcolor="#e3f2fd"
            />

            <StatBox
              text="Current weight"
              icon={<ScaleOutlinedIcon sx={{ fontSize: 24 }} />}
              value={(user as any)?.weight}
              bgcolor="#c5cae9"
            />

            <StatBox
              text="Blood pressure"
              icon={<MultilineChartOutlinedIcon sx={{ fontSize: 24 }} />}
              value={(user as any)?.blood_pressure}
              bgcolor="#dcedc8"
            />
          </Grid>

          <MealPlanDisplay />
        </Box>
      </Box>
    </Box>
  );
}
