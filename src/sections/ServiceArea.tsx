import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { MapPin } from 'lucide-react';

const ServiceArea = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const areas = t('serviceArea.areas', { returnObjects: true }) as string[];

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          ref={ref}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#6ab04c]/10 border border-[#6ab04c]/20 backdrop-blur-sm mb-6">
            <MapPin className="w-4 h-4 text-[#6ab04c] mr-2" />
            <span className="text-[#6ab04c] text-sm font-medium">
              {t('serviceArea.title')}
            </span>
          </div>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            {t('serviceArea.text')}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {areas.map((area, index) => (
              <motion.span
                key={area}
                className="inline-block px-3 py-1.5 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 text-sm rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {area}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceArea;
