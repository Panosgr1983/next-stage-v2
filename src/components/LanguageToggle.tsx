import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

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
      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
      aria-label="Toggle language"
    >
      <Languages className="w-5 h-5" />
      <span className="text-sm font-medium">
        {i18n.language === 'en' ? 'Ελληνικά' : 'English'}
      </span>
    </button>
  );
};

export default LanguageToggle;