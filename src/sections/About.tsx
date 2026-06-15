import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
console.log(t('about.title'));
  const stats = [
    { value: 10, label: t('about.experience') },
    { value: 2000, label: t('about.customers') },
    { value: 8, label: t('about.services') },
    { value: 5, label: t('about.certified') }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.pexels.com/photos/4792733/pexels-photo-4792733.jpeg" 
                alt="Computer repair technician" 
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#6ab04c] text-white p-6 rounded-lg shadow-lg hidden md:block">
              <p className="font-bold text-2xl">10+</p>
              <p className="text-sm">{t('about.experience')}</p>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('about.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              {t('about.subtitle')}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {t('about.description')}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="text-3xl font-bold text-[#6ab04c] mb-1">
                    {stat.value >= 1000 ? `${stat.value / 1000}K+` : `${stat.value}+`}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;