import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en';
import elTranslation from './locales/el';

// Get saved language from localStorage or default to Greek
const savedLanguage = localStorage.getItem('language');
const defaultLanguage = savedLanguage || 'el';

i18n.use(initReactI18next).init({
  resources: {
    el: {
      translation: elTranslation
    },
    en: {
      translation: enTranslation
    }
  },
  lng: defaultLanguage,
  fallbackLng: 'el',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;