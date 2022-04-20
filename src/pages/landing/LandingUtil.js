import { useState, useEffect, Fragment } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import Header from "./LandingHeader";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { listActions } from "../../global/global-state";

const sections = [
  { title: "Add List", url: "/list" },
  { title: "Add Shop", url: "/shop" },
  { title: "Add Category", url: "/category" },
];

const theme = createTheme();

export default function LandingUtil() {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState("");
  const [categoryData, setCategoryData] = useState();
  const [searchCriteria, setSearchCriteria] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getLists();
    getCategoryData();
  }, []);

  const dynamicSearch = () => {
    return lists.filter((list) => list.shop.name.includes(searchCriteria));
  };

  const handleListItemClick = (event, selectedList) => {
    event.preventDefault();
    setSelectedList(selectedList);

    const list = lists.filter((listItem) => listItem.name === selectedList);
    dispatch(
      listActions.setListState({
        id: list[0]._id,
        name: list[0].name,
        items: list[0].items,
        shop: list[0].shop,
      })
    );
    navigate("/listOptions");
  };

  const getLists = () => {
    fetch("http://localhost:9000/list", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLists(data);
      });
  };

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Header
          title="List Management"
          sections={sections}
          setSearch={setSearchCriteria}
          categoryData={categoryData}
          setCategory={setCategory}
        />
        <main>
          <Grid sx={{ mt: 3 }}>
            <List>
              {dynamicSearch().map((list) => (
                <Fragment>
                  <ListItemButton
                    selected={selectedList === list.name}
                    onClick={(event) => handleListItemClick(event, list.name)}
                  >
                    <ListItemIcon>
                      <FactCheckIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={list.name}
                      secondary={list.shop.name}
                    />
                  </ListItemButton>
                  <Divider variant="middle" />
                </Fragment>
              ))}
            </List>
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
}
