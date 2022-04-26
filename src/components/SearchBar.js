import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

export default function SearchBar(props) {
  return (
    <Paper
      component="form"
      sx={{ m: 2, display: "flex", alignItems: "center" }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Shop Name..."
        onChange={(event) => {
          props.setSearch(event.target.value);
        }}
      />
    </Paper>
  );
}
