import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    // For now, we'll simulate a successful submission
    setTimeout(() => {
      setFormStatus({
        success: true,
        message: t('contact.success')
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-[#6ab04c]" />,
      title: t('contact.address'),
      details: 'Προφήτη Ηλία 5, Γαλάτσι 111 47',
      link: 'https://maps.google.com/?q=Προφήτη+Ηλία+5,+Γαλάτσι',
      linkText: t('contact.viewOnMap')
    },
    {
      icon: <Phone className="w-6 h-6 text-[#6ab04c]" />,
      title: t('contact.phone'),
      details: '210 21 16 016',
      link: 'tel:2102116016',
      linkText: t('contact.callUs')
    },
    {
      icon: <Mail className="w-6 h-6 text-[#6ab04c]" />,
      title: t('contact.email'),
      details: 'nextstagegalatsi@gmail.com',
      link: 'mailto:nextstagegalatsi@gmail.com',
      linkText: t('contact.emailUs')
    },
    {
      icon: <Clock className="w-6 h-6 text-[#6ab04c]" />,
      title: t('contact.hours'),
      details: (
        <>
          <p>{t('contact.weekdays')}</p>
          <p>{t('contact.saturday')}</p>
          <p>{t('contact.sunday')}</p>
        </>
      ),
      link: null,
      linkText: null
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {t('contact.title')}
          </motion.h2>
          <motion.p
            className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('contact.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            ref={ref}
            className="bg-gray-50 dark:bg-slate-800 rounded-lg p-8 shadow-sm"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              {t('contact.getInTouch')}
            </h3>
            {formStatus && (
              <div 
                className={`mb-6 p-4 rounded ${
                  formStatus.success ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                }`}
              >
                {formStatus.message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {t('contact.formName')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6ab04c] focus:border-transparent dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    {t('contact.formEmail')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6ab04c] focus:border-transparent dark:bg-slate-700 dark:text-white"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="phone" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    {t('contact.formPhone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6ab04c] focus:border-transparent dark:bg-slate-700 dark:text-white"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {t('contact.formMessage')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6ab04c] focus:border-transparent resize-none dark:bg-slate-700 dark:text-white"
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="bg-[#6ab04c] hover:bg-[#5a9f3d] text-white font-semibold py-3 px-6 rounded-md transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('contact.formSubmit')}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="lg:pl-8"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                {t('contact.contactInfo')}
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mt-1">
                      {info.icon}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">{info.title}</h4>
                      <div className="mt-1 text-gray-600 dark:text-gray-300">
                        {info.details}
                      </div>
                      {info.link && (
                        <a 
                          href={info.link} 
                          className="mt-1 text-[#6ab04c] hover:text-[#5a9f3d] transition-colors inline-block"
                          target={info.link.startsWith('http') ? '_blank' : '_self'}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                        >
                          {info.linkText}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-lg overflow-hidden shadow-sm h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.854517261086!2d23.75074937677936!3d38.02191897161675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1a26d76b89b29%3A0x400bd2ce2b98c40!2zzqDPgc6_z4bOrs-EzrfPgiDOl867zq_OsSDVoSwgzpPOsc67zqzPhM-DzrkgMTExIDQ3!5e0!3m2!1sel!2sgr!4v1709913425789!5m2!1sel!2sgr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="NextStage Technology Solutions location"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;