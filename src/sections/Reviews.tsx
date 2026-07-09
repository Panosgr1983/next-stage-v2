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
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 48 48" className="w-8 h-8">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            <div className="flex text-yellow-400 text-3xl tracking-wider">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>

          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('reviews.rating')}
              </span>
              <span className="text-base text-gray-500 dark:text-gray-400 font-medium">
                Google Reviews
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t('reviews.count')}
            </p>
          </div>

          <div className="hidden md:block w-px h-12 bg-gray-300 dark:bg-gray-600"></div>

          <div className="text-center md:text-left">
            <p className="text-base font-medium text-gray-700 dark:text-gray-200">
              {t('reviews.text')}
            </p>
            <a 
              href={t('reviews.link')}
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
