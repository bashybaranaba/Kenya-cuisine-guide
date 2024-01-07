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
import HeightIcon from "@mui/icons-material/Height";
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
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: 600, mt: -3, mb: 2 }}
          >
            Welcome {(user as any)?.first_name}!
          </Typography>

          <Grid container>
            <StatBox
              text="Blood glucose"
              icon={<BloodtypeOutlinedIcon sx={{ fontSize: 24 }} />}
              value={(user as any)?.blood_sugar}
              bgcolor="#e3f2fd"
              unit={"mg/dl"}
              field={"blood sugar"}
              title={"Update your Blood sugar"}
            />

            <StatBox
              text="Current weight"
              icon={<ScaleOutlinedIcon sx={{ fontSize: 24 }} />}
              value={(user as any)?.weight}
              bgcolor="#c5cae9"
              unit={"kg"}
              field={"weight"}
              title={"Update your Weight"}
            />

            <StatBox
              text="Height"
              icon={<HeightIcon sx={{ fontSize: 24 }} />}
              value={(user as any)?.height}
              bgcolor="#dcedc8"
              unit={"cm"}
              field={"height"}
              title={"Update your Height"}
            />
          </Grid>

          <MealPlanDisplay />
        </Box>
      </Box>
    </Box>
  );
}
