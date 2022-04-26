import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

export default function DeleteAlert(props) {
  return (
    <Stack sx={{ marginLeft: 2 }}>
      <Alert
        variant="outlined"
        severity="warning"
        action={
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            color="warning"
          >
            <Button
              onClick={() => {
                props.handleDelete();
              }}
            >
              YES
            </Button>
            <Button
              onClick={() => {
                props.setDeleteAlert(false);
              }}
            >
              NO
            </Button>
          </ButtonGroup>
        }
      >
        Are you sure that you want to delete the list?
      </Alert>
    </Stack>
  );
}
