import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, MapPin, Globe, X, Code, Server, Database, Cloud, Cpu, Brain, GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScroll, useSpring } from 'framer-motion';

// Technology data with icons and categories
const getTechnologies = (t: any) => ({
  frontend: {
    title: t('hero.techs.title.frontend', 'Frontend & UI'),
    icon: <Code className="w-5 h-5" />,
    techs: [
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
      { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    ]
  },
  backend: {
    title: t('hero.techs.title.backend', 'Backend & APIs'),
    icon: <Server className="w-5 h-5" />,
    techs: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "NestJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg" },
    ]
  },
  database: {
    title: t('hero.techs.title.database', 'Databases'),
    icon: <Database className="w-5 h-5" />,
    techs: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "DynamoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dynamodb/dynamodb-original.svg" },
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    ]
  },
  cloud: {
    title: t('hero.techs.title.cloud', 'Cloud & DevOps'),
    icon: <Cloud className="w-5 h-5" />,
    techs: [
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "GCP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
    ]
  },
  versionControl: {
    title: t('hero.techs.title.vc', 'Version Control'),
    icon: <GitBranch className="w-5 h-5" />,
    techs: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "GitLab", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" },
    ]
  },
  ai: {
    title: t('hero.techs.title.iot', 'AI & Machine Learning'),
    icon: <Cpu className="w-5 h-5" />,
    techs: [
      { name: "OpenAI", icon: "https://static.cdnlogo.com/logos/o/38/openai.svg" },
      { name: "LangChain", icon: <Brain className="w-6 h-6" /> },
      { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
      { name: "IoT", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" },
    ]
  }
});

const TechModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const technologies = getTechnologies(t);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

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
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4 py-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-[#0f172a] rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.2)] border border-gray-200 dark:border-orange-500/20 flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-600 bg-clip-text text-transparent">
                    {t('hero.cta.techStack')}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {t('hero.modal.subtitle')}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300 hover:rotate-90"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 overflow-y-auto flex-grow custom-scrollbar">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-12"
                >
                  {Object.entries(technologies).map(([key, category]) => (
                    <div key={key}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl shadow-inner">
                          {category.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
                          {category.title}
                        </h3>
                        <div className="h-px flex-grow bg-gradient-to-r from-orange-500/20 to-transparent ml-4" />
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {category.techs.map((tech) => (
                          <motion.div
                            key={tech.name}
                            variants={itemVariants}
                            whileHover={{ y: -5, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative bg-white dark:bg-gray-800/40 hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-50 dark:hover:from-orange-900/20 dark:hover:to-orange-900/20 border border-gray-100 dark:border-gray-700/50 rounded-2xl p-5 flex flex-col items-center justify-center text-center transition-all duration-300 shadow-sm hover:shadow-xl hover:border-orange-500/30"
                          >
                            <div className="w-12 h-12 mb-4 relative flex items-center justify-center">
                              {typeof tech.icon === 'string' ? (
                                <img
                                  src={tech.icon}
                                  alt={tech.name}
                                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                  loading="lazy"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    const fallback = document.createElement('div');
                                    fallback.className = "w-full h-full flex items-center justify-center bg-gradient-to-r from-orange-600 to-orange-600 rounded-xl text-white font-bold text-xl shadow-lg";
                                    fallback.textContent = tech.name.charAt(0);
                                    target.parentNode?.appendChild(fallback);
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:text-orange-500 transition-colors duration-300">
                                  {tech.icon}
                                </div>
                              )}
                            </div>
                            <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 text-sm tracking-wide">
                              {tech.name}
                            </span>

                            {/* Animated highlight */}
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-gray-50 dark:bg-gray-900/80 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse" />
                  {t('hero.modal.footer')}
                </p>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-10 py-3 bg-gradient-to-r from-orange-600 to-orange-600 text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300 transform active:scale-95"
                >
                  {t('hero.modal.close')}
                </button>
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

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center bg-white dark:bg-gray-900">
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 to-orange-600 z-[60] origin-left"
          style={{ scaleX }}
        />
        {/* Premium Dark Mesh Gradient Background */}
        <div className="absolute inset-0 bg-gray-50 dark:bg-[#030712] transition-colors duration-300">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-600/20 blur-[120px] mix-blend-screen animate-float" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-600/20 blur-[120px] mix-blend-screen animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-[20%] left-[40%] w-[30%] h-[30%] rounded-full bg-orange-600/10 blur-[120px] mix-blend-screen animate-float" style={{ animationDelay: '4s' }} />

          {/* subtle grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute inset-0 bg-white dark:bg-[#030712] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 transition-colors duration-300" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center justify-center mb-12"
            >
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
                <span className="gradient-text">SharmaStack</span>
              </h1>
              <span className="text-2xl md:text-4xl text-gray-900 dark:text-white mt-2 font-bold tracking-tight">
                {t('hero.agencyTitle')}
              </span>

              <div className="mt-8 relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-orange-600 rounded-full blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative px-6 py-2 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md rounded-full border border-gray-200 dark:border-gray-800 shadow-xl">
                  <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 font-medium tracking-wide">
                    {t('hero.subtitle', 'Web Development • AI • IoT • FinTech • Scalable Systems • 5+ Years')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <motion.span whileHover={{ scale: 1.05 }} className="px-4 py-2 glass rounded-full text-sm font-medium flex items-center text-orange-300">
                <MapPin className="w-4 h-4 mr-2" />
                {t('hero.based')}
              </motion.span>
              <motion.span whileHover={{ scale: 1.05 }} className="px-4 py-2 glass rounded-full text-sm font-medium flex items-center text-orange-300">
                <Globe className="w-4 h-4 mr-2" />
                {t('hero.target')}
              </motion.span>
              <motion.span whileHover={{ scale: 1.05 }} className="px-4 py-2 glass rounded-full text-sm font-medium flex items-center text-orange-400">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 relative">
                  <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-75" />
                </div>
                {t('status.available')}
              </motion.span>
            </div>

            {/* Subtitle */}
            {/* <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8">
                {t('hero.subtitle')}
              </p> */}

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              {t('hero.description').split('SharmaStack').map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && <strong className="text-gray-900 dark:text-white font-semibold">SharmaStack</strong>}
                </React.Fragment>
              ))}
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
                <a
                  href="#innovation-lab"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600/20 to-orange-600/20 border border-orange-500/30 text-gray-900 dark:text-white rounded-2xl font-semibold text-lg hover:from-orange-600/30 hover:to-orange-600/30 transition-all duration-300 backdrop-blur-sm shadow-lg shadow-orange-500/10"
                >
                  <Cpu className="mr-3 w-5 h-5 text-orange-400 animate-pulse" />
                  {t('hero.cta.lab', 'Innovation Lab')}
                </a>
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
                  <div key={name} className="text-xl font-bold text-gray-800 dark:text-gray-300 flex items-center hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    <Globe className="w-5 h-5 mr-2" />
                    {name}
                  </div>
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