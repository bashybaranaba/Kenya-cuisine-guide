import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import axios from "axios";
import { RecommendationFeedback } from "./RecommendationFeedback";

export const MealPlanDisplay = ({ userId }: any) => {
  const [mealPlan, setMealPlan] = useState(null);

  useEffect(() => {
    const fetchMealPlan = async () => {
      const token = localStorage.getItem("token");
      console.log("token", token);

      try {
        const response = await axios.get(`/api/recommendations`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMealPlan(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching meal plan:", error);
      }
    };

    fetchMealPlan();
  }, [userId]);

  if (!mealPlan) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 1 }}>
        Recommendations
      </Typography>

      <Divider sx={{ marginBottom: 4 }} />

      <Grid container spacing={6}>
        {Object.entries(mealPlan).map(([mealType, items]: [any, any]) => (
          <Grid item xs={12} sm={6} md={4} key={mealType}>
            <Typography variant="subtitle2" color="primary">
              {mealType.toUpperCase()}
            </Typography>
            {items.map((item: any, index: any) => (
              <>
                <Grid container>
                  <Grid item xs={11} lg={11} key={item.id}>
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
                        recommendationId={item.foodRecommendationId}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Divider sx={{ marginBottom: 1 }} />
              </>
            ))}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
