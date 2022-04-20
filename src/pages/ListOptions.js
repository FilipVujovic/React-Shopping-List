import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { useSelector } from "react-redux";

import AppHeader from "../components/AppHeader";
import ItemList from "../components/ItemList";
import AddItem from "./AddItem";
import AddShop from "./AddShop";
import AddCategory from "./AddCategory";

const mdTheme = createTheme();

function DashboardContent() {
  const [buttonAction, setButtonAction] = React.useState(0);

  const listData = useSelector((state) => state.list);

  const changeButtonAction = (newValue) => {
    setButtonAction(newValue);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppHeader listName={listData.name} changeScreen={changeButtonAction} />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {buttonAction === 1 && <ItemList />}
              {buttonAction === 2 && <AddItem />}
              {buttonAction === 3 && <AddShop />}
              {buttonAction === 4 && <AddCategory />}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
