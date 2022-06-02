import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

const getCoordinatesBounds = (coordinates, step) => {
  if (!coordinates || coordinates.length < 1) {
    return null;
  }

  const bounds = new mapboxgl.LngLatBounds(
    coordinates[0].coordinates,
    coordinates[0].coordinates
  );

  for (let index = 0; index < coordinates.length; index += step) {
    bounds.extend(coordinates[index].coordinates);
  }

  return bounds;
};

const coordinatesInBounds = (coordinates, bounds) => {
  const [firstIncludedIndex, lastIncludedIndex] = coordinates.reduce(
    (acc, e, index) => [
      // eslint-disable-next-line no-nested-ternary
      acc[0] ? acc[0] : bounds.contains(e.coordinates) ? index : 0,
      bounds.contains(e.coordinates) ? index : acc[1],
    ],
    [0, coordinates.length]
  );

  return coordinates.slice(firstIncludedIndex, lastIncludedIndex + 1);
};

export { getCoordinatesBounds, coordinatesInBounds };
