import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown, Phone, Wrench, Award, Clock } from 'lucide-react';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    { icon: <Award className="w-8 h-8 text-[#6ab04c]" /> },
    { icon: <Clock className="w-8 h-8 text-[#6ab04c]" /> },
    { icon: <Wrench className="w-8 h-8 text-[#6ab04c]" /> },
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
        style={{ 
          backgroundImage: 'url(/images/gallery/DSC_2938.jpg)',
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
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#6ab04c]/20 border border-[#6ab04c]/30 backdrop-blur-sm mb-6">
              <Wrench className="w-4 h-4 text-[#6ab04c] mr-2" />
              <span className="text-[#6ab04c] text-sm font-medium">
                {t('nav.home')} — {t('nav.services')}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 max-w-2xl">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href="tel:2102116016"
                className="inline-flex items-center px-8 py-4 bg-[#6ab04c] hover:bg-[#5a9f3d] text-white font-semibold rounded-md transition-all duration-300 shadow-lg shadow-[#6ab04c]/25 hover:shadow-[#6ab04c]/40 hover:scale-105"
              >
                <Phone className="w-5 h-5 mr-2" />
                {t('hero.contactButton')}
              </a>
              
              <a 
                href="#contact"
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-medium rounded-md transition-all duration-300 hover:scale-105"
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
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/10 text-center">
                <div className="flex justify-center mb-3">
                  {features[i].icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {t(`hero.feature${i + 1}Title`)}
                </h3>
                <p className="text-slate-300 text-sm uppercase tracking-wider">
                  {t(`hero.feature${i + 1}Text`)}
                </p>
              </div>
            ))}
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