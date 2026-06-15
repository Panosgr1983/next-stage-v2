import React from 'react';
import { useTranslation } from 'react-i18next';
import { Facebook, Mail, MapPin, Phone } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Logo />
            <p className="mt-4 text-slate-300">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-[#6ab04c] transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="mailto:nextstagegalatsi@gmail.com" 
                className="text-slate-300 hover:text-[#6ab04c] transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
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
            <h3 className="text-lg font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-slate-300 hover:text-[#6ab04c] transition-colors duration-200">
                  {t('services.laptopRepair.title')}
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-300 hover:text-[#6ab04c] transition-colors duration-200">
                  {t('services.desktopRepair.title')}
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-300 hover:text-[#6ab04c] transition-colors duration-200">
                  {t('services.imacRepair.title')}
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-300 hover:text-[#6ab04c] transition-colors duration-200">
                  {t('services.macbookRepair.title')}
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-300 hover:text-[#6ab04c] transition-colors duration-200">
                  {t('services.dataRecovery.title')}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="mt-1 flex-shrink-0 text-[#6ab04c]" size={18} />
                <span className="text-slate-300">
                  Προφήτη Ηλία 5, Γαλάτσι 111 47
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="flex-shrink-0 text-[#6ab04c]" size={18} />
                <span className="text-slate-300">
                  210 21 16 016
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="flex-shrink-0 text-[#6ab04c]" size={18} />
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
        
        <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>© {currentYear} NextStage Technology Solutions. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;