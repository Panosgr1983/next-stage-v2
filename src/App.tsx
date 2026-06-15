import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Hero from './sections/Hero';
import WhyChooseUs from './sections/WhyChooseUs';
import Reviews from './sections/Reviews';
import Services from './sections/Services';
import Process from './sections/Process';
import FAQ from './sections/FAQ';
import About from './sections/About';
import Gallery from './sections/Gallery';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import ServiceArea from './sections/ServiceArea';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import './i18n/config';

function App() {
  const { i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    return false;
  });

  useEffect(() => {
    // Update class on document element
    document.documentElement.classList.toggle('dark', darkMode);
    // Save preference to localStorage
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-slate-900 text-slate-100' : 'bg-white text-slate-900'}`}>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <main>
        <Hero />
        <WhyChooseUs />
        <Reviews />
        <Services />
        <Process />
        <FAQ />
        <About />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <ServiceArea />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;