// React
import PropTypes from "prop-types";

// Material UI
import {
  ArrowUpward as ArrowUpwardIcon,
  DirectionsWalk as DirectionsWalkIcon,
} from "@mui/icons-material";
import { Chip, Paper, Stack } from "@mui/material";

// i18n
import { useTranslation } from "react-i18next";

function Tooltip({ distance, elevation }) {
  const { i18n } = useTranslation();

  return (
    <Paper sx={{ p: 1 }} elevation={8}>
      <Stack direction="row" spacing={1}>
        <Chip
          icon={<DirectionsWalkIcon />}
          label={(distance / 1000).toLocaleString(i18n.resolvedLanguage, {
            style: "unit",
            unit: "kilometer",
            unitDisplay: "short",
            maximumSignificantDigits: 3,
          })}
          color="secondary"
          variant="outlined"
        />
        <Chip
          icon={<ArrowUpwardIcon />}
          label={elevation.toLocaleString(i18n.resolvedLanguage, {
            style: "unit",
            unit: "meter",
            unitDisplay: "short",
            maximumSignificantDigits: 3,
          })}
          color="secondary"
          variant="outlined"
        />
      </Stack>
    </Paper>
  );
}

Tooltip.propTypes = {
  distance: PropTypes.number.isRequired,
  elevation: PropTypes.number.isRequired,
};

export default Tooltip;
