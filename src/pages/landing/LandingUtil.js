import { useState, useEffect, Fragment } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import Header from "./LandingHeader";
import ItemsNotFound from "../../components/ItemsNotFound";

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
  const [searchCriteria, setSearchCriteria] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getLists();
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
    fetch(
      "https://0mckkj9uk9.execute-api.us-east-1.amazonaws.com/Dev/list/all",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setLists(data.items);
        }
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
        />
        <main>
          <Grid sx={{ mt: 3 }}>
            {lists.length === 0 ? (
              <ItemsNotFound comp="list"></ItemsNotFound>
            ) : (
              <List>
                {dynamicSearch().map((list) => (
                  <Fragment>
                    <ListItemButton
                      sx={{
                        backgroundColor: "rgb(210,210,210)",
                        borderRadius: 28,
                        mb: 2,
                      }}
                      selected={selectedList === list.name}
                      onClick={(event) => handleListItemClick(event, list.name)}
                    >
                      <ListItemIcon>
                        <FactCheckIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${list.name
                          .charAt(0)
                          .toUpperCase()}${list.name.substring(1, 50)}`}
                        secondary={`${list.shop.name
                          .charAt(0)
                          .toUpperCase()}${list.shop.name.substring(1, 50)}`}
                      />
                    </ListItemButton>
                  </Fragment>
                ))}
              </List>
            )}
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
}
