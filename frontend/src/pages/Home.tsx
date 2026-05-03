import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Cpu, Database, Zap } from 'lucide-react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import ProjectCard from '../components/ProjectCard';
import Stats from '../components/Stats';
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

      <EuropeFocus />
    </div>
  );
};

export default Home;