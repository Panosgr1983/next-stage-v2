import 'react-i18next';
import enTranslation from '../i18n/locales/en';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof enTranslation;
    };
  }
}