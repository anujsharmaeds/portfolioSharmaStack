import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
    >
      <div className="mb-6">
        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
          <div className="text-white">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          {title}
        </h3>
        <p className="text-white">
          {description}
        </p>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-white">{t('service.features', 'Key Features:')}</h4>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-5 h-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-white text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => toast(t('common.comingSoon', 'Coming Soon!'), { icon: '🚀' })}
        className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-medium transition-all duration-300"
      >
        {t('service.cat.learnMore', 'Learn More')}
      </motion.button>
    </motion.div>
  );
};

export default ServiceCard;