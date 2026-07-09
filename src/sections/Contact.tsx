import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, Mail, MapPin, Clock, Loader2 } from 'lucide-react';

const FORM_ENDPOINT = '/api/contact';

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

  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    if (!formData.name.trim()) return t('contact.formName');
    if (!formData.email.trim()) return t('contact.formEmail');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return t('contact.formEmail');
    if (!formData.message.trim()) return t('contact.formMessage');
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setFormStatus({ success: false, message: `Παρακαλώ συμπληρώστε το πεδίο: ${error}` });
      return;
    }

    setSending(true);
    setFormStatus(null);

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, _subject: 'NextStage Contact Form' })
      });
      if (res.ok) {
        setFormStatus({ success: true, message: t('contact.success') });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setFormStatus({ success: false, message: t('contact.error') });
      }
    } catch {
      setFormStatus({ success: false, message: t('contact.error') });
    } finally {
      setSending(false);
    }
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
          <p>{t('contact.day1')}</p>
          <p>{t('contact.day2')}</p>
          <p>{t('contact.day3')}</p>
          <p>{t('contact.day4')}</p>
          <p>{t('contact.day5')}</p>
          <p>{t('contact.day6')}</p>
          <p>{t('contact.day7')}</p>
        </>
      ),
      link: null,
      linkText: null
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
              <div className="hidden" aria-hidden="true">
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
              </div>
              <motion.button
                type="submit"
                disabled={sending}
                className="bg-[#6ab04c] hover:bg-[#5a9f3d] text-white font-semibold py-3 px-6 rounded-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                whileHover={{ scale: sending ? 1 : 1.02 }}
                whileTap={{ scale: sending ? 1 : 0.98 }}
              >
                {sending && <Loader2 className="w-4 h-4 animate-spin" />}
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
            <div className="relative rounded-lg overflow-hidden shadow-sm h-80">
              <iframe
                src="https://www.google.com/maps?q=%CE%A0%CF%81%CE%BF%CF%86%CE%AE%CF%84%CE%B7+%CE%97%CE%BB%CE%AF%CE%B1+5,+%CE%93%CE%B1%CE%BB%CE%AC%CF%84%CF%83%CE%B9+111+47&output=embed&z=15"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="NextStage Technology Solutions location"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
                <svg width="30" height="48" viewBox="0 0 30 48" fill="none" className="-mt-6">
                  <path d="M15 0C6.716 0 0 6.716 0 15C0 18 0.5 20 1.5 22L15 48L28.5 22C29.5 20 30 18 30 15C30 6.716 23.284 0 15 0Z" fill="#6ab04c"/>
                  <circle cx="15" cy="14" r="7" fill="white"/>
                  <circle cx="15" cy="14" r="3" fill="#6ab04c"/>
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;