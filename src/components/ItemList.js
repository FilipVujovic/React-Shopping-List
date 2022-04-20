import { useEffect, useState, Fragment } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ChangeCircleRoundedIcon from "@mui/icons-material/ChangeCircleRounded";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [checked, setChecked] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();
  const listData = useSelector((state) => state.list);

  useEffect(() => {
    getItemsForList();
    fetchCategoryData();
  }, [items.length]);

  const getItemsForList = () => {
    fetch(`http://localhost:9000/list/${listData.name}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((items) => {
        setItems(items[0].items);
      });
  };

  const fetchCategoryData = () => {
    const tempData = [];
    items.forEach((item) => {
      fetch(`http://localhost:9000/catbyId/${item.category}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          tempData.push(data[0]);
        });
    });
    setCategoryData(tempData);
  };

  const handleToggle = (value) => () => {
    console.log(categoryData);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleUpdate = () => {
    checked.forEach((item) => {
      fetch(`http://localhost:9000/item/${item._id}`, {
        method: "DELETE",
      });
      setChecked(checked.filter((checkedItem) => checkedItem !== item));
    });
    getItemsForList();
  };

  const handleDelete = () => {
    //Delete list and redirect the user to the / route
    console.log(listData);
    fetch(`http://localhost:9000/list/${listData.id}`, {
      method: "DELETE",
    }).then((response) => {
      console.log(response);
      navigate("/");
    });
  };

  const dynamicSearch = () => {
    // return lists.filter((list) => list.shop.name.includes(searchCriteria));
    if (selectedCategory === "") {
      return items;
    } else {
      return items.filter((item) => item.category.includes(selectedCategory));
    }
  };

  const handleCategorySelect = (value) => {
    setSelectedCategory(value);
  };

  if (!items || items.length === 0) {
    return <p>No items.</p>;
  } else {
    return (
      <Fragment>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {items &&
            dynamicSearch().map((value) => {
              const labelId = value._id;
              return (
                <ListItem key={value._id} disablePadding>
                  <ListItemButton onClick={handleToggle(value)}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={value.name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
        </List>
        <Stack direction="row" spacing={2} padding={2} width="100%">
          <Button
            variant="outlined"
            startIcon={<ChangeCircleRoundedIcon />}
            onClick={() => handleUpdate()}
          >
            Update
          </Button>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedCategory}
              onChange={(e) => handleCategorySelect(e.target.value)}
              label="Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categoryData.map((category) => (
                <MenuItem value={category._id}>{category.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Fragment>
    );
  }
}
