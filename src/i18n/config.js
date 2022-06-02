import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translations
import * as en from "./locales/en.json";
import * as fr from "./locales/fr.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: {
      order: ["querystring", "navigator"],
      lookupQueryString: "lng",
    },
    resources: {
      en: {
        translations: en,
      },
      fr: {
        translations: fr,
      },
    },
    ns: ["translations"],
    defaultNS: "translations",
  });

i18n.resolvedLanguages = ["en", "fr"];

export default i18n;
