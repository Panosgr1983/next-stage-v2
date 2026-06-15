import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const testimonials = [1, 2, 3].map(id => ({
    id,
    name: t(`testimonials.testimonial${id}.name`),
    text: t(`testimonials.testimonial${id}.text`),
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
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
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {t('testimonials.title')}
          </motion.h2>
          <motion.p
            className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('testimonials.subtitle')}
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 gap-8 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-white dark:bg-slate-900 rounded-lg p-8 shadow-sm relative"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="absolute -top-4 -left-4 bg-[#6ab04c] rounded-full p-3 shadow-md">
                <Quote className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic text-lg">"{testimonial.text}"</p>
              <div className="flex items-center">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-xl">{testimonial.name}</h4>
                  <p className="text-sm text-[#6ab04c]">{t('testimonials.client')}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;