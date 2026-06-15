import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Laptop, 
  Monitor, 
  Server,
  HardDrive,
  Building2,
  Terminal,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const Services = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const services = [
    {
      icon: <Laptop className="w-8 h-8" />,
      image: "/images/gallery/DSC_2814.webp",
      title: t('services.laptopRepair.title'),
      description: t('services.laptopRepair.description'),
      gradient: 'from-[#6ab04c] to-green-500',
      bgGradient: 'from-[#6ab04c]/20 to-green-500/20'
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      image: "/images/gallery/DSC_2801.webp",
      title: t('services.desktopRepair.title'),
      description: t('services.desktopRepair.description'),
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      image: "/images/gallery/DSC_2785.webp",
      title: t('services.imacRepair.title'),
      description: t('services.imacRepair.description'),
      gradient: 'from-[#6ab04c] to-emerald-500',
      bgGradient: 'from-[#6ab04c]/20 to-emerald-500/20'
    },
    {
      icon: <Laptop className="w-8 h-8" />,
      image: "/images/gallery/DSC_2938.webp",
      title: t('services.macbookRepair.title'),
      description: t('services.macbookRepair.description'),
      gradient: 'from-blue-600 to-purple-500',
      bgGradient: 'from-blue-600/20 to-purple-500/20'
    },
    {
      icon: <Server className="w-8 h-8" />,
      image: "/images/gallery/DSC_2796.webp",
      title: t('services.macMiniRepair.title'),
      description: t('services.macMiniRepair.description'),
      gradient: 'from-[#6ab04c] to-blue-500',
      bgGradient: 'from-[#6ab04c]/20 to-blue-500/20'
    },
    {
      icon: <HardDrive className="w-8 h-8" />,
      image: "/images/gallery/DSC_2792.webp",
      title: t('services.dataRecovery.title'),
      description: t('services.dataRecovery.description'),
      gradient: 'from-green-500 to-[#6ab04c]',
      bgGradient: 'from-green-500/20 to-[#6ab04c]/20'
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      image: "/images/gallery/DSC_2926.webp",
      title: t('services.supportContract.title'),
      description: t('services.supportContract.description'),
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      icon: <Terminal className="w-8 h-8" />,
      image: "/images/gallery/DSC_2932.webp",
      title: t('services.osInstallation.title'),
      description: t('services.osInstallation.description'),
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-500/20 to-red-500/20'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-500 mr-2" />
            <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">Our Services</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-[#6ab04c] to-blue-800 dark:from-white dark:via-[#6ab04c] dark:to-blue-200 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('services.title')}
          </motion.h2>
          <motion.p
            className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('services.subtitle')}
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-slate-700"
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Image Background */}
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-80 group-hover:opacity-60 transition-opacity duration-300`} />

                {/* Icon */}
                <div className="absolute top-4 left-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${service.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-[#6ab04c] dark:group-hover:text-[#6ab04c] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;