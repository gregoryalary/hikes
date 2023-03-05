// React
import { useMemo } from "react";
import PropTypes from "prop-types";

// Material UI
import Box from "@mui/system/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

// Charts
import { ResponsiveLine } from "@nivo/line";

// Lodash
import { throttle } from "lodash";

// Components
import Tooltip from "./Tooltip";

// Consts
const MAX_POINT_PER_CHART = 500;
const TOOLTIP_REFRESH_RATE_MS = 1;

function ElevationChart({ elevations, onLatLngHover = () => undefined }) {
  const theme = useTheme();

  const matchesMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const matchesMobileLandscape = useMediaQuery(
    "(max-device-height : 500px) and (orientation : landscape)"
  );

  const chartData = useMemo(() => {
    if (elevations && elevations.length) {
      const dataBuildFromASubetOfElevations = [];
      const delta = Math.floor(
        elevations.length / Math.min(MAX_POINT_PER_CHART, elevations.length)
      );

      for (let i = 0; i < elevations.length; i += delta) {
        dataBuildFromASubetOfElevations.push({
          x: elevations[i].distance,
          id: elevations[i].distance,
          y: elevations[i].elevation,
          ...elevations[i],
        });
      }
      return dataBuildFromASubetOfElevations;
    }

    return [];
  }, [elevations]);

  return (
    <Box
      sx={{
        // eslint-disable-next-line no-nested-ternary
        height: `${matchesMobileLandscape ? 100 : matchesMobile ? 150 : 200}px`,
      }}
    >
      <ResponsiveLine
        data={[
          {
            id: "elevation",
            data: chartData,
          },
        ]}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: theme.palette.text.primary,
              },
              line: {
                stroke: theme.palette.grey[400],
                strokeWidth: 0.25,
              },
            },
          },
          grid: {
            line: {
              stroke: theme.palette.grey[400],
              strokeWidth: 0.25,
            },
          },
        }}
        colors={[theme.palette.primary.main]}
        curve="step"
        margin={{ top: 10, right: 0, bottom: 10, left: 35 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        enableGridX={false}
        crosshairType="left"
        pointSize={0}
        pointLabelYOffset={-12}
        useMesh
        onMouseLeave={() => onLatLngHover(null)}
        onMouseMove={throttle(
          (e) => onLatLngHover(e.data.coordinates),
          TOOLTIP_REFRESH_RATE_MS
        )}
        // eslint-disable-next-line react/no-unstable-nested-components
        tooltip={(data) => (
          <Tooltip
            distance={data.point.data.distance}
            elevation={data.point.data.elevation}
          />
        )}
        enableArea
        areaOpacity={0.1}
      />
    </Box>
  );
}

ElevationChart.propTypes = {
  elevations: PropTypes.arrayOf(
    PropTypes.shape({
      distance: PropTypes.number.isRequired,
      elevation: PropTypes.number.isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    })
  ).isRequired,
  onLatLngHover: PropTypes.func,
};

ElevationChart.defaultProps = {
  onLatLngHover: () => undefined,
};

export default ElevationChart;
