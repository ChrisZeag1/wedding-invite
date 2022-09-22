import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


// Importing translation files

import translationES from './locale/translationES.json';
import translationEN from './locale/translationEN.json';


//Creating object with the variables of imported translation files
const resources = {
  ES: {
    translation: translationES,
  },
  EN: {
    translation: translationEN,
  },
};

//i18N Initialization

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng:'ES', //default language
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });