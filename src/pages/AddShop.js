import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function AddShop() {
  const [success, setSuccess] = useState();
  const [message, setMessage] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = new FormData(event.currentTarget).get("name");
    const address = new FormData(event.currentTarget).get("address");
    const city = new FormData(event.currentTarget).get("city");

    if (!name || !address || !city) {
      setMessage("Please provide all required data!");
      setSuccess(false);
      return;
    }

    const payload = {
      name,
      address,
      city,
    };

    const response = await fetch("http://localhost:9000/shop", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log(response);
      setMessage("Check input data!");
      setSuccess(false);
      return;
    }
    setSuccess(true);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {success === true && (
          <Alert severity="success">Shop added successfully.</Alert>
        )}
        {success === false && (
          <Alert severity="error">An error occured - {message}</Alert>
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
            <ShoppingCartTwoToneIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Shop
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
              name="address"
              label="Address"
              id="address"
              autoComplete="address"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="city"
              label="City"
              id="city"
              autoComplete="city"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Shop
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
