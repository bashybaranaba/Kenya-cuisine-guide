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
import { calculate_daily_caloric_needs } from "@/util/caloricNeedsCalculator";

export default function Home() {
  const [user, setUser] = useState(null);
  const [caloricNeeds, setCaloricNeeds] = useState(0);
  const [bmi, setBmi] = useState(0);
  //get token from local storage and fetch user details from api
  useEffect(() => {
    const token = localStorage.getItem("token");
    //if token does not exist or is expired, redirect to login page
    if (!token) {
      window.location.href = "/auth/login";
    }
    //if token expired or invalid, redirect to login page
    if (token) {
      axios
        .get("/api/patients/details", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .catch((err) => {
          console.log(err);
          window.location.href = "/auth/login";
        });
    }

    if (token) {
      const fetchUser = async () => {
        try {
          const response = await axios.get("/api/patients/details", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
          const bmi = response.data.weight / (response.data.height / 100) ** 2;
          setBmi(bmi);
          const caloricNeeds = calculate_daily_caloric_needs(
            response.data.weight,
            response.data.height,
            response.data.age,
            response.data.gender,
            response.data.activitylevel
          );
          console.log("Weight: ", response.data.weight);
          console.log("Height: ", response.data.height);
          console.log("Sex: ", response.data.gender);
          console.log("Age: ", response.data.age);
          console.log("Activity level: ", response.data.activitylevel);
          console.log("Caloric needs: ", caloricNeeds);
          setCaloricNeeds(caloricNeeds);
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
            Welcome {(user as any)?.first_name}! 🤗
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

          <Typography variant="h6" component="div" sx={{ mt: 4, m: 2 }}>
            Current BMI : <b>{bmi.toFixed(2)}</b>
            {" ("}
            {bmi < 18.5 ? (
              <b>Underweight</b>
            ) : bmi < 25 ? (
              <b>Healthy 🎉</b>
            ) : bmi < 30 ? (
              <b>Unhealthy</b>
            ) : (
              <b>Very Unhealthy</b>
            )}{" "}
            {")"}
          </Typography>

          <Typography variant="h6" component="div" sx={{ mt: 4, m: 2 }}>
            Caloric target for the day: <b>{caloricNeeds.toFixed(2)} kcal</b>
          </Typography>

          <MealPlanDisplay />
        </Box>
      </Box>
    </Box>
  );
}
