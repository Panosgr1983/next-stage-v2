import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ClipboardCheck, Search, Wrench, Package } from 'lucide-react';

const Process = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const steps = [
    {
      icon: <ClipboardCheck className="w-8 h-8 text-white" />,
      title: t('process.step1Title'),
      text: t('process.step1Text'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Search className="w-8 h-8 text-white" />,
      title: t('process.step2Title'),
      text: t('process.step2Text'),
      color: 'from-[#6ab04c] to-green-500',
    },
    {
      icon: <Wrench className="w-8 h-8 text-white" />,
      title: t('process.step3Title'),
      text: t('process.step3Text'),
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Package className="w-8 h-8 text-white" />,
      title: t('process.step4Title'),
      text: t('process.step4Text'),
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('process.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('process.subtitle')}
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          <div className="hidden lg:block absolute top-24 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-blue-500 via-[#6ab04c] via-purple-500 to-orange-500 opacity-30"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-600 flex items-center justify-center">
                      <span className="text-sm font-bold text-[#6ab04c]">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="lg:pt-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-xs">
                      {step.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
