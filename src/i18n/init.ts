import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zh from './resource/zh'
import en from './resource/en'
import ja from './resource/ja'
import ko from './resource/ko'

export const Languages = [
  { name: '中文', value: 'zh' },
  { name: 'English', value: 'en' },
  { name: '日本語', value: 'ja' },
  { name: '한국어', value: 'ko' },
]

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
  ja: {
    translation: ja,
  },
  ko: {
    translation: ko,
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

const t = i18n.t

export {
    i18n,
    t,
}