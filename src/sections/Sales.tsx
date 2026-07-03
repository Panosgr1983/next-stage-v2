import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { Package, Monitor, ShoppingBag } from 'lucide-react';

const Sales = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories = [
    {
      icon: <Package className="w-8 h-8 text-white" />,
      title: t('sales.refurbished'),
      description: t('sales.refurbishedDesc'),
      items: t('sales.refurbItems'),
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-white" />,
      title: t('sales.peripherals'),
      description: t('sales.peripheralsDesc'),
      items: t('sales.peripheralItems'),
      gradient: 'from-blue-500 to-purple-600',
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm mb-6">
            <Monitor className="w-4 h-4 text-orange-500 mr-2" />
            <span className="text-orange-500 text-sm font-medium">Sales</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('sales.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('sales.subtitle')}
          </p>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-8 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${cat.gradient} shadow-lg shrink-0`}>
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {cat.description}
                  </p>
                  <p className="text-[#6ab04c] font-semibold text-sm">
                    {cat.items}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sales;
