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
import { MealPlanDisplay } from "./components/recommendations/MealPlansDisplay";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useRouter } from "next/navigation";

export default function Home() {
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
            color="inherit"
            sx={{ textTransform: "none", ml: 2 }}
            onClick={() => router.push("/auth/login")}
          >
            Login
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            sx={{ textTransform: "none", ml: 2 }}
            onClick={() => router.push("/auth/signup")}
          >
            Sign up
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ m: 6 }} />
      <Grid container sx={{ p: 6, backgroundColor: "#c8e6c9" }}>
        <Grid item xs={12} lg={6} sx={{ p: 4 }}>
          <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
            A guide to healthy eating for Diabetics in Kenya
          </Typography>
          <Typography variant="subtitle1" component="div">
            Get personalized meal plans based on your health profile
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 4, textTransform: "none", p: 1, pl: 4, pr: 4 }}
          >
            Get Started
          </Button>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box sx={{ borderRadius: 4, m: 6, mb: -10, overflow: "hidden" }}>
            <Image
              src="/hero.png"
              alt="Picture of the author"
              width={600}
              height={350}
            />
          </Box>
        </Grid>
      </Grid>

      <Grid container sx={{ p: 12 }}>
        <Grid item xs={12} lg={4} sx={{ p: 4 }}>
          <Grid sx={{ alignItems: "center", justifyContent: "center" }}>
            <SmartToyIcon sx={{ fontSize: 50 }} color="primary" />
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              AI Powered
            </Typography>
          </Grid>
          <Typography variant="subtitle1" component="div">
            Using the latest in AI technology, we are able to provide you with
            the best meal plans based on your health profile
          </Typography>
        </Grid>
        <Grid item xs={12} lg={4} sx={{ p: 4 }}>
          <Grid sx={{ alignItems: "center", justifyContent: "center" }}>
            <SettingsAccessibilityIcon sx={{ fontSize: 50 }} color="primary" />
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              Personalized for you
            </Typography>
          </Grid>
          <Typography variant="subtitle1" component="div">
            Personalized meal plans based on your health profile
          </Typography>
        </Grid>
        <Grid item xs={12} lg={4} sx={{ p: 4 }}>
          <Grid sx={{ alignItems: "center", justifyContent: "center" }}>
            <RestaurantIcon sx={{ fontSize: 50 }} color="primary" />
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              Local Cuisine
            </Typography>
          </Grid>
          <Typography variant="subtitle1" component="div">
            Get meal plans based on local cuisine
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ m: 6 }}>
        <Grid container sx={{ p: 6, backgroundColor: "#e8f5e9" }}>
          <Grid item xs={12} lg={6}>
            <Box sx={{ borderRadius: 4, m: 6, mb: -10 }}>
              <Image
                src="/features.png"
                alt="Picture of the author"
                width={500}
                height={450}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6} sx={{ p: 4 }}>
            <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
              Key Features
            </Typography>
            <Typography variant="subtitle1" component="div">
              Personalized Recommendations: Highlight how the app offers
              tailored food suggestions based on local cuisine preferences and
              individual health profiles. Glucose Tracking: Explain the feature
              that allows users to log their meals and see how different foods
              impact their blood glucose levels. Local Cuisine Database:
              Showcase the extensive database of local dishes, all with
              nutritional information and diabetic-friendly ratings. Health
              Insights: Mention how the app provides insights into how diet
              affects diabetes management. Community Support: Briefly touch on a
              feature where users can share experiences and tips with a
              community of similar individuals.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
