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

export default function MyStats() {
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
                  value={12}
                  bgcolor="#e3f2fd"
                  gridsizes={6}
                  spacing={1}
                />

                <StatBox
                  text="Current weight"
                  icon={<ScaleOutlinedIcon sx={{ fontSize: 24 }} />}
                  value={34}
                  bgcolor="#c5cae9"
                  gridsizes={6}
                  spacing={1}
                />

                <StatBox
                  text="Blood pressure"
                  icon={<MultilineChartOutlinedIcon sx={{ fontSize: 24 }} />}
                  value={56}
                  bgcolor="#dcedc8"
                  gridsizes={6}
                  spacing={1}
                />
                <StatBox
                  text="Blood pressure"
                  icon={<MultilineChartOutlinedIcon sx={{ fontSize: 24 }} />}
                  value={56}
                  bgcolor="#dcedc8"
                  gridsizes={6}
                  spacing={1}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <StatChart />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
