import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown, Phone, Award, Clock, Wrench } from 'lucide-react';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    { icon: <Award className="w-5 h-5 text-[#6ab04c]" />, title: t('hero.feature1Title'), text: t('hero.feature1Text') },
    { icon: <Clock className="w-5 h-5 text-[#6ab04c]" />, title: t('hero.feature2Title'), text: t('hero.feature2Text') },
    { icon: <Wrench className="w-5 h-5 text-[#6ab04c]" />, title: t('hero.feature3Title'), text: t('hero.feature3Text') },
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-[90vh] md:min-h-screen flex items-center pt-14 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/images/gallery/DSC_2938.webp"
          alt=""
          className="w-full h-full object-cover"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/50"></div>
      </div>

      <div className="container mx-auto px-4 z-10 py-12 md:py-16">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#6ab04c]/20 border border-[#6ab04c]/30 backdrop-blur-sm mb-4">
              <Wrench className="w-3.5 h-3.5 text-[#6ab04c] mr-1.5" />
              <span className="text-[#6ab04c] text-xs font-medium uppercase tracking-wider">
                {t('nav.services')}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight">
              {t('hero.titlePrefix')}
              <span className="text-[#6ab04c]">{t('hero.titleHighlight')}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-6 max-w-xl">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-wrap gap-3">
              <a 
                href="tel:2102116016"
                className="inline-flex items-center px-6 py-3 md:px-8 md:py-3.5 bg-[#4a8a30] hover:bg-[#3d7126] text-white font-semibold rounded-md transition-all duration-300 shadow-lg shadow-[#6ab04c]/25 hover:shadow-[#6ab04c]/40 hover:scale-105 text-sm md:text-base"
              >
                <Phone className="w-4 h-4 mr-2" />
                {t('hero.contactButton')}
              </a>
              
              <a 
                href="#contact"
                className="inline-flex items-center px-6 py-3 md:px-8 md:py-3.5 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-medium rounded-md transition-all duration-300 hover:scale-105 text-sm md:text-base"
              >
                {t('hero.servicesButton')}
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 md:mt-12"
          >
            <div className="inline-flex flex-col md:flex-row items-center gap-4 md:gap-0 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 px-6 py-4 md:divide-x md:divide-white/10">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3 md:px-6">
                  <div className="p-2 bg-white/5 rounded-lg">
                    {f.icon}
                  </div>
                  <div className="text-left">
                    <div className="text-lg md:text-xl font-bold text-white leading-none">{f.title}</div>
                    <div className="text-xs text-slate-300 uppercase tracking-wider mt-0.5">{f.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <a 
        href="#services" 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white opacity-60 hover:opacity-100 transition-opacity duration-300"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={28} />
        </motion.div>
      </a>
    </section>
  );
};

export default Hero;