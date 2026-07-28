import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Hero from './sections/Hero';
import WhyChooseUs from './sections/WhyChooseUs';
import Reviews from './sections/Reviews';
import Services from './sections/Services';
import Process from './sections/Process';
import FAQ from './sections/FAQ';
import About from './sections/About';
import Gallery from './sections/Gallery';
import Testimonials from './sections/Testimonials';
import Sales from './sections/Sales';
import Contact from './sections/Contact';
import ServiceDetail from './pages/ServiceDetail';
import './i18n/config';

function HomePage() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <Reviews />
      <Testimonials />
      <Services />
      <Sales />
      <Process />
      <FAQ />
      <About />
      <Gallery />
      <Contact />
    </>
  );
}

function AppLayout() {
  const { i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    return true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className={`min-h-screen overflow-x-clip transition-colors duration-300 ${darkMode ? 'dark bg-slate-900 text-slate-100' : 'bg-white text-slate-900'}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-white focus:text-slate-900 focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6ab04c]">
        Μετάβαση στο κύριο περιεχόμενο
      </a>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/service/:slug" element={<ServiceDetail />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
