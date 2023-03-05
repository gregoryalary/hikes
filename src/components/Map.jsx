// React
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Material UI
import Box from "@mui/material/Box";

// Material UI
import { useTheme } from "@mui/material/styles";
import { Button, Stack } from "@mui/material";
import { OpenInFull as OpenInFullIcon } from "@mui/icons-material";

// Mapbox
// eslint-disable-next-line import/no-unresolved, import/order, import/no-webpack-loader-syntax
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Fullscreen
import { FullScreen, useFullScreenHandle } from "react-full-screen";

// Components
import { useTranslation } from "react-i18next";
import ElevationChart from "./elevation/Chart";

// Services
import {
  coordinatesInBounds,
  getCoordinatesBounds,
} from "../services/MapService";
import { extractDataFromGeoJson } from "../services/GeoJsonService";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ3JlZ29yeWFsYXJ5IiwiYSI6ImNsM3ZjZTFhdzBxMzEzY25waW5hbXRiMnAifQ.o3RJtH_3lZXEFV6dmkamYA";

const ROUTE_LAYER = (color) => ({
  id: "route",
  type: "line",
  source: "route",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": color,
    "line-width": 2,
  },
});

const COORDINATES_CIRCLE_LAYER = (color) => ({
  id: "coordinates",
  type: "circle",
  source: "coordinates",
  paint: {
    "circle-radius": ["interpolate", ["linear"], ["zoom"], 1, 1, 10, 7],
    "circle-color": color,
  },
});

const COORDINATES_CIRCLE_BORDER_LAYER = () => ({
  id: "coordinates-border",
  type: "circle",
  source: "coordinates",
  paint: {
    "circle-radius": ["interpolate", ["linear"], ["zoom"], 1, 1, 10, 10],
    "circle-color": "#fff",
  },
});

function HikeMap({ hike, displayElevation, fixed, allowFullScreen }) {
  const theme = useTheme();

  const fullScreenHandle = useFullScreenHandle();

  const { t } = useTranslation();

  const map = useRef(null);

  const mapContainer = useRef(null);

  const [
    coordinatesWithElevationAndDistance,
    setCoordinatesWithElevationAndDistance,
  ] = useState([]);

  const [currentBounds, setCurrentBounds] = useState(null);

  const [
    coordinatesWithElevationAndDistanceInCurrentBounds,
    setCoordinatesWithElevationAndDistanceInCurrentBounds,
  ] = useState([]);

  useEffect(() => {
    setCoordinatesWithElevationAndDistanceInCurrentBounds(
      currentBounds
        ? coordinatesInBounds(
            coordinatesWithElevationAndDistance,
            currentBounds
          )
        : []
    );
  }, [coordinatesWithElevationAndDistance, currentBounds]);

  const removeMapIfStyleHasChanged = () => {
    if (map.current && map.current.isStyleLoaded()) {
      const currentStyleIsLight =
        map.current.getStyle().name === "Mapbox Outdoors";

      if (currentStyleIsLight !== (theme.palette.mode === "light")) {
        map.current.remove();
        map.current = null;
      }
    }
  };

  const buildMapIfMapDoesNotExist = (startBounds) => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: {
          dark: "mapbox://styles/mapbox/dark-v10",
          light: "mapbox://styles/mapbox/outdoors-v11",
        }[theme.palette.mode],
        center: startBounds.getCenter(),
        zoom: 1,
        interactive: !fixed,
        attributionControl: false,
      });

      map.current.on("moveend", (e) => setCurrentBounds(e.target.getBounds()));
    }
  };

  const buildMapSourcesAndLayersIfItDoesNotExist = () => {
    if (!map.current.getSource("route")) {
      map.current.addSource("route", { type: "geojson", data: null });
      map.current.addSource("coordinates", { type: "geojson", data: null });
      map.current.addLayer(ROUTE_LAYER(theme.palette.primary.main));
      map.current.addLayer(COORDINATES_CIRCLE_BORDER_LAYER());
      map.current.addLayer(
        COORDINATES_CIRCLE_LAYER(theme.palette.primary.main)
      );
    }
  };

  useEffect(() => {
    const data = extractDataFromGeoJson(hike.geojson);
    const extractedCoordinatesWithElevationAndDistance =
      data.coordinatesWithElevationAndDistance;

    const pathBounds = getCoordinatesBounds(
      extractedCoordinatesWithElevationAndDistance,
      10
    );

    removeMapIfStyleHasChanged();

    buildMapIfMapDoesNotExist(pathBounds);

    map.current.on("load", () => {
      buildMapSourcesAndLayersIfItDoesNotExist();
      map.current.getSource("route").setData(hike.geojson);
      setCoordinatesWithElevationAndDistance(
        extractedCoordinatesWithElevationAndDistance
      );
      map.current.fitBounds(pathBounds, {
        linear: true,
        padding: 25,
        duration: 0,
      });
    });
  }, [hike, fixed, theme]);

  const updateCoordinatesSource = (coordinates) => {
    if (map.current && map.current.getSource("coordinates")) {
      map.current.getSource("coordinates").setData(
        coordinates
          ? {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates,
              },
            }
          : null
      );
    }
  };

  const refreshMapSize = () => {
    if (map.current) {
      map.current.resize();
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      {allowFullScreen && (
        <Button
          color="secondary"
          onClick={fullScreenHandle.enter}
          sx={{ position: "absolute" }}
          style={{ top: "10px", right: "10px", zIndex: "999" }}
          variant="contained"
          size="small"
        >
          <Stack direction="row" spacing={{ xs: 0, md: 1 }} alignItems="center">
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <span>{t("fullscreen")}</span>
            </Box>
            <OpenInFullIcon sx={{ fontSize: { xs: "17px", md: "13px" } }} />
          </Stack>
        </Button>
      )}
      <FullScreen handle={fullScreenHandle} onChange={refreshMapSize}>
        <Stack
          direction="column"
          sx={{ height: "100%", bgcolor: "background.default" }}
        >
          <Box
            sx={{
              height: fullScreenHandle.active
                ? "auto"
                : { xs: "300px", md: "500px" },
            }}
            style={{ flexGrow: "1" }}
            component="div"
          >
            <div
              ref={mapContainer}
              className="map-container"
              style={{ height: "100%" }}
            />
          </Box>
          {displayElevation && (
            <Box px={{ xs: 1, md: 2 }}>
              <ElevationChart
                elevations={coordinatesWithElevationAndDistanceInCurrentBounds}
                onLatLngHover={updateCoordinatesSource}
              />
            </Box>
          )}
        </Stack>
      </FullScreen>
    </Box>
  );
}

HikeMap.propTypes = {
  hike: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    geojson: PropTypes.object.isRequired,
  }).isRequired,
  displayElevation: PropTypes.bool,
  fixed: PropTypes.bool,
  allowFullScreen: PropTypes.bool,
};

HikeMap.defaultProps = {
  displayElevation: false,
  fixed: false,
  allowFullScreen: false,
};

export default HikeMap;
