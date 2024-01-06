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
import CardMedia from "@mui/material/CardMedia";

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

export function RecommendationFeedback({
  foodDetails,
  recommendationId,
  userId,
}: any) {
  const [open, setOpen] = React.useState(false);
  const [feedback, setFeedback] = React.useState("");
  const [rating, setRating] = React.useState(3);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async () => {
    const feedbackData = {
      recommendation_id: recommendationId,
      text_review: feedback,
      rating: rating,
    };
    console.log(feedbackData);

    try {
      const response = await fetch("/api/recommendations/feedback", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      const data = await response.json();
      if (response.status === 200) {
        console.log(data.message);
        setOpen(false);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <DialogContentText>
                <CardMedia
                  component="img"
                  height="450"
                  image={"/brownbread.webp"}
                  sx={{ borderRadius: 6 }}
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
                  {" " + foodDetails.ENERGY + " kcal"}
                  <br />
                  <b>Carbohydrates:</b>
                  {" " + foodDetails.CHOAVLDF + " g"}
                  <br />
                  <b>Protein:</b>
                  {" " + foodDetails.PROTCNT + " g"}
                  <br />
                  <b>Fat:</b>
                  {" " + foodDetails.FATCE + " g"}

                  <br />
                  <b>Fiber:</b>
                  {" " + foodDetails.FIBTG + " g"}
                  <br />
                  <b>P:</b>
                  {" " + foodDetails.P + " mg"}
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
                  onChange={(event) => setFeedback(event.target.value)}
                />
                <Box sx={{ display: "flex" }}>
                  <StyledRating
                    name="highlight-selected-only"
                    defaultValue={rating}
                    IconContainerComponent={IconContainer}
                    getLabelText={(value: number) => customIcons[value].label}
                    highlightSelectedOnly
                    sx={{ mt: 1 }}
                    onChange={(event) =>
                      setRating(
                        Number((event.target as HTMLInputElement).value)
                      )
                    }
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
