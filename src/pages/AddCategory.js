import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import CategoryTwoToneIcon from "@mui/icons-material/CategoryTwoTone";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function AddShop() {
  const [success, setSuccess] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = new FormData(event.currentTarget).get("name");
    const description = new FormData(event.currentTarget).get("description");

    if (!name || !description) {
      setSuccess(false);
      return;
    }

    const payload = {
      name,
      description,
    };

    const response = await fetch("http://localhost:9000/category", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      setSuccess(false);
      return;
    }
    setSuccess(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {success === true && (
          <Alert severity="success">Category added successfully.</Alert>
        )}
        {success === false && (
          <Alert severity="error">An error occured - Check input data!</Alert>
        )}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <CategoryTwoToneIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Category
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              id="description"
              autoComplete="description"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Category
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
