import { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

export default function CategorySelect(props) {
  const [selectedCategory, setSelectedCategory] = useState();
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategory(typeof value === "string" ? value.split(",") : value);
    props.setCategory(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-name-label">
          {props.placeholder}
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={selectedCategory}
          onChange={handleChange}
          input={<OutlinedInput label={props.placeholder} />}
          MenuProps={MenuProps}
        >
          {props.categoryData !== undefined ? (
            props.categoryData.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem key={"No Data"} value={"No Data"}>
              {"No Data"}
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}
