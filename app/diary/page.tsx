"use client";

import { Box, Divider, Grid, Typography } from "@mui/material";
import AppNavBar from "../components/layout/AppNavBar";
import { DrawerHeader } from "../components/layout/DrawerHeader";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import AddMeal from "../components/diary/AddMeal";

export default function Diary() {
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
            My Diary
          </Typography>

          <Card sx={{ minWidth: 275, m: 2 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Your first meal of the Day
              </Typography>
              <Typography variant="h5" component="div">
                Breakfast
              </Typography>
            </CardContent>
            <CardActions>
              <AddMeal />
            </CardActions>
          </Card>

          <Card sx={{ minWidth: 275, m: 2 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Your first meal of the Day
              </Typography>
              <Typography variant="h5" component="div">
                Lunch
              </Typography>
            </CardContent>
            <CardActions>
              <AddMeal />
            </CardActions>
          </Card>

          <Card sx={{ minWidth: 275, m: 2 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Your first meal of the Day
              </Typography>
              <Typography variant="h5" component="div">
                Dinner
              </Typography>
            </CardContent>
            <CardActions>
              <AddMeal />
            </CardActions>
          </Card>

          <Card sx={{ minWidth: 275, m: 2 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Your first meal of the Day
              </Typography>
              <Typography variant="h5" component="div">
                Snacks
              </Typography>
            </CardContent>
            <CardActions>
              <AddMeal />
            </CardActions>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
