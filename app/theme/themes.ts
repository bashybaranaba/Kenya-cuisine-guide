"use client";
import { createTheme } from "@mui/material/styles";
import { DM_Sans } from "next/font/google";

export const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#43a047",
    },
    secondary: {
      main: "#fff",
      contrastText: "#43a047",
    },
    error: {
      main: "#ff1744",
    },
  },
  typography: {
    fontFamily: dmSans.style.fontFamily,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
