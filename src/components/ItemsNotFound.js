import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import ErrorIcon from "@mui/icons-material/Error";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";

export default function NoItemsFound(props) {
  if (props.comp === "list") {
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
            <Avatar sx={{ m: 1, bgcolor: "red" }}>
              <ErrorIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              No Lists found.
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    );
  } else if (props.comp === "itemList") {
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
            <Avatar sx={{ m: 1, bgcolor: "red" }}>
              <ErrorIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              No Items found.
            </Typography>

            <Button
              onClick={() => props.setDeleteAlert(true)}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Delete List
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}
