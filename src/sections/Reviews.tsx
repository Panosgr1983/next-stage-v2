import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, ExternalLink } from 'lucide-react';

const Reviews = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  return (
    <section className="py-14 bg-gradient-to-r from-[#6ab04c]/10 via-green-500/5 to-[#6ab04c]/10 dark:from-[#6ab04c]/5 dark:via-green-500/[0.02] dark:to-[#6ab04c]/5 border-y border-[#6ab04c]/10 dark:border-[#6ab04c]/10">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <div className="flex text-yellow-400 text-3xl tracking-wider">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-7 h-7 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>

          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('reviews.rating')}
              </span>
              <span className="text-lg text-gray-500 dark:text-gray-400">
                Google Reviews
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t('reviews.count')}
            </p>
          </div>

          <div className="hidden md:block w-px h-12 bg-gray-300 dark:bg-gray-600"></div>

          <div className="text-center md:text-left">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
              {t('reviews.text')}
            </p>
            <a 
              href="https://search.google.com/local/reviews?placeid=YOUR_PLACE_ID" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-[#6ab04c] hover:text-[#5a9f3d] font-medium mt-1 transition-colors"
            >
              {t('reviews.cta')}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
