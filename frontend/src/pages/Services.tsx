import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Check, X, ArrowRight, Zap, Shield, Clock, Users } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import { AnimatePresence } from 'framer-motion';

const Services: React.FC = () => {
  const { t } = useTranslation();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'project'>('project');
  const [selectedPlan, setSelectedPlan] = useState<{name: string, price: string} | null>(null);

  const servicePackages = [
    {
      name: t('service.basic'),
      price: billingCycle === 'monthly' ? '$999' : '$2,500',
      period: billingCycle === 'monthly' ? t('service.price.monthly') : t('service.price.project'),
      description: t('service.pkg.basic.desc'),
      features: [
        t('service.pkg.basic.f1'),
        t('service.pkg.basic.f2'),
        t('service.pkg.basic.f3'),
        t('service.pkg.basic.f4'),
        t('service.pkg.basic.f5'),
        t('service.pkg.basic.f6'),
      ],
      excluded: [
        t('service.pkg.basic.e1'),
        t('service.pkg.basic.e2'),
        t('service.pkg.basic.e3'),
        t('service.pkg.basic.e4'),
      ],
      popular: false,
    },
    {
      name: t('service.pro'),
      price: billingCycle === 'monthly' ? '$2,499' : '$7,500',
      period: billingCycle === 'monthly' ? t('service.price.monthly') : t('service.price.project'),
      description: t('service.pkg.pro.desc'),
      features: [
        t('service.pkg.pro.f1'),
        t('service.pkg.pro.f2'),
        t('service.pkg.pro.f3'),
        t('service.pkg.pro.f4'),
        t('service.pkg.pro.f5'),
        t('service.pkg.pro.f6'),
        t('service.pkg.pro.f7'),
        t('service.pkg.pro.f8'),
      ],
      excluded: [
        t('service.pkg.pro.e1'),
        t('service.pkg.pro.e2'),
        t('service.pkg.pro.e3'),
      ],
      popular: true,
    },
    {
      name: t('service.ai.name'),
      price: billingCycle === 'monthly' ? '$3,999' : '$10,000',
      period: billingCycle === 'monthly' ? t('service.price.monthly') : t('service.price.project'),
      description: t('service.pkg.ai.desc'),
      features: [
        t('service.pkg.ai.f1'),
        t('service.pkg.ai.f2'),
        t('service.pkg.ai.f3'),
        t('service.pkg.ai.f4'),
        t('service.pkg.ai.f5'),
        t('service.pkg.ai.f6'),
      ],
      excluded: [
        t('service.pkg.ai.e1'),
      ],
      popular: false,
    },
    {
      name: t('service.enterprise'),
      price: billingCycle === 'monthly' ? '$4,999+' : '$15,000+',
      period: billingCycle === 'monthly' ? t('service.price.monthly') : t('service.price.project'),
      description: t('service.pkg.ent.desc'),
      features: [
        t('service.pkg.ent.f1'),
        t('service.pkg.ent.f2'),
        t('service.pkg.ent.f3'),
        t('service.pkg.ent.f4'),
        t('service.pkg.ent.f5'),
        t('service.pkg.ent.f6'),
        t('service.pkg.ent.f7'),
        t('service.pkg.ent.f8'),
        t('service.pkg.ent.f9'),
        t('service.pkg.ent.f10'),
      ],
      excluded: [],
      popular: false,
    },
  ];

  const serviceCategories = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('service.webdev'),
      description: t('service.cat.web.desc'),
      details: [
        t('service.cat.web.d1', 'Single Page Applications (SPA)'),
        t('service.cat.web.d2', 'Progressive Web Apps (PWA)'),
        t('service.cat.web.d3', 'Server-Side Rendering (SSR)'),
        t('service.cat.web.d4', 'Responsive & Mobile-First Design'),
        t('service.cat.web.d5', 'Performance Optimization'),
        t('service.cat.web.d6', 'SEO Best Practices'),
      ],
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('service.api'),
      description: t('service.cat.api.desc'),
      details: [
        t('service.cat.api.d1', 'REST & GraphQL APIs'),
        t('service.cat.api.d2', 'Authentication & Authorization'),
        t('service.cat.api.d3', 'Rate Limiting & Throttling'),
        t('service.cat.api.d4', 'API Documentation'),
        t('service.cat.api.d5', 'Microservices Architecture'),
        t('service.cat.api.d6', 'WebSocket Integration'),
      ],
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t('service.ai'),
      description: t('service.cat.ai.desc'),
      details: [
        t('service.cat.ai.d1', 'OpenAI Integration'),
        t('service.cat.ai.d2', 'Custom ML Models'),
        t('service.cat.ai.d3', 'Natural Language Processing'),
        t('service.cat.ai.d4', 'Computer Vision'),
        t('service.cat.ai.d5', 'Predictive Analytics'),
        t('service.cat.ai.d6', 'Automation & Bots'),
      ],
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('service.consulting'),
      description: t('service.cat.cons.desc'),
      details: [
        t('service.cat.cons.d1', 'System Architecture Review'),
        t('service.cat.cons.d2', 'Technical Roadmapping'),
        t('service.cat.cons.d3', 'Code Review & Optimization'),
        t('service.cat.cons.d4', 'Team Mentoring'),
        t('service.cat.cons.d5', 'Technology Stack Selection'),
        t('service.cat.cons.d6', 'Performance Audits'),
      ],
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('services.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
      </section>

      {/* Pricing Toggle */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-1 inline-flex mx-auto">
              <button
                onClick={() => setBillingCycle('project')}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${billingCycle === 'project'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                {t('service.billing.project')}
              </button>
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${billingCycle === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                {t('service.billing.monthly')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {servicePackages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 border-2 transition-all duration-300 ${pkg.popular
                    ? 'border-blue-500 shadow-2xl scale-105 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/10'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                  }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full">
                      {t('service.badge.popular')}
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {pkg.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold gradient-text">{pkg.price}</span>
                    <span className="text-gray-600 dark:text-gray-400">{pkg.period}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{pkg.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    {t('service.features')}:
                  </h4>
                  <ul className="space-y-3">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {pkg.excluded.length > 0 && (
                  <div className="space-y-4 mb-8">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                      {t('service.notIncluded')}
                    </h4>
                    <ul className="space-y-3">
                      {pkg.excluded.map((item) => (
                        <li key={item} className="flex items-start">
                          <X className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-500 dark:text-gray-500">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPlan(pkg)}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${pkg.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                >
                  {pkg.name === t('service.enterprise')
                    ? t('service.cta.contact')
                    : t('service.cta.select')}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('service.categories.title').split(' ')[0]} <span className="gradient-text">{t('service.categories.title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('service.categories.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <div className="text-white">
                      {category.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {category.description}
                    </p>
                  </div>
                </div>

                <ul className="grid grid-cols-2 gap-3">
                  {category.details.map((detail) => (
                    <li key={detail} className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{detail}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ x: 5 }}
                  className="mt-6 flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  {t('service.cat.learnMore')}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('service.custom.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {t('service.custom.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all"
              >
                {t('service.custom.btn1')}
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all"
              >
                {t('service.custom.btn2')}
              </motion.a>
            </div>
          </div>
        </div>
      </section>
      {/* Plan Selection Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedPlan(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {selectedPlan.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {billingCycle === 'monthly' ? 'Monthly Retainer' : 'Project-Based'} • {selectedPlan.price}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <ContactForm 
                  activeTab="plan" 
                  defaultSubject={`Plan Inquiry: ${selectedPlan.name} (${billingCycle})`} 
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;