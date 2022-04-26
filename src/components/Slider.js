import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function InputSlider(props) {
  const [sliderValue, setSliderValue] = useState(0);
  const handleSliderChange = (event, newValue) => {
    props.setQuantity(newValue);
    setSliderValue(newValue);
  };

  const handleInputChange = (event) => {
    console.log(event.target.value);
    props.setQuantity(
      event.target.value === "" ? "" : Number(event.target.value)
    );
  };

  const handleBlur = () => {
    if (sliderValue <= 0) {
      props.setQuantity(1);
    } else if (sliderValue > 100) {
      props.setQuantity(100);
    }
  };

  return (
    <Box sx={{ width: 350, m: 2 }}>
      <Typography id="input-slider" gutterBottom>
        Quantity
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof sliderValue === "number" ? sliderValue : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={props.value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 1,
              max: 100,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
