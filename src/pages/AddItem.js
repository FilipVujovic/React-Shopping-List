import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import Alert from "@mui/material/Alert";

import { useSelector } from "react-redux";

import Slider from "../components/Slider";
import CategorySelect from "../components/CategorySelect";

const theme = createTheme();

export default function AddItem() {
  const [success, setSuccess] = useState();
  const [quantityValue, setQuantityValue] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState();
  const [categoryData, setCategoryData] = useState();
  const [message, setMessage] = useState();

  const listData = useSelector((state) => state.list);

  useEffect(() => {
    getCategoryData();
  }, []);

  const getCategoryData = () => {
    fetch("http://localhost:9000/category", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategoryData(data);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = new FormData(event.currentTarget).get("itemName");

    if (!selectedCategory || !quantityValue || !name) {
      setMessage("Please provide all required data!");
      setSuccess(false);
      return;
    }

    //Collect item data
    const payload = {
      name,
      quantity: quantityValue,
      category: selectedCategory[0],
    };

    //Add item to the database
    const addItemToDatabase = await fetch("http://localhost:9000/item", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!addItemToDatabase.ok) {
      setMessage("Check input data!");
      setSuccess(false);
      return;
    }

    const jsonItem = await addItemToDatabase.json();

    //Get item ID to insert into list later
    const itemId = jsonItem.result.item._id;

    //Fetch list to get item array
    const list = await fetch(`http://localhost:9000/list/${listData.name}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!list.ok) {
      setSuccess(false);
      return;
    }

    const jsonList = await list.json();

    //Since fetch returns an array of lists we take the first element
    const listItems = jsonList[0].items;

    //Map item objects into item IDs to pass to the addItemToList method
    const itemIdArray = listItems.map((item) => item._id);

    addItemToList(itemIdArray, itemId);
  };

  const addItemToList = (items, itemId) => {
    const payload = {
      _id: listData.id,
      name: listData.name,
      items: [...items, itemId],
      shop: listData.shop._id,
    };
    fetch("http://localhost:9000/list", {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setSuccess(true);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="x">
        <CssBaseline />
        {success === true && (
          <Alert severity="success">Item added successfully.</Alert>
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
            <AddTwoToneIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Item
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
              id="itemName"
              label="Item Name"
              name="itemName"
              autoFocus
            />
            <CategorySelect
              categoryData={categoryData}
              setCategory={setSelectedCategory}
              placeholder={"Category"}
            />
            <Slider setQuantity={setQuantityValue} value={quantityValue} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Item
            </Button>
            <Grid container></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
