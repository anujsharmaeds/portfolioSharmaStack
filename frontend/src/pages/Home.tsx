import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Cpu, Database, Eye, Palette, Zap } from 'lucide-react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import ProjectCard from '../components/ProjectCard';
import Stats from '../components/Stats';
import InnovationLab from '../components/InnovationLab';
import EuropeFocus from '../components/EuropeFocus';

const Home: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: t('service.webdev'),
      description: t('service.cat.web.desc'),
      features: [t('service.pkg.basic.f1'), t('service.pkg.basic.f2'), t('service.pkg.basic.f3')],
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: t('service.api'),
      description: t('service.cat.api.desc'),
      features: [t('service.pkg.pro.f4'), t('service.pkg.pro.f3'), t('service.pkg.basic.f1')],
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: t('service.ai'),
      description: t('service.cat.ai.desc'),
      features: [t('service.pkg.pro.f8'), t('service.pkg.pro.e1'), t('service.pkg.pro.e2')],
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('service.iot'),
      description: t('service.cat.cons.desc'),
      features: [t('service.pkg.ent.f6'), t('service.pkg.ent.f9'), t('service.pkg.ent.f10')],
    },
  ];

  const projects = [
    {
      title: t('projects.items.p1.title'),
      description: t('projects.items.p1.desc'),
      technologies: ['Next.js', 'NestJS', 'MongoDB', 'AWS'],
      metrics: t('projects.items.p1.metrics'),
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800',
      liveUrl: '#',
      codeUrl: '#',
    },
    {
      title: t('projects.items.p2.title'),
      description: t('projects.items.p2.desc'),
      technologies: ['React.js', 'Node.js', 'Socket.IO', 'MongoDB'],
      metrics: t('projects.items.p2.metrics'),
      image: 'https://images.pexels.com/photos/6664179/pexels-photo-6664179.jpeg?auto=compress&cs=tinysrgb&w=800',
      liveUrl: '#',
      codeUrl: '#',
    },
    {
      title: t('projects.items.p3.title'),
      description: t('projects.items.p3.desc'),
      technologies: ['React.js', 'AWS IoT', 'WebSocket', 'PostgreSQL'],
      metrics: t('projects.items.p3.metrics'),
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800',
      liveUrl: '#',
      codeUrl: '#',
    },
  ];

  return (
    <div>
      <Hero />

      <Stats />

      {/* Services Preview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('services.title')}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
          <div className="text-center mt-12">
            <motion.a
              href="/services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              {t('home.services.preview.btn')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </section>
      
      <InnovationLab />

      {/* Projects Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('projects.title')}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Identity Section (SEO Booster) */}
      <section className="py-24 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text inline-block">{t('home.about.title')}</h2>
              <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  {t('home.about.p1').split('SharmaStack').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && <strong className="text-gray-900 dark:text-white font-semibold">SharmaStack</strong>}
                    </React.Fragment>
                  ))}
                </p>
                
                <p>
                  {t('home.about.p2').split('SharmaStack').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && <strong className="text-gray-900 dark:text-white font-semibold">SharmaStack</strong>}
                    </React.Fragment>
                  ))}
                </p>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-10" />
                <div className="relative bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
                    {t('home.about.p3').split('SharmaStack').map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && <strong className="text-gray-900 dark:text-white font-semibold">SharmaStack</strong>}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                whileHover={{ y: -10 }}
                className="p-8 bg-blue-50/50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-800/50 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/20">
                  <Eye className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3 dark:text-white">Our Vision</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Empowering global businesses with elite technology solutions.</p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -10 }}
                className="p-8 bg-purple-50/50 dark:bg-purple-900/10 rounded-3xl border border-purple-100 dark:border-purple-800/50 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-500/20">
                  <Palette className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3 dark:text-white">Stunning Design</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Crafting high-end digital experiences that wow users.</p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -10 }}
                className="p-8 bg-green-50/50 dark:bg-green-900/10 rounded-3xl border border-green-100 dark:border-green-800/50 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-green-500/20">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3 dark:text-white">Robust Engineering</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Building scalable, secure, and future-ready architectures.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <EuropeFocus />
    </div>
  );
};

export default Home;