import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown, Phone, Award, Clock, Wrench, Star } from 'lucide-react';

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
          width="1920"
          height="1080"
          className="w-full h-full object-cover"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/50"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 py-12 md:py-16">
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
                    <div className="text-lg md:text-xl font-bold text-white leading-none whitespace-nowrap">{f.title}</div>
                    <div className="text-xs text-slate-300 uppercase tracking-wider mt-0.5">{f.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-4"
          >
            <a
              href="https://share.google/JXdLH9JZeoYm3IoZK"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/20 transition-all duration-300 group"
            >
              <svg viewBox="0 0 48 48" className="w-5 h-5 shrink-0">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              <span className="flex flex-col max-[382px]:items-start sm:flex-row sm:items-center gap-0 sm:gap-1.5">
                <span className="text-yellow-400 text-sm font-bold whitespace-nowrap">★★★★★ 5.0</span>
                <span className="text-slate-300 text-xs whitespace-nowrap">
                  <span className="max-[382px]:hidden">— </span>112+ αξιολογήσεις Google
                </span>
              </span>
              <svg className="w-3.5 h-3.5 shrink-0 text-slate-400 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
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