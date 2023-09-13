// Material UI
import { Stack } from "@mui/material";

// Helmet
import { Helmet } from "react-helmet";

// i18n
import { useTranslation } from "react-i18next";

// Components
import HikeCard from "../components/HikeCard";

// Services
import { getHikes } from "../services/HikeService";
import { withGeoJson } from "../services/GeoJsonService";

function Listing() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>
          {t("title")} | {t("all_hikes")}
        </title>
      </Helmet>
      <Stack direction="column" spacing={{ xs: 4, md: 6 }}>
        {withGeoJson(getHikes())
          .filter((hike) => !hike.hidden)
          .map((hike) => (
            <HikeCard hike={hike} key={hike.id} />
          ))}
      </Stack>
    </>
  );
}

export default Listing;
