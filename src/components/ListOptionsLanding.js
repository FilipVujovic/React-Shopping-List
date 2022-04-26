import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";

export default function NoItemsFound(props) {
  return (
    <ThemeProvider>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <SettingsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            List Options
          </Typography>
          <Typography component="h6" variant="h6">
            Use the side menu to navigate.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
