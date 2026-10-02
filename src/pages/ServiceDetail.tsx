import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { getServiceBySlug } from '../data/services';
import { setPageMeta, resetPageMeta } from '../seo';

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const service = slug ? getServiceBySlug(slug) : undefined;

  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    if (!service || service.gallery.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImg(prev => (prev + 1) % service.gallery.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [service]);

  useEffect(() => {
    if (!service) return;
    const lang = i18n.language === 'en' ? 'en' : 'el';
    const area = lang === 'en' ? 'Galatsi' : 'Γαλάτσι';
    const title = `${t(service.titleKey)} ${area} | NextStage`;
    const description = t(service.metaDescriptionKey);
    const canonical = `https://nextstage-service.gr/service/${service.slug}`;

    setPageMeta({
      title,
      description,
      canonical,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: t(service.titleKey),
          url: canonical,
          description: t(service.subtitleKey),
          provider: {
            '@type': 'ComputerRepairShop',
            name: 'NextStage Technology Solutions',
            telephone: '210 21 16 016',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Προφήτη Ηλία 5',
              addressLocality: 'Γαλάτσι',
              postalCode: '111 47',
              addressCountry: 'GR',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 38.01037,
              longitude: 23.75298,
            },
          },
          areaServed: { '@type': 'City', name: area },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: t('nav.home'),
              item: 'https://nextstage-service.gr/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: t('nav.services'),
              item: 'https://nextstage-service.gr/#services',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: t(service.titleKey),
              item: canonical,
            },
          ],
        },
      ],
    });

    return () => {
      resetPageMeta();
    };
  }, [service, i18n.language, t]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('notFound.title')}
          </h1>
          <Link to="/" className="text-[#6ab04c] hover:underline">
            {t('notFound.home')}
          </Link>
        </div>
      </div>
    );
  }

  const hasSlider = service.gallery.length > 1;

  return (
    <div className="bg-white dark:bg-slate-900">
      {/* Header */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden pt-14">
        <div className="absolute inset-0">
          <img
            src={service.headerImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/50" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
            {t(service.titleKey)}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            {t(service.subtitleKey)}
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Link to="/" className="hover:text-[#6ab04c] transition-colors">
              {t('nav.home')}
            </Link>
            <ChevronRight size={14} />
            <Link to="/#services" className="hover:text-[#6ab04c] transition-colors">
              {t('nav.services')}
            </Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 dark:text-white font-medium">
              {t(service.titleKey)}
            </span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t(service.titleKey)}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              {t(service.subtitleKey)}
            </p>
            <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
              <p>{t(service.descriptionKey)}</p>
              <p>{t('services.detailDescription')}</p>
            </div>
            <Link
              to="/#contact"
              className="inline-flex items-center px-6 py-3 mt-6 bg-[#6ab04c] hover:bg-[#5a9f3d] text-white font-semibold rounded-md transition-colors"
            >
              {t('services.contactUs')}
            </Link>
          </div>

          {/* Gallery Slider */}
          <div className="lg:col-span-2">
            <div className="relative rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-slate-800 h-72 md:h-96">
              {service.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    i === currentImg ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              {hasSlider && (
                <>
                  <button
                    onClick={() => setCurrentImg(prev => (prev === 0 ? service.gallery.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white flex items-center justify-center transition-all z-10"
                    aria-label="Previous"
                  >
                    <ChevronRight className="rotate-180" size={20} />
                  </button>
                  <button
                    onClick={() => setCurrentImg(prev => (prev + 1) % service.gallery.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white flex items-center justify-center transition-all z-10"
                    aria-label="Next"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                    {service.gallery.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImg(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          i === currentImg ? 'bg-white w-6' : 'bg-white/50'
                        }`}
                        aria-label={`Image ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Back to Services */}
      <div className="bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <Link
            to="/#services"
            className="inline-flex items-center text-[#6ab04c] hover:text-[#5a9f3d] transition-colors font-medium"
          >
            <ArrowLeft size={18} className="mr-2" />
            {t('services.backToServices')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
