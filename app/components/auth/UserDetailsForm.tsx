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
  OutlinedInput,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HeightIcon from "@mui/icons-material/Height";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";
import axios from "axios";

const activityLevels = [
  "Sedentary",
  "Lightly Active",
  "Moderately Active",
  "Very Active",
  "Extra Active",
];
export const UserDetailsForm = () => {
  const [userData, setUserData] = useState({
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
    medications: [],
    medical_conditions: [],
  });

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
      } catch (error) {
        console.error(error);
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
        maxWidth: 600,
        m: "auto",
        p: 3,
      }}
    >
      <TextField
        name="height"
        label="Height"
        value={userData.height}
        onChange={handleChange}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel>Activity Level</InputLabel>
        <Select
          name="activitylevel"
          value={userData.activitylevel}
          label="Activity Level"
          onChange={handleChange}
        >
          {activityLevels.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Gender</InputLabel>
        <Select
          name="gender"
          value={userData.gender}
          label="Gender"
          onChange={handleChange}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>
      <TextField
        name="phone_number"
        label="Phone Number"
        value={userData.phone_number}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="weight"
        label="Weight"
        value={userData.weight}
        onChange={handleChange}
        fullWidth
        type="number"
      />
      <FormControl fullWidth>
        <InputLabel>Allergies</InputLabel>
        <Select
          name="allergies"
          multiple
          value={userData.allergies}
          onChange={(event) => handleArrayChange(event, "allergies")}
          input={<OutlinedInput label="Allergies" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {/* Map through allergy options */}
        </Select>
      </FormControl>
      <TextField
        name="blood_sugar"
        label="Blood Sugar"
        value={userData.blood_sugar}
        onChange={handleChange}
        fullWidth
        type="number"
      />
      <TextField
        name="blood_pressure"
        label="Blood Pressure"
        value={userData.blood_pressure}
        onChange={handleChange}
        fullWidth
        type="number"
      />
      <TextField
        name="cholesterol"
        label="Cholesterol"
        value={userData.cholesterol}
        onChange={handleChange}
        fullWidth
        type="number"
      />
      <FormControl fullWidth>
        <InputLabel>Medications</InputLabel>
        <Select
          name="medications"
          multiple
          value={userData.medications}
          onChange={(event) => handleArrayChange(event, "medications")}
          input={<OutlinedInput label="Medications" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {/* Map through medication options */}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Update Details
      </Button>
    </Box>
  );
};
