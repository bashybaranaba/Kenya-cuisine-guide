"use client";

import { Box, Divider, Grid, Typography } from "@mui/material";
import AppNavBar from "./components/layout/AppNavBar";
import { DrawerHeader } from "./components/layout/DrawerHeader";
import StatBox from "./components/stats/StatBox";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import MultilineChartOutlinedIcon from "@mui/icons-material/MultilineChartOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import ScaleOutlinedIcon from "@mui/icons-material/ScaleOutlined";
import BloodtypeOutlinedIcon from "@mui/icons-material/BloodtypeOutlined";
import GetRecommendations from "./components/recommendations/GetRecommendations";

export default function Home() {
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
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            Today
          </Typography>
          <Grid container>
            <StatBox
              text="Blood glucose"
              icon={<BloodtypeOutlinedIcon sx={{ fontSize: 24 }} />}
              value={12}
              bgcolor="#e3f2fd"
            />

            <StatBox
              text="Current weight"
              icon={<ScaleOutlinedIcon sx={{ fontSize: 24 }} />}
              value={34}
              bgcolor="#c5cae9"
            />

            <StatBox
              text="Blood pressure"
              icon={<MultilineChartOutlinedIcon sx={{ fontSize: 24 }} />}
              value={56}
              bgcolor="#dcedc8"
            />
          </Grid>
          <GetRecommendations />
        </Box>
      </Box>
    </Box>
  );
}
