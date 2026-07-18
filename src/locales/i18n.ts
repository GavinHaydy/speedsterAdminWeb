import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import enTranslation from '@/locales/en.json';
import zhTranslation from '@/locales/zh.json';

const getLangFromPersist = (): 'zh' | 'en' => {
  try {
    // const raw = localStorage.getItem('lang');
    const raw = localStorage.getItem('lang');
    if (!raw) return 'zh';
    const parsed = JSON.parse(raw);
    return JSON.parse(parsed.lang);
  } catch {
    return 'zh';
  }
};

i18n
  .use(initReactI18next) // 初始化 react-i18next
  .init({
    resources: {
      en: { translation: enTranslation },
      zh: { translation: zhTranslation },
    }, // 翻译资源
    lng: getLangFromPersist(), // 默认语言
    fallbackLng: 'zh', // 备用语言
    interpolation: {
      escapeValue: false, // 不转义 HTML
    },
  })
  .then((r) => r);

export default i18n;
