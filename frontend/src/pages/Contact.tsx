import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Mail, MapPin, Send, Clock, CheckCircle } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  // Initialize tab from URL or default to 'general'
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') || 'general';
  });

  const contactInfo = [
    // {
    //   icon: <Phone className="w-6 h-6" />,
    //   title: t('contact.info.phone'),
    //   value: '+91 XXXXXXXXX',
    //   link: 'tel:+91XXXXXXXXX',
    // },
    {
      icon: <Mail className="w-6 h-6" />,
      title: t('contact.info.email'),
      value: "contact@sharmastack.com",
      link: "mailto:contact@sharmastack.com",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t('contact.info.location'),
      value: t('hero.based', 'Gurugram, Haryana, India'),
      link: 'https://maps.google.com/?q=Gurugram+Haryana+India',
    },
    // {
    //   icon: <Linkedin className="w-6 h-6" />,
    //   title: t('contact.info.linkedin'),
    //   value: 'linkedin.com/in/konnecto-iot',
    //   link: 'https://www.linkedin.com/company/konnecto-iot/',
    // },
  ];

  const inquiryTypes = [
    {
      id: 'general',
      title: t('contact.inquiry.general.title'),
      description: t('contact.inquiry.general.desc'),
      responseTime: t('contact.inquiry.general.time'),
    },
    {
      id: 'project',
      title: t('contact.inquiry.project.title'),
      description: t('contact.inquiry.project.desc'),
      responseTime: t('contact.inquiry.project.time'),
    },
    {
      id: 'career',
      title: t('contact.inquiry.career.title'),
      description: t('contact.inquiry.career.desc'),
      responseTime: t('contact.inquiry.career.time'),
    },
    {
      id: 'collaboration',
      title: t('contact.inquiry.collab.title'),
      description: t('contact.inquiry.collab.desc'),
      responseTime: t('contact.inquiry.collab.time'),
    },
  ];

  const europeAvailability = [
    { timezone: t('contact.tz.cet', 'CET (Berlin)'), hours: t('contact.tz.cet.hours', '9:00 AM - 6:00 PM') },
    { timezone: t('contact.tz.gmt', 'GMT (London)'), hours: t('contact.tz.gmt.hours', '8:00 AM - 5:00 PM') },
    { timezone: t('contact.tz.ist', 'IST (India)'), hours: t('contact.tz.ist.hours', '1:30 PM - 10:30 PM') },
    { timezone: t('contact.tz.est', 'EST (New York)'), hours: t('contact.tz.est.hours', '3:00 AM - 12:00 PM') },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-green-900/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                {t('contact.info.title')}
              </h2>

              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <a
                    key={info.title}
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : '_self'}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center flex-shrink-0">
                      <div className="text-white">
                        {info.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {info.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-300">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Inquiry Types */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                {t('contact.help.title')}
              </h3>

              <div className="space-y-4">
                {inquiryTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveTab(type.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${activeTab === type.id
                      ? 'bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-2 border-blue-500'
                      : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent'
                      }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        {type.title}
                      </h4>
                      {activeTab === type.id && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {type.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      {t('contact.help.response')} {type.responseTime}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-500/10 to-green-500/10 dark:from-blue-500/5 dark:to-green-500/5 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-500/20"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-2" />
                {t('contact.europe.title')}
              </h3>

              <div className="space-y-4">
                {europeAvailability.map((zone) => (
                  <div key={zone.timezone} className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {zone.timezone}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {zone.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">{t('contact.europe.noteLabel')}</span> {t('contact.europe.note')}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
            id="contact-form-section"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-2">
                  <Send className="w-6 h-6 text-blue-500" />
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {t('contact.msg.title')}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('contact.msg.desc')}
                </p>
              </div>

              {/* Inquiry Type Badge */}
              <div className="mb-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-medium">
                  {inquiryTypes.find(t => t.id === activeTab)?.title}
                </div>
              </div>

              <ContactForm activeTab={activeTab} />

              {/* Process Timeline */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                  {t('contact.next.title')}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      step: '1',
                      title: t('contact.next.s1.title'),
                      description: t('contact.next.s1.desc')
                    },
                    {
                      step: '2',
                      title: t('contact.next.s2.title'),
                      description: t('contact.next.s2.desc')
                    },
                    {
                      step: '3',
                      title: t('contact.next.s3.title'),
                      description: t('contact.next.s3.desc')
                    },
                  ].map((item) => (
                    <div key={item.step} className="text-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                        {item.step}
                      </div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: t('contact.trust.s1'), icon: '🔒' },
                { label: t('contact.trust.s2'), icon: '🚫' },
                { label: t('contact.trust.s3'), icon: '⚡' },
                { label: t('contact.trust.s4'), icon: '🤝' },
              ].map((signal) => (
                <div
                  key={signal.label}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700"
                >
                  <div className="text-2xl mb-2">{signal.icon}</div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {signal.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('contact.cta.title.1')} <span className="gradient-text">{t('contact.cta.title.2')}</span> {t('contact.cta.title.3')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {t('contact.cta.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact-form-section"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all"
              >
                {t('contact.cta.start')}
              </motion.a>
              {/* <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+917525071752"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all"
              >
                {t('contact.cta.call')}
              </motion.a> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;