// React
import { useState, useEffect } from "react";

// Routers
import { Link, useParams } from "react-router-dom";

// Material UI
import { Paper, Chip, Stack, Typography, Button, Divider } from "@mui/material";
import {
  DirectionsWalk as DirectionsWalkIcon,
  ArrowUpward as ArrowUpwardIcon,
  Download as DownloadIcon,
  Timelapse as TimelapseIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material/";

// Helmet
import { Helmet } from "react-helmet";

// i18n
import { useTranslation } from "react-i18next";

// Components
import HikeMap from "../components/Map";

// Services
import { getHike } from "../services/HikeService";
import {
  extractDataFromGeoJson,
  withGeoJson,
} from "../services/GeoJsonService";
import { downloadFile } from "../services/DownloadService";

function Hike() {
  const { i18n, t } = useTranslation();

  const hike = withGeoJson(getHike(useParams().hike));

  const [totalDistance, setTotalDistance] = useState(0);

  const [elevationGain, setElevationGain] = useState(0);

  const downloadGpx = () =>
    downloadFile(
      hike.gpx,
      hike.title[i18n.resolvedLanguage],
      "gpx",
      i18n.resolvedLanguage
    );

  useEffect(() => {
    const { distance, elevation } = extractDataFromGeoJson(hike.geojson);
    setElevationGain(elevation);
    setTotalDistance(distance);
  }, [hike]);

  if (hike) {
    return (
      <>
        <Helmet>
          <title>
            {t("title")} | {hike.title[i18n.resolvedLanguage]}
          </title>
        </Helmet>
        <Stack direction="column" spacing={2} alignItems="start">
          <Paper elevation={1}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button startIcon={<ArrowBackIcon />} color="secondary">
                {t("all_hikes")}
              </Button>
            </Link>
          </Paper>
          <Paper elevation={4} sx={{ width: "100%" }}>
            <Stack direction="column" spacing={2} py={2}>
              <Stack direction="column" spacing={1} px={2}>
                <Typography
                  component="h1"
                  sx={{ fontSize: { xs: "1.2rem", md: "1.5rem", lg: "2rem" } }}
                >
                  {hike.title[i18n.resolvedLanguage]}
                </Typography>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={{ xs: 1, md: 2 }}
                >
                  <Chip
                    icon={<DirectionsWalkIcon />}
                    label={`${(totalDistance / 1000).toLocaleString(
                      i18n.resolvedLanguage,
                      { style: "unit", unit: "kilometer", unitDisplay: "short" }
                    )}`}
                    variant="outlined"
                    color="secondary"
                    size="small"
                  />
                  <Chip
                    icon={<ArrowUpwardIcon />}
                    label={elevationGain.toLocaleString(i18n.resolvedLanguage, {
                      style: "unit",
                      unit: "meter",
                      unitDisplay: "short",
                    })}
                    variant="outlined"
                    color="secondary"
                    size="small"
                  />
                  <Chip
                    icon={<TimelapseIcon />}
                    label={t("day", { count: hike.days })}
                    variant="outlined"
                    color="secondary"
                    size="small"
                  />
                </Stack>
              </Stack>
              <HikeMap hike={hike} displayElevation allowFullScreen />
              <Divider />
              <Stack direction="row" justifyContent="end" px={2}>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={downloadGpx}
                  color="secondary"
                  size="small"
                >
                  {t("download_gpx")}
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </>
    );
  }

  return null;
}

export default Hike;
