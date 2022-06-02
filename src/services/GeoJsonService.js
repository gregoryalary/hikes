// Mapbox utils
import * as toGeoJson from "@mapbox/togeojson";

// Turf
import getDistance from "@turf/distance";

const addGeoJsonToHike = (hike) => {
  return {
    ...hike,
    geojson: toGeoJson.gpx(
      new DOMParser().parseFromString(hike.gpx, "text/xml")
    ),
  };
};

const withGeoJson = (hikeOrHikes) => {
  if (!hikeOrHikes) {
    return hikeOrHikes;
  }

  if (Array.isArray(hikeOrHikes)) {
    return hikeOrHikes.map(addGeoJsonToHike);
  }

  return addGeoJsonToHike(hikeOrHikes);
};

const extractDataFromGeoJson = (geoJson) => {
  const { coordinates } = geoJson.features[0].geometry;

  let distance = 0;
  let elevation = 0;
  const coordinatesWithElevationAndDistance = [];

  for (let index = 0; index < coordinates.length; index += 1) {
    if (index > 0) {
      distance += getDistance(coordinates[index], coordinates[index - 1], {
        units: "meters",
      });
      elevation += Math.max(
        coordinates[index][2] - coordinates[index - 1][2],
        0
      );
    }
    coordinatesWithElevationAndDistance.push({
      distance,
      elevation: coordinates[index][2],
      coordinates: coordinates[index],
    });
  }

  return { distance, elevation, coordinatesWithElevationAndDistance };
};

// eslint-disable-next-line import/prefer-default-export
export { withGeoJson, extractDataFromGeoJson };
