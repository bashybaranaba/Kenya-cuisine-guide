"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Very Satisfied",
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

export function RecommendationFeedback({ foodDetails, recommendationId }: any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}>
        <UnfoldMoreIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{foodDetails.english_name}</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12} md={6}>
              <DialogContentText>
                <img
                  src={`https://www.google.com/search?q=${foodDetails.english_name}&tbm=isch`}
                  alt="food"
                />
              </DialogContentText>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{ borderRadius: 4, backgroundColor: "#e8f5e9", p: 4, m: 2 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Nutritional Information
                </Typography>
                <DialogContentText>
                  <b>Calories:</b>
                  {" " + foodDetails.ENERGY}
                  <br />
                  <b>Carbohydrates:</b>
                  {" " + foodDetails.CHOAVLDF}
                  <br />
                  <b>Protein:</b>
                  {" " + foodDetails.PROTCNT}
                  <br />
                  <b>Fat:</b>
                  {" " + foodDetails.FATCE}

                  <br />
                  <b>Fiber:</b>
                  {" " + foodDetails.FIBTG}
                  <br />
                  <b>P:</b>
                  {" " + foodDetails.P}
                </DialogContentText>
              </Box>

              <Box sx={{ m: 2 }}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Feedback"
                  type="text"
                  fullWidth
                  multiline
                  rows={2}
                />
                <Box sx={{ display: "flex" }}>
                  <StyledRating
                    name="highlight-selected-only"
                    defaultValue={3}
                    IconContainerComponent={IconContainer}
                    getLabelText={(value: number) => customIcons[value].label}
                    highlightSelectedOnly
                    sx={{ mt: 1 }}
                  />
                  <Box sx={{ mb: 2, flexGrow: 1 }} />
                  <Button
                    onClick={handleSubmit}
                    variant="outlined"
                    sx={{ textTransform: "none", mt: 1 }}
                  >
                    Enter
                  </Button>
                </Box>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ textTransform: "none", mt: 2 }}
                  fullWidth
                >
                  Submit Feedback
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
