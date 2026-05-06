import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, MapPin, Globe, Calendar, X, Code, Server, Database, Cloud, Cpu, Brain, GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';

// Technology data with icons and categories
const getTechnologies = (t: any) => ({
  frontend: {
    title: t('hero.techs.title.frontend', 'Frontend & UI'),
    icon: <Code className="w-5 h-5" />,
    techs: [
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    ]
  },
  backend: {
    title: t('hero.techs.title.backend', 'Backend & APIs'),
    icon: <Server className="w-5 h-5" />,
    techs: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "NestJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    ]
  },
  database: {
    title: t('hero.techs.title.database', 'Databases'),
    icon: <Database className="w-5 h-5" />,
    techs: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    ]
  },
  cloud: {
    title: t('hero.techs.title.cloud', 'Cloud & DevOps'),
    icon: <Cloud className="w-5 h-5" />,
    techs: [
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    ]
  },
  versionControl: {
    title: t('hero.techs.title.vc', 'Version Control'),
    icon: <GitBranch className="w-5 h-5" />,
    techs: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    ]
  },
  iot: {
    title: t('hero.techs.title.iot', 'IoT & AI'),
    icon: <Cpu className="w-5 h-5" />,
    techs: [
      { name: "IoT", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" },
      { name: t('hero.techs.item.predictive', 'Predictive Maintenance'), icon: <Brain className="w-6 h-6" /> },
    ]
  }
});

const TechModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const technologies = getTechnologies(t);
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
                      {t('hero.modal.subtitle', 'Explore my tech stack and expertise across different domains')}
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
                    {t('hero.modal.footer', 'Continuously learning and adapting to new technologies')}
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    {t('hero.modal.close', 'Got it!')}
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
      <section className="relative overflow-hidden pt-32 pb-40">
        {/* Premium Dark Mesh Gradient Background */}
        <div className="absolute inset-0 bg-gray-50 dark:bg-[#030712] transition-colors duration-300">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px] mix-blend-screen animate-float" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-[20%] left-[40%] w-[30%] h-[30%] rounded-full bg-pink-600/10 blur-[120px] mix-blend-screen animate-float" style={{ animationDelay: '4s' }} />

          {/* subtle grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute inset-0 bg-white dark:bg-[#030712] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 transition-colors duration-300" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Name centered at top */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 flex flex-col items-center justify-center">
                  <span className="gradient-text mb-2">SharmaStack</span>
                  <span className="text-2xl md:text-4xl text-gray-900 dark:text-white mt-2">
                    Web Development & AI Agency
                  </span>
                </h1>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                <motion.span whileHover={{ scale: 1.05 }} className="px-4 py-2 glass rounded-full text-sm font-medium flex items-center text-blue-300">
                  <MapPin className="w-4 h-4 mr-2" />
                  {t('hero.based')}
                </motion.span>
                <motion.span whileHover={{ scale: 1.05 }} className="px-4 py-2 glass rounded-full text-sm font-medium flex items-center text-green-300">
                  <Globe className="w-4 h-4 mr-2" />
                  {t('hero.target')}
                </motion.span>
                <motion.span whileHover={{ scale: 1.05 }} className="px-4 py-2 glass rounded-full text-sm font-medium flex items-center text-purple-300">
                  <Calendar className="w-4 h-4 mr-2" />
                  {t('status.available')}
                </motion.span>
              </div>

              {/* Subtitle */}
              {/* <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8">
                {t('hero.subtitle')}
              </p> */}

              {/* Description */}
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                <strong className="text-gray-900 dark:text-white font-semibold">SharmaStack</strong> is a leading web development and AI agency based in India offering MERN stack, Next.js and IoT solutions. 
                At <strong className="text-gray-900 dark:text-white font-semibold">SharmaStack</strong>, we transform ideas into scalable, high-performance digital products. 
                Whether you need a complex SaaS platform or intelligent automation, the <strong className="text-gray-900 dark:text-white font-semibold">SharmaStack</strong> team delivers excellence.
              </p>

              {/* CTA Buttons with Tech Stack Button */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/contact?tab=career"
                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-950 rounded-2xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]"
                  >
                    <span className="relative z-10 flex items-center">
                      {t('hero.cta.hire')}
                      <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <button
                    onClick={() => setIsTechModalOpen(true)}
                    className="inline-flex items-center px-8 py-4 glass text-gray-900 dark:text-white rounded-2xl font-semibold text-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300"
                  >
                    {t('hero.cta.techStack', 'View Tech Stack')}
                  </button>
                </motion.div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                {[
                  { value: '5+', label: t('hero.stats.experience', 'Years Experience') },
                  { value: '50+', label: t('hero.stats.projects', 'Projects') },
                  { value: '30+', label: t('hero.stats.clients', 'Happy Clients') },
                  { value: '100%', label: t('status.remote', 'Remote Ready') },
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
              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-wider font-semibold">{t('hero.trustedBy')}</p>
                <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale transition-all duration-500">
                  {['TechCorp', 'InnovateJS', 'CloudScale', 'NextGen AI'].map(name => (
                    <div key={name} className="text-xl font-bold text-gray-800 dark:text-gray-300 flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <Globe className="w-5 h-5 mr-2" />
                      {name}
                    </div>
                  ))}
                </div>
              </motion.div>
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