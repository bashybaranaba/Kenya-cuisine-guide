import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Icon,
} from "@mui/material";
import axios from "axios";
import { RecommendationFeedback } from "./RecommendationFeedback";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import Fab from "@mui/material/Fab";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRouter } from "next/navigation";

export const MealPlanDisplay = ({ userId }: any) => {
  const [mealPlan, setMealPlan] = useState(null);
  const [recommendations, setRecommendations] = React.useState("2");

  const handleChange = (event: SelectChangeEvent) => {
    setRecommendations(event.target.value as string);
  };

  const router = useRouter();

  useEffect(() => {
    fetchMealPlan();
  }, [userId]);

  const fetchMealPlan = async () => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    //change no of recommendations TO INT

    const noOfRecommendations = parseInt(recommendations);
    try {
      const response = await axios.get(`/api/recommendations`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { no_of_recommendations: noOfRecommendations },
      });
      setMealPlan(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching meal plan:", error);
    }
  };

  if (!mealPlan)
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 1 }}>
          Recommendations
        </Typography>
        <Typography>Loading...</Typography>
      </Box>
    );

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9} md={9}>
          <Typography variant="h5" sx={{ marginBottom: 1 }}>
            Recommendations
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            Here are your recommendations for today. You can give feedback on
            each recommendation by clicking on the icons.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <Box sx={{ display: "flex", width: 230, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                No of Recommendations
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={recommendations}
                label=" No of Recommendations"
                onChange={handleChange}
                sx={{ height: 40 }}
              >
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
            <Fab
              aria-label="refresh"
              color="primary"
              sx={{ height: 42, ml: 2 }}
              onClick={fetchMealPlan}
            >
              <RefreshOutlinedIcon />
            </Fab>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ mt: 2, marginBottom: 4 }} />

      <Grid container spacing={4}>
        {Object.entries(mealPlan).map(([mealType, items]: [any, any]) => (
          <Grid item xs={12} sm={6} md={4} key={mealType}>
            <Box
              sx={{ backgroundColor: "#e8f5e9", m: 1, borderRadius: 4, p: 4 }}
            >
              <Typography variant="subtitle2" color="primary">
                {mealType.toUpperCase()}
              </Typography>
              {items.map((item: any, index: any) => (
                <>
                  <Grid container>
                    <Grid item xs={10} lg={10} key={item.id}>
                      <Box sx={{ display: "flex", mt: 2, mb: 2 }}>
                        <Avatar src="hero.png" />
                        <Grid
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Typography key={index} sx={{ m: 1 }}>
                            {item.foodDetails.english_name}
                          </Typography>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item xs={1} lg={1} key={item.id}>
                      <Box sx={{ ml: 1, mt: 2, mb: 2 }}>
                        <RecommendationFeedback
                          foodDetails={item.foodDetails}
                          recommendationId={item.recommendationId}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider sx={{ marginBottom: 1 }} />
                </>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
