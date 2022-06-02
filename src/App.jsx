// React
import { useEffect, useState } from "react";

// Material UI
import { Container } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material";

// Router
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";

// Helmet
import { Helmet } from "react-helmet";

// i18n
import { useTranslation } from "react-i18next";

// Components
import NavBar from "./components/NavBar";

// Pages
import Index from "./pages/Index";
import Hike from "./pages/Hike";

// Themes
import * as baseTheme from "./theme/base.json";
import * as darkTheme from "./theme/dark.json";
import * as lightTheme from "./theme/light.json";

// Theme building
const themeLight = createTheme(lightTheme, baseTheme);
const themeDark = createTheme(darkTheme, baseTheme);

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => window.scrollTo(0, 0), [pathname]);

  return null;
}

function App() {
  const { t } = useTranslation();

  const [theme, setTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? themeDark
      : themeLight
  );

  useEffect(() => {
    document.body.style.background = `url(./background-${theme.palette.mode}.png)`;
  }, [theme]);

  return (
    <HashRouter>
      <ScrollToTop />
      <Helmet>
        <title>
          {t("name")} | {t("title")}
        </title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <NavBar
          onToggleTheme={() =>
            setTheme(theme === themeLight ? themeDark : themeLight)
          }
        />
        <Container sx={{ pb: 4, pt: { xs: 10, md: 12 } }}>
          <Routes>
            <Route path="" element={<Index />} />
            <Route path=":hike" element={<Hike />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
