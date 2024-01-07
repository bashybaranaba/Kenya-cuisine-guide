import { Box, Divider, Grid, Typography } from "@mui/material";
import UpdateStat from "./UpdateStat";
import { Update } from "@mui/icons-material";

interface Props {
  text: string;
  icon: any;
  value: number;
  bgcolor: string;
  gridsizes?: number;
  spacing?: number;
  unit?: string;
  field?: string;
  title?: string;
}

export default function StatBox(props: Props) {
  //const router = useRouter();

  const { text, icon, value, bgcolor, gridsizes, spacing, unit, field, title } =
    props;

  return (
    <Grid item xs={gridsizes || 12} md={gridsizes || 4}>
      <Box
        sx={{
          m: spacing || 2,
          border: 1,
          borderRadius: 5,
          borderColor: "#2979ff",
        }}
      >
        <Box
          sx={{
            m: 1,
            border: 1,
            borderRadius: 4,
            borderColor: "#2979ff",
            backgroundColor: bgcolor,
            p: 2,
          }}
        >
          <Box sx={{ display: "flex" }}>
            {icon}
            <Typography
              variant="body1"
              sx={{ color: "#1a237", fontWeight: 700, ml: 1 }}
            >
              {text}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h3" sx={{ color: "#1a237", fontWeight: 700 }}>
              {value}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#1a237", fontWeight: 700, ml: 1 }}
            >
              {unit}
            </Typography>
          </Box>
          <UpdateStat text={text} field={field} title={title} />
        </Box>
      </Box>
    </Grid>
  );
}
