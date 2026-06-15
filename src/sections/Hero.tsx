import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown, Clock, Shield, Cpu } from 'lucide-react';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg)',
          backgroundPosition: '50% 50%'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/50"></div>
      </div>

      <div className="container mx-auto px-4 z-10 py-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('hero.title')}
            </h1>
            
            <p className="text-xl text-slate-300 mb-8">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact"
                className="px-8 py-3 bg-[#6ab04c] hover:bg-[#5a9f3d] text-white font-medium rounded-md transition-colors duration-300"
              >
                {t('hero.contactButton')}
              </a>
              
              <a 
                href="#services"
                className="px-8 py-3 bg-transparent border border-white/30 hover:border-white/70 text-white font-medium rounded-md transition-colors duration-300"
              >
                {t('hero.servicesButton')}
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <Clock className="w-10 h-10 text-[#6ab04c] mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{t('hero.feature1Title')}</h3>
              <p className="text-slate-300">{t('hero.feature1Text')}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <Cpu className="w-10 h-10 text-[#6ab04c] mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{t('hero.feature2Title')}</h3>
              <p className="text-slate-300">{t('hero.feature2Text')}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <Shield className="w-10 h-10 text-[#6ab04c] mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{t('hero.feature3Title')}</h3>
              <p className="text-slate-300">{t('hero.feature3Text')}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <a 
        href="#services" 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-80 hover:opacity-100 transition-opacity duration-300"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </a>
    </section>
  );
};

export default Hero;