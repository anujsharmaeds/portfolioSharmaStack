import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Code, Users, Target, Globe, Award, Clock } from 'lucide-react';

const Stats: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: <Code className="w-8 h-8" />,
      value: '5+',
      label: t('hero.stats.experience', 'Years Experience'),
      description: t('stats.desc.experience', 'Years in Software Development')
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: '30+',
      label: t('hero.stats.clients', 'Happy Clients'),
      description: t('stats.desc.clients', 'Satisfied clients worldwide')
    },
    {
      icon: <Target className="w-8 h-8" />,
      value: '50+',
      label: t('hero.stats.projects', 'Projects'),
      description: t('stats.desc.projects', 'Successful projects delivered')
    },
    {
      icon: <Globe className="w-8 h-8" />,
      value: '5+',
      label: t('stats.countries', 'Countries'),
      description: t('stats.countries.desc', 'Clients across 5+ countries')
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: '100%',
      label: t('stats.success', 'Success Rate'),
      description: t('stats.success.desc', 'Project delivery success')
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: '24/7',
      label: t('stats.availability', 'Availability'),
      description: t('stats.availability.desc', 'Support & communication')
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('stats.title.1', 'By The')} <span className="gradient-text">{t('stats.title.2', 'Numbers')}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('stats.subtitle', 'Quantifying success through measurable achievements and consistent delivery')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 hover:border-blue-200 dark:hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>

                <div className="text-3xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>

                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {stat.label}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-500/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800 dark:text-white mb-2">10,000+</div>
              <p className="text-gray-600 dark:text-gray-400">{t('stats.extra.1', 'Concurrent Users Handled')}</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800 dark:text-white mb-2">40%</div>
              <p className="text-gray-600 dark:text-gray-400">{t('stats.extra.2', 'Average Performance Improvement')}</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800 dark:text-white mb-2">60%</div>
              <p className="text-gray-600 dark:text-gray-400">{t('stats.extra.3', 'Process Automation Achieved')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;