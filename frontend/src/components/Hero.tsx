import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, MapPin, Globe, Calendar, X, Code, Server, Database, Cloud, Cpu, Brain, GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';

// Technology data with icons and categories
const technologies = {
  frontend: {
    title: "Frontend & UI",
    icon: <Code className="w-5 h-5" />,
    techs: [
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    ]
  },
  backend: {
    title: "Backend & APIs",
    icon: <Server className="w-5 h-5" />,
    techs: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
      { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
      { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: "Nest.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg" },
    ]
  },
  database: {
    title: "Databases",
    icon: <Database className="w-5 h-5" />,
    techs: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    ]
  },
  cloud: {
    title: "Cloud & DevOps",
    icon: <Cloud className="w-5 h-5" />,
    techs: [
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
    ]
  },
  versionControl: {
    title: "Version Control",
    icon: <GitBranch className="w-5 h-5" />,
    techs: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "GitLab", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" },
    ]
  },
  iot: {
    title: "IoT & AI",
    icon: <Cpu className="w-5 h-5" />,
    techs: [
      { name: "IoT", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" },
      { name: "Predictive Maintenance", icon: <Brain className="w-6 h-6" /> },
    ]
  }
};

const TechModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-black dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-2 rounded-t-2xl z-20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Explore my tech stack and expertise across different domains
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {Object.entries(technologies).map(([key, category]) => (
                  <div key={key} className="mb-8 last:mb-0">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        {category.title}
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {category.techs.map((tech) => (
                        <motion.div
                          key={tech.name}
                          whileHover={{ y: -2 }}
                          className="group relative bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all duration-300"
                        >
                          {typeof tech.icon === 'string' ? (
                            <img
                              src={tech.icon}
                              alt={tech.name}
                              className="w-10 h-10 mb-3 object-contain"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const fallback = document.createElement('div');
                                fallback.className = "w-10 h-10 mb-3 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg";
                                fallback.textContent = tech.name.charAt(0);
                                target.parentNode?.insertBefore(fallback, target);
                              }}
                            />
                          ) : (
                            <div className="w-10 h-10 mb-3 flex items-center justify-center text-purple-600 dark:text-purple-400">
                              {tech.icon}
                            </div>
                          )}
                          <span className="font-medium text-gray-800 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {tech.name}
                          </span>
                          
                          {/* Hover effect */}
                          <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/30 dark:group-hover:border-blue-400/30 rounded-xl transition-all duration-300" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-2 rounded-b-2xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Continuously learning and adapting to new technologies
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Got it!
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Name centered at top */}
              <div className="mb-8">
                <h1 className="text-5xl md:text-7xl font-bold mb-2">
                  <span className="gradient-text">Anuj Sharma</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400">
                  {t('hero.title')}
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {t('hero.based')}
                </span>
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  {t('hero.target')}
                </span>
                <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {t('status.available')}
                </span>
              </div>

              {/* Subtitle */}
              {/* <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8">
                {t('hero.subtitle')}
              </p> */}

              {/* Description */}
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12">
                {t('hero.description')}
              </p>

              {/* CTA Buttons with Tech Stack Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
                  >
                    {t('hero.cta.hire')}
                    <ArrowRight className="ml-3 w-5 h-5" />
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => setIsTechModalOpen(true)}
                    className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-lg hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300"
                  >
                    View Tech Stack
                  </button>
                </motion.div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                {[
                  { value: '4.5+', label: 'Years Experience' },
                  { value: '50+', label: 'Projects' },
                  { value: '30+', label: 'Happy Clients' },
                  { value: '100%', label: 'Remote Ready' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Tech Stack Modal */}
      <TechModal isOpen={isTechModalOpen} onClose={() => setIsTechModalOpen(false)} />
    </>
  );
};

export default Hero;