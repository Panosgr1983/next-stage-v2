import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X } from 'lucide-react';

const Gallery = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    { src: "/images/gallery/DSC_2814.jpg", alt: "Χώρος επισκευής" },
    { src: "/images/gallery/DSC_2810.jpg", alt: "Εργαστήριο" },
    { src: "/images/gallery/DSC_2801.jpg", alt: "Πάγκος εργασίας" },
    { src: "/images/gallery/DSC_2796.jpg", alt: "Εξοπλισμός" },
    { src: "/images/gallery/DSC_2792.jpg", alt: "Εργαλεία επισκευής" },
    { src: "/images/gallery/DSC_2785.jpg", alt: "Χώρος εργασίας" },
    { src: "/images/gallery/DSC_2938.jpg", alt: "Τεχνικός στη δουλειά" },
    { src: "/images/gallery/DSC_2932.jpg", alt: "Διάγνωση προβλήματος" },
    { src: "/images/gallery/DSC_2929.jpg", alt: "Επισκευή υπολογιστή" },
    { src: "/images/gallery/DSC_2926.jpg", alt: "Σέρβις" },
    { src: "/images/gallery/DSC_2924.jpg", alt: "Αναβάθμιση" },
    { src: "/images/gallery/DSC_2922.jpg", alt: "Συντήρηση" },
    { src: "/images/gallery/DSC_2914.jpg", alt: "Εργασία ακριβείας" },
    { src: "/images/gallery/DSC_2906.jpg", alt: "Ο χώρος μας" },
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="gallery" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {t('gallery.title')}
          </motion.h2>
          <motion.p
            className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('gallery.subtitle')}
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
              variants={itemVariants}
              onClick={() => setSelectedImage(image.src)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium px-4 py-2 border border-white rounded-full">
                  {t('gallery.viewLarger')}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal for enlarged image */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </button>
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;