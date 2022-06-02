// React
import { useState } from "react";
import PropTypes from "prop-types";

// Router
import { Link } from "react-router-dom";

// Material UI
import {
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Select,
  Stack,
  Container,
  Typography,
  Toolbar,
  AppBar,
  Box,
} from "@mui/material";
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Menu as MenuIcon,
  Translate as TranslateIcon,
  Hiking as HikingIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// i18n
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";

function NavBar({ onToggleTheme }) {
  const theme = useTheme();

  const { t, i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);

  const [drawerIsOpened, setDrawerIsOpened] = useState(false);

  const onLocaleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeLocaleMenu = () => {
    setAnchorEl(null);
  };

  const handleLanguageClick = (code) => {
    i18n.changeLanguage(code);
    closeLocaleMenu();
  };

  return (
    <header>
      <AppBar
        position="fixed"
        sx={{ background: theme.palette.background.default }}
      >
        <Container>
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" alignItems="center">
              <IconButton
                sx={{ display: { xs: "flex", md: "none" } }}
                onClick={() => setDrawerIsOpened(!drawerIsOpened)}
                color="secondary"
              >
                <MenuIcon style={{ paddingLeft: 0 }} />
              </IconButton>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Stack direction="row" alignItems="center">
                  <HikingIcon
                    color="primary"
                    sx={{ display: { xs: "none", md: "flex" } }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      textDecoration: "none",
                      color: "primary",
                      marginX: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      noWrap
                      color="primary"
                      sx={{
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".1rem",
                        textDecoration: "none",
                        lineHeight: "inherits",
                      }}
                    >
                      {t("title")}
                    </Typography>
                    <Typography
                      noWrap
                      color="primary"
                      sx={{
                        fontFamily: "monospace",
                        textDecoration: "none",
                        fontSize: ".8rem",
                      }}
                    >
                      {t("name")}
                    </Typography>
                  </Box>
                </Stack>
              </Link>
            </Stack>
            <div>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  onClick={onToggleTheme}
                  color="secondary"
                >
                  {theme.palette.mode === "light" ? (
                    <DarkModeIcon />
                  ) : (
                    <LightModeIcon />
                  )}
                </IconButton>
                <IconButton
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={onLocaleMenuOpen}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <ReactCountryFlag
                      countryCode={
                        { fr: "fr", en: "gb" }[i18n.resolvedLanguage]
                      }
                      svg
                    />
                  </Stack>
                </IconButton>
              </Box>

              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={closeLocaleMenu}
              >
                <MenuItem onClick={() => handleLanguageClick("en")}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <ReactCountryFlag countryCode="GB" svg />
                    <span>English</span>
                  </Stack>
                </MenuItem>
                <MenuItem onClick={() => handleLanguageClick("fr")}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <ReactCountryFlag countryCode="FR" svg />
                    <span>Français</span>
                  </Stack>
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
          <Drawer
            open={drawerIsOpened}
            onClose={() => setDrawerIsOpened(false)}
          >
            <Box sx={{ width: 250 }} role="presentation">
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <TranslateIcon color="secondary" />
                    </ListItemIcon>
                    <FormControl fullWidth size="small">
                      <InputLabel>{t("language")}</InputLabel>
                      <Select
                        label={t("language")}
                        value={i18n.resolvedLanguage}
                        onChange={(e) => i18n.changeLanguage(e.target.value)}
                      >
                        <MenuItem value="en">
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            <ReactCountryFlag countryCode="GB" svg />
                            <span>English</span>
                          </Stack>
                        </MenuItem>
                        <MenuItem value="fr">
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            <ReactCountryFlag countryCode="FR" svg />
                            <span>Français</span>
                          </Stack>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </ListItemButton>
                </ListItem>
                <ListItem onClick={onToggleTheme} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {theme.palette.mode === "dark" ? (
                        <LightModeIcon color="secondary" />
                      ) : (
                        <DarkModeIcon color="secondary" />
                      )}
                    </ListItemIcon>
                    {theme.palette.mode === "dark"
                      ? t("mode_light")
                      : t("mode_dark")}
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Container>
      </AppBar>
    </header>
  );
}

NavBar.propTypes = {
  onToggleTheme: PropTypes.func,
};

NavBar.defaultProps = {
  onToggleTheme: () => undefined,
};

export default NavBar;
