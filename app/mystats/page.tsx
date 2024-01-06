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
import { StatChart } from "../components/stats/StatChart";
import { useEffect, useState } from "react";
import HeightIcon from "@mui/icons-material/Height";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";

export default function MyStats() {
  const [user, setUser] = useState(null);
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
            p: 4,
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: 600, mb: 4 }}
          >
            My Stats
          </Typography>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Grid container>
                <StatBox
                  text="Blood glucose"
                  icon={<BloodtypeOutlinedIcon sx={{ fontSize: 24 }} />}
                  value={(user as any)?.blood_sugar}
                  bgcolor="#e3f2fd"
                  gridsizes={6}
                  unit={"mg/dl"}
                />

                <StatBox
                  text="Current weight"
                  icon={<ScaleOutlinedIcon sx={{ fontSize: 24 }} />}
                  value={(user as any)?.weight}
                  bgcolor="#c5cae9"
                  gridsizes={6}
                  unit={"kg"}
                />

                <StatBox
                  text="Heart Rate"
                  icon={<FavoriteBorderIcon sx={{ fontSize: 24 }} />}
                  value={78}
                  bgcolor="#f8bbd0"
                  gridsizes={6}
                  unit={"bpm"}
                />
                <StatBox
                  text="Height"
                  icon={<HeightIcon sx={{ fontSize: 24 }} />}
                  value={(user as any)?.height}
                  bgcolor="#dcedc8"
                  gridsizes={6}
                  unit={"cm"}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: 600, mb: -4, ml: 7 }}
              >
                Your Blood Glucose Stats
              </Typography>
              <StatChart />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
