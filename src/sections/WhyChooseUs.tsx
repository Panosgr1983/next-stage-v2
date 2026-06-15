import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Laptop, Cpu, Shield, Clock, HeadphonesIcon, CheckCircle 
} from 'lucide-react';

const WhyChooseUs = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const reasons = [
    { icon: <Laptop className="w-6 h-6 text-white" />, text: t('whyChooseUs.reason1') },
    { icon: <Cpu className="w-6 h-6 text-white" />, text: t('whyChooseUs.reason2') },
    { icon: <Shield className="w-6 h-6 text-white" />, text: t('whyChooseUs.reason3') },
    { icon: <Clock className="w-6 h-6 text-white" />, text: t('whyChooseUs.reason4') },
    { icon: <HeadphonesIcon className="w-6 h-6 text-white" />, text: t('whyChooseUs.reason5') },
    { icon: <CheckCircle className="w-6 h-6 text-white" />, text: t('whyChooseUs.reason6') },
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('whyChooseUs.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('whyChooseUs.subtitle')}
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-4 p-5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:border-[#6ab04c]/30 dark:hover:border-[#6ab04c]/30 group"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -3 }}
            >
              <div className="flex-shrink-0 w-11 h-11 bg-gradient-to-br from-[#6ab04c] to-green-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                {reason.icon}
              </div>
              <div className="pt-1.5">
                <p className="text-gray-700 dark:text-gray-200 font-medium leading-relaxed">
                  {reason.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
