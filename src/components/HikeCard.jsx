// React
import PropTypes from "prop-types";

// Material UI
import {
  Box,
  Button,
  CardActions,
  Divider,
  Stack,
  CardMedia,
  CardContent,
  Typography,
  Card,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useTheme from "@mui/material/styles/useTheme";

// i18n
import { useTranslation } from "react-i18next";

// Router
import { Link } from "react-router-dom";

// Components
import HikeMap from "./Map";
import RandomWave from "./RandomWave";

function HikeCard({ hike }) {
  const theme = useTheme();

  const { i18n, t } = useTranslation();

  return (
    <Card sx={{ width: "100%" }} raised>
      <CardMedia>
        <Box sx={{ position: "relative" }} component="div">
          <HikeMap hike={hike} fixed />
          {theme.palette.mode === "light" && <RandomWave fillColor="#fff" />}
        </Box>
      </CardMedia>
      <Box component={CardContent} sx={{ p: 2 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          mb={0}
          sx={{
            color: "text.primary",
            fontSize: { xs: "1.2rem", md: "1.5rem" },
          }}
        >
          {hike.title[i18n.resolvedLanguage]}
        </Typography>
      </Box>
      <Divider />
      <CardActions>
        <Stack direction="row" justifyContent="end" sx={{ width: "100%" }}>
          <Link
            to={{ pathname: `/${hike.id}` }}
            style={{ textDecoration: "none" }}
          >
            <Button endIcon={<ArrowForwardIcon />} color="secondary">
              {t("more_informations")}
            </Button>
          </Link>
        </Stack>
      </CardActions>
    </Card>
  );
}

HikeCard.propTypes = {
  hike: PropTypes.shape({
    id: PropTypes.number.isRequired,
    gpx: PropTypes.string.isRequired,
    title: PropTypes.shape({
      fr: PropTypes.string.isRequired,
      en: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default HikeCard;
