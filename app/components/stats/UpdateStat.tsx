import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { Grid } from "@mui/material";

import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";

import Select, { SelectChangeEvent } from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  title: string;
  description: string;
  value: number;
  bgcolor: string;
}

function getStyles(name: string, foodName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      foodName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function UpdateStat() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const [foodName, setfoodName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof foodName>) => {
    const {
      target: { value },
    } = event;
    setfoodName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <React.Fragment>
      <Button
        size="small"
        startIcon={<AddIcon />}
        sx={{ textTransform: "none" }}
        onClick={handleClickOpen}
        color="inherit"
      >
        Update
      </Button>
      <Dialog open={open} fullWidth maxWidth="md" onClose={handleClose}>
        <DialogTitle>Add Diary Entry</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Update your blood glucose
          </DialogContentText>
          <Grid container spacing={1}>
            <Grid item lg={12}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Blood Glucose After"
                type="email"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ m: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClose}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
