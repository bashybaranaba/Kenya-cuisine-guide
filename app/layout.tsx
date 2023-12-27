"use client";
import { mainTheme } from "./theme/themes";
import { ThemeProvider, CssBaseline } from "@mui/material";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Kenyan Cuisine Guide</title>
        <meta
          name="description"
          content="A guide to Kenyan cuisine and recipes for diabetics"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <body>{children}</body>
      </ThemeProvider>
    </html>
  );
}
