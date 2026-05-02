import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Check, X, ArrowRight, Zap, Shield, Clock, Users } from 'lucide-react';

const Services: React.FC = () => {
  const { t } = useTranslation();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'project'>('project');

  const servicePackages = [
    {
      name: t('service.basic'),
      price: billingCycle === 'monthly' ? '$999' : '$2,500',
      period: billingCycle === 'monthly' ? t('service.price.monthly') : t('service.price.project'),
      description: 'Perfect for startups and small projects',
      features: [
        'Responsive Website Development',
        'Basic SEO Optimization',
        'Contact Form Integration',
        'Up to 3 Revisions',
        '1 Month Support',
        'Basic Analytics Setup',
      ],
      excluded: [
        'Advanced AI Features',
        'Enterprise Scalability',
        'Dedicated Project Manager',
        '24/7 Priority Support',
      ],
      popular: false,
    },
    {
      name: t('service.pro'),
      price: billingCycle === 'monthly' ? '$2,499' : '$7,500',
      period: billingCycle === 'monthly' ? t('service.price.monthly') : t('service.price.project'),
      description: 'Ideal for growing businesses',
      features: [
        'Everything in Basic',
        'Full Stack Application',
        'Database Design & Integration',
        'API Development',
        'Advanced SEO',
        '3 Months Support',
        'Performance Optimization',
        'Basic AI Integration',
      ],
      excluded: [
        'Custom AI Models',
        'Enterprise Security Audit',
        'Dedicated DevOps',
      ],
      popular: true,
    },
    {
      name: "AI Agent Development",
      price: billingCycle === 'monthly' ? '$3,999' : '$10,000',
      period: billingCycle === 'monthly' ? t('service.price.monthly') : t('service.price.project'),
      description: 'Fully autonomous AI bots and LLM agents',
      features: [
        'Custom LLM Integration',
        'RAG (Retrieval-Augmented Generation)',
        'Telegram / Discord Bot Agents',
        'Autonomous Task Execution',
        'Voice & Text AI Interfaces',
        'Vector Database Setup',
      ],
      excluded: [
        'Enterprise On-Prem Hosting',
      ],
      popular: false,
    },
    {
      name: t('service.enterprise'),
      price: billingCycle === 'monthly' ? '$4,999+' : '$15,000+',
      period: billingCycle === 'monthly' ? t('service.price.monthly') : t('service.price.project'),
      description: 'For large enterprises and complex projects',
      features: [
        'Everything in Professional',
        'Custom AI/ML Solutions',
        'Microservices Architecture',
        'Enterprise Security',
        'Dedicated Project Manager',
        '24/7 Priority Support',
        'DevOps & CI/CD Setup',
        'Scalability Planning',
        'Team Training',
        'Ongoing Maintenance',
      ],
      excluded: [],
      popular: false,
    },
  ];

  const serviceCategories = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('service.webdev'),
      description: 'Modern web applications with React, Next.js, and TypeScript',
      details: [
        'Single Page Applications (SPA)',
        'Progressive Web Apps (PWA)',
        'Server-Side Rendering (SSR)',
        'Responsive & Mobile-First Design',
        'Performance Optimization',
        'SEO Best Practices',
      ],
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('service.api'),
      description: 'Secure and scalable APIs with Node.js, NestJS, and FastAPI',
      details: [
        'REST & GraphQL APIs',
        'Authentication & Authorization',
        'Rate Limiting & Throttling',
        'API Documentation',
        'Microservices Architecture',
        'WebSocket Integration',
      ],
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t('service.ai'),
      description: 'AI integration and machine learning solutions',
      details: [
        'OpenAI Integration',
        'Custom ML Models',
        'Natural Language Processing',
        'Computer Vision',
        'Predictive Analytics',
        'Automation & Bots',
      ],
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('service.consulting'),
      description: 'Technical guidance and architecture design',
      details: [
        'System Architecture Review',
        'Technical Roadmapping',
        'Code Review & Optimization',
        'Team Mentoring',
        'Technology Stack Selection',
        'Performance Audits',
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
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  billingCycle === 'project'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {t('service.billing.project', 'Project-Based')}
              </button>
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {t('service.billing.monthly', 'Monthly Retainer')}
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
                className={`relative rounded-2xl p-8 border-2 transition-all duration-300 ${
                  pkg.popular
                    ? 'border-blue-500 shadow-2xl scale-105 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/10'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full">
                      Most Popular
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
                      Not Included:
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
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    pkg.popular
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
              {t('service.categories.title', 'Service Categories').split(' ')[0]} <span className="gradient-text">{t('service.categories.title', 'Service Categories').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('service.categories.subtitle', 'Comprehensive solutions across modern web technologies')}
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
                  Learn More
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
              {t('service.custom.title', 'Need a Custom Solution?')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {t('service.custom.subtitle', 'Every project is unique. Let\'s discuss your specific requirements and create a tailored plan.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all"
              >
                {t('service.custom.btn1', 'Get a Custom Quote')}
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all"
              >
                {t('service.custom.btn2', 'Schedule a Consultation')}
              </motion.a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;