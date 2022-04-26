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
import Divider from "@mui/material/Divider";
import ItemsNotFound from "../components/ItemsNotFound";

import DeleteAlert from "../components/DeleteAlert";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [checked, setChecked] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [deleteAlert, setDeleteAlert] = useState(false);
  const navigate = useNavigate();
  const listData = useSelector((state) => state.list);

  useEffect(() => {
    getItemsForList().then(() => {
      fetchCategoryData();
    });
  }, [items.length]);

  const getItemsForList = () => {
    return fetch(`http://localhost:9000/list/${listData.name}`, {
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

  const fetchCategoryData = async () => {
    const tempData = [];
    const itemLength = items.length;
    if (itemLength > 0) {
      for (let i = 0; i < itemLength; i++) {
        const response = await fetch(
          `http://localhost:9000/catbyId/${items[i].category}`
        );
        const responseJSON = await response.json();
        tempData.push(responseJSON[0]);
      }
      const ids = tempData.map((obj) => obj._id);

      const filtered = tempData.filter(
        ({ _id }, index) => !ids.includes(_id, index + 1)
      );

      setCategoryData(filtered);
    }
  };

  const handleToggle = (value) => () => {
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
    setDeleteAlert(false);
    fetch(`http://localhost:9000/list/${listData.id}`, {
      method: "DELETE",
    }).then((response) => {
      navigate("/");
    });
  };

  const dynamicSearch = () => {
    if (selectedCategory === "All") {
      return items;
    } else {
      return items.filter((item) => item.category.includes(selectedCategory));
    }
  };

  const handleCategorySelect = (value) => {
    setSelectedCategory(value);
  };

  if (items.length > 0 && categoryData.length > 0) {
    return (
      <Fragment>
        {deleteAlert === true && (
          <DeleteAlert
            handleDelete={handleDelete}
            setDeleteAlert={setDeleteAlert}
          ></DeleteAlert>
        )}
        <List
          sx={{
            m: 2,
            width: "100%",
            bgcolor: "background.paper",
          }}
        >
          {items.length > 0 &&
            dynamicSearch().map((value) => {
              const labelId = value._id;
              return (
                <ListItem key={value._id} disablePadding>
                  <ListItemButton onClick={handleToggle(value)} sx={{ ml: 4 }}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={`${value.name
                        .charAt(0)
                        .toUpperCase()}${value.name.substring(1, 50)}`}
                      secondary={`Quantity : ${value.quantity}`}
                    />
                  </ListItemButton>
                  <Divider variant="middle" />
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
            onClick={() => setDeleteAlert(true)}
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
              <MenuItem value="All">
                <em>All</em>
              </MenuItem>
              {categoryData.length > 0 &&
                categoryData.map((category) => {
                  return (
                    <MenuItem value={category._id}>{`${category.name
                      .charAt(0)
                      .toUpperCase()}${category.name.substring(
                      1,
                      50
                    )}`}</MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Stack>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        {deleteAlert === true && (
          <DeleteAlert
            handleDelete={handleDelete}
            setDeleteAlert={setDeleteAlert}
          ></DeleteAlert>
        )}
        <Stack width="100%">
          <ItemsNotFound
            comp={"itemList"}
            setDeleteAlert={setDeleteAlert}
          ></ItemsNotFound>
        </Stack>
      </Fragment>
    );
  }
}
