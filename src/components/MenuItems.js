import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import CategoryTwoToneIcon from "@mui/icons-material/CategoryTwoTone";
export function MainListItems(props) {
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        List Settings
      </ListSubheader>
      <ListItemButton onClick={() => props.changeScreen(1)}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Items" />
      </ListItemButton>
      <ListItemButton onClick={() => props.changeScreen(2)}>
        <ListItemIcon>
          <AddTwoToneIcon />
        </ListItemIcon>
        <ListItemText primary="Add Item" />
      </ListItemButton>
    </React.Fragment>
  );
}

export function SecondaryListItems(props) {
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        General Settings
      </ListSubheader>
      <ListItemButton onClick={() => props.changeScreen(3)}>
        <ListItemIcon>
          <ShoppingCartTwoToneIcon />
        </ListItemIcon>
        <ListItemText primary="Add Shop" />
      </ListItemButton>
      <ListItemButton onClick={() => props.changeScreen(4)}>
        <ListItemIcon>
          <CategoryTwoToneIcon />
        </ListItemIcon>
        <ListItemText primary="Add Category" />
      </ListItemButton>
    </React.Fragment>
  );
}
