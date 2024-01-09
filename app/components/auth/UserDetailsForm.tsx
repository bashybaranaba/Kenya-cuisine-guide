"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
  OutlinedInput,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HeightIcon from "@mui/icons-material/Height";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";
import axios from "axios";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import { set } from "mongoose";

const activityLevels = [
  "Sedentary",
  "Lightly Active",
  "Moderately Active",
  "Very Active",
  "Extra Active",
];
export const UserDetailsForm = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    height: "",
    activitylevel: "",
    gender: "",
    phone_number: "",
    weight: "",
    allergies: [],
    blood_sugar: "",
    blood_pressure: "",
    cholesterol: "",
    heart_rate: "",
    medications: [],
    medical_conditions: [],
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Fetch user data from the API and set it to state
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("/api/patients/details", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserData(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.put(
          "/api/patients",
          { ...userData },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response);
        router.push("/home");
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  const handleChange = (event: any) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleArrayChange = (event: any, field: any) => {
    setUserData({ ...userData, [field]: event.target.value });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 1000,
        m: "auto",
        p: 4,
        backgroundColor: "#e8f5e9",
        borderRadius: 6,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            name="first_name"
            label="First Name"
            value={userData.first_name}
            onChange={handleChange}
            fullWidth
            sx={{ backgroundColor: "#fff" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="last_name"
            label="Last Name"
            value={userData.last_name}
            onChange={handleChange}
            fullWidth
            sx={{ backgroundColor: "#fff" }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={userData.gender}
              label="Gender"
              onChange={handleChange}
              sx={{ backgroundColor: "#fff" }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={12}>
          <TextField
            name="age"
            label="Age"
            value={userData.age}
            onChange={handleChange}
            fullWidth
            type="number"
            sx={{ backgroundColor: "#fff" }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            name="height"
            label="Height"
            value={userData.height}
            onChange={handleChange}
            fullWidth
            sx={{ backgroundColor: "#fff" }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            name="weight"
            label="Weight"
            value={userData.weight}
            onChange={handleChange}
            fullWidth
            type="number"
            sx={{ backgroundColor: "#fff" }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Activity Level</InputLabel>
            <Select
              name="activitylevel"
              value={userData.activitylevel}
              label="Activity Level"
              onChange={handleChange}
              sx={{ backgroundColor: "#fff" }}
            >
              {activityLevels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} lg={6}>
          <TextField
            name="blood_sugar"
            label="Blood Sugar"
            value={userData.blood_sugar}
            onChange={handleChange}
            fullWidth
            type="number"
            sx={{ backgroundColor: "#fff" }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            name="heart_rate"
            label="Heart Rate"
            value={userData.cholesterol}
            onChange={handleChange}
            fullWidth
            type="number"
            sx={{ backgroundColor: "#fff" }}
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <TextField
            name="blood_pressure"
            label="Blood Pressure (Systolic)"
            value={userData.blood_pressure}
            onChange={handleChange}
            fullWidth
            type="number"
            sx={{ backgroundColor: "#fff" }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            name="blood_pressure"
            label="Blood Pressure (Diastolic)"
            value={userData.cholesterol}
            onChange={handleChange}
            fullWidth
            type="number"
            sx={{ backgroundColor: "#fff" }}
          />
        </Grid>

        <Box sx={{ flexGrow: "1" }} />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ m: 2, textTransform: "none" }}
        >
          {loading ? (
            <CircularProgress size={20} color="secondary" />
          ) : (
            "Update Details"
          )}
        </Button>
      </Grid>
    </Box>
  );
};
