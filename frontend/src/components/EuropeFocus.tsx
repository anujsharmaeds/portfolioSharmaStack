import React from 'react';
import { motion } from 'framer-motion';

import { MapPin, Plane, Globe, Clock, MessageSquare, CheckCircle } from 'lucide-react';

const EuropeFocus: React.FC = () => {


  const europeanCountries = [
    'Germany', 'Netherlands', 'UK', 'Sweden', 'Switzerland', 'France',
    'Spain', 'Italy', 'Austria', 'Denmark', 'Norway', 'Finland'
  ];

  const relocationSteps = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Initial Discussion',
      description: 'Understand requirements and expectations'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Visa & Documentation',
      description: 'Handle all paperwork and legal requirements'
    },
    {
      icon: <Plane className="w-6 h-6" />,
      title: 'Discuss',
      description: 'Travel, accommodation, and setup assistance'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Time Zone Adaptation',
      description: 'Flexible hours for European time zones'
    },
  ];

  const languageProgress = [
    { language: 'English', level: 'Fluent', percentage: 100 },
    { language: 'Hindi', level: 'Native', percentage: 100 },
    { language: 'German', level: 'A1 (Learning)', percentage: 30 },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-europe-blue/5 via-white to-europe-red/5 dark:from-gray-900 dark:via-gray-900 dark:to-europe-red/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-europe-blue to-europe-red text-white text-sm font-medium mb-4">
            <Globe className="w-4 h-4 mr-2" />
            European Market Focus
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for <span className="europe-gradient bg-clip-text text-transparent">European</span> Opportunities
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Open to Discuss across Europe with comprehensive preparation for seamless integration
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-europe-blue" />
                Target Countries
              </h3>
              <div className="flex flex-wrap gap-2">
                {europeanCountries.map((country) => (
                  <span
                    key={country}
                    className="px-3 py-1 bg-gradient-to-r from-europe-blue/10 to-europe-red/10 text-europe-blue dark:text-europe-gold rounded-full text-sm border border-europe-blue/20"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                Language Proficiency
              </h3>
              <div className="space-y-4">
                {languageProgress.map((lang) => (
                  <div key={lang.language}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300">{lang.language}</span>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">{lang.level}</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-europe-blue to-europe-gold"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Discussion Process
            </h3>

            {relocationSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-europe-blue to-europe-gold flex items-center justify-center">
                  <div className="text-white">
                    {step.icon}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white mb-1">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Timezone Info */}
            <div className="mt-8 bg-gradient-to-r from-europe-blue/10 to-europe-red/10 dark:from-europe-blue/5 dark:to-europe-red/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-gray-800 dark:text-white">Timezone Compatibility</h4>
                <Clock className="w-5 h-5 text-europe-blue" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-europe-blue">IST</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">India Standard Time</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-europe-red">CET</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Central European Time</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Overlap: 2:30 PM - 5:30 PM IST / 9:00 AM - 12:00 PM CET
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Interested in European Talent?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Let's discuss how I can contribute to your European team
              </p>
            </div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="px-6 py-3 bg-gradient-to-r from-europe-blue to-europe-red text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Schedule a Call
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EuropeFocus;