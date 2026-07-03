import React from 'react';
import { useTranslation } from 'react-i18next';
import { Facebook, Mail, MapPin, Phone } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const serviceKeys = [
    'laptopRepair',
    'desktopRepair',
    'imacRepair',
    'macbookRepair',
    'macMiniRepair',
    'gamingPc',
    'proAudio',
    'tvRepair',
    'osInstallation',
    'supportContract',
  ] as const;

  return (
    <footer className="bg-slate-900 text-slate-200 pt-10 pb-6 text-xs">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div>
            <Logo white />
            <p className="mt-2 text-slate-400 text-xs">
              {t('footer.description')}
            </p>
            <div className="flex space-x-3 mt-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#6ab04c] transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={14} />
              </a>
              <a 
                href="mailto:nextstagegalatsi@gmail.com" 
                className="text-slate-400 hover:text-[#6ab04c] transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={14} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold mb-3 uppercase tracking-wider text-slate-400">{t('footer.quickLinks')}</h3>
            <ul className="space-y-1">
              <li>
                <a href="#home" className="text-slate-300 hover:text-[#6ab04c] transition-colors duration-200">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-300 hover:text-[#6ab04c] transition-colors duration-200">
                  {t('nav.services')}
                </a>
              </li>
              <li>
                <a href="#about" className="text-slate-300 hover:text-[#6ab04c] transition-colors duration-200">
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-slate-300 hover:text-[#6ab04c] transition-colors duration-200">
                  {t('nav.gallery')}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-300 hover:text-[#6ab04c] transition-colors duration-200">
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold mb-3 uppercase tracking-wider text-slate-400">{t('footer.services')}</h3>
            <div className="grid grid-cols-2 gap-x-4">
              <ul className="space-y-1">
                {serviceKeys.slice(0, 5).map((key) => (
                  <li key={key}>
                    <a href="#services" className="text-slate-300 hover:text-[#6ab04c] transition-colors duration-200">
                      {t(`services.${key}.title`)}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="space-y-1">
                {serviceKeys.slice(5).map((key) => (
                  <li key={key}>
                    <a href="#services" className="text-slate-300 hover:text-[#6ab04c] transition-colors duration-200">
                      {t(`services.${key}.title`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold mb-3 uppercase tracking-wider text-slate-400">{t('footer.contact')}</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <MapPin className="mt-0.5 flex-shrink-0 text-[#6ab04c]" size={12} />
                <span className="text-slate-300">
                  Προφήτη Ηλία 5, Γαλάτσι 111 47
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="flex-shrink-0 text-[#6ab04c]" size={12} />
                <span className="text-slate-300">
                  210 21 16 016
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="flex-shrink-0 text-[#6ab04c]" size={12} />
                <a 
                  href="mailto:nextstagegalatsi@gmail.com" 
                  className="text-slate-300 hover:text-[#6ab04c] transition-colors duration-200"
                >
                  nextstagegalatsi@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-4 pb-2 text-center text-slate-500 text-[10px] border-t border-slate-800">
          <p>© {currentYear} NextStage Technology Solutions. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
