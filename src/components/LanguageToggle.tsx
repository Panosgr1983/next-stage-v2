import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'el' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-1.5 rounded-lg hover:bg-white/10 dark:hover:bg-slate-800/50 backdrop-blur-sm transition-all duration-200 text-lg leading-none"
      aria-label="Toggle language"
    >
      {i18n.language === 'en' ? '🇬🇷' : '🇬🇧'}
    </button>
  );
};

export default LanguageToggle;