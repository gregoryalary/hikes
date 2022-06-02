import hikes from "../data/hikes.json";

const getHikes = () => hikes;

const getHike = (id) => {
  let numberId = id;

  if (typeof id !== "number") {
    numberId = Number.parseInt(id, 10);
  }

  const hike = hikes.find((h) => h.id === numberId) || null;

  return hike || null;
};

export { getHike, getHikes };
