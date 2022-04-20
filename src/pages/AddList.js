import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CategorySelect from "../components/CategorySelect";
const theme = createTheme();

export default function AddShop() {
  const [success, setSuccess] = useState();
  const [selectedShop, setSelectedShop] = useState();
  const [shops, setShops] = useState();

  useEffect(() => {
    fetchShops();
  }, []);
  const fetchShops = () => {
    fetch("http://localhost:9000/shop", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setShops(data);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = new FormData(event.currentTarget).get("listName");

    if (!name || !selectedShop) {
      setSuccess(false);
      return;
    }

    const payload = {
      name,
      items: [],
      shop: selectedShop[0],
    };
    const response = await fetch("http://localhost:9000/list", {
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
          <Alert severity="success">List added successfully.</Alert>
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
            <FactCheckIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add List
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
              id="listName"
              label="List Name"
              name="listName"
              autoFocus
            />
            <CategorySelect
              categoryData={shops}
              setCategory={setSelectedShop}
              placeholder={"Shop"}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add List
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
