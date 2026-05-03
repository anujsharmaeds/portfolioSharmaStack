import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Filter, Search, Calendar, Users, Zap } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const projects = [
    {
      id: 1,
      title: t('projects.items.p1.title'),
      description: t('projects.items.p1.desc'),
      longDescription: t('projects.items.p1.longDesc'),
      technologies: ['Next.js', 'NestJS', 'MongoDB', 'AWS', 'OpenAI', 'Redis'],
      category: 'ai',
      metrics: t('projects.items.p1.metrics'),
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800',
      liveUrl: '#',
      codeUrl: '#',
      client: t('projects.items.p1.client', 'Adglobal360'),
      timeline: t('projects.items.p1.timeline', '6 months'),
      teamSize: t('projects.items.p1.teamSize', '8 members'),
      results: [
        t('projects.items.p1.r1', 'Reduced manual campaign management by 60%'),
        t('projects.items.p1.r2', 'Improved ad performance by 35%'),
        t('projects.items.p1.r3', 'Handled 50K+ daily data points'),
      ],
    },
    {
      id: 2,
      title: t('projects.items.p2.title'),
      description: t('projects.items.p2.desc'),
      longDescription: t('projects.items.p2.longDesc'),
      technologies: ['React.js', 'Node.js', 'Socket.IO', 'MongoDB', 'Docker', 'Redis'],
      category: 'scalable',
      metrics: t('projects.items.p2.metrics'),
      image: 'https://images.pexels.com/photos/6664179/pexels-photo-6664179.jpeg?auto=compress&cs=tinysrgb&w=800',
      liveUrl: '#',
      codeUrl: '#',
      client: t('projects.items.p2.client', 'Block-Star Pvt. Ltd.'),
      timeline: t('projects.items.p2.timeline', '4 months'),
      teamSize: t('projects.items.p2.teamSize', '6 members'),
      results: [
        t('projects.items.p2.r1', 'Supported 10K+ concurrent users'),
        t('projects.items.p2.r2', 'Reduced data latency by 20%'),
        t('projects.items.p2.r3', '30% improvement in API response times'),
      ],
    },
    {
      id: 3,
      title: t('projects.items.p3.title'),
      description: t('projects.items.p3.desc'),
      longDescription: t('projects.items.p3.longDesc'),
      technologies: ['React.js', 'AWS IoT', 'WebSocket', 'PostgreSQL', 'Chart.js', 'JWT'],
      category: 'iot',
      metrics: t('projects.items.p3.metrics'),
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800',
      liveUrl: '#',
      codeUrl: '#',
      client: t('projects.items.p3.client', 'Yash Technologies'),
      timeline: t('projects.items.p3.timeline', '3 months'),
      teamSize: t('projects.items.p3.teamSize', '4 members'),
      results: [
        t('projects.items.p3.r1', 'Monitored 5+ industrial sites'),
        t('projects.items.p3.r2', 'Reduced system latency by 40%'),
        t('projects.items.p3.r3', 'Improved data accuracy by 25%'),
      ],
    },
    {
      id: 4,
      title: t('projects.items.p4.title'),
      description: t('projects.items.p4.desc'),
      longDescription: t('projects.items.p4.longDesc'),
      technologies: ['React.js', 'Node.js', 'PostgreSQL', 'Stripe', 'SEO', 'PWA'],
      category: 'web',
      metrics: t('projects.items.p4.metrics'),
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800',
      liveUrl: '#',
      codeUrl: '#',
      client: t('projects.items.p4.client', 'Paryatan Guru Holidays'),
      timeline: t('projects.items.p4.timeline', '2 months'),
      teamSize: t('projects.items.p4.teamSize', '3 members'),
      results: [
        t('projects.items.p4.r1', '25% increase in mobile user engagement'),
        t('projects.items.p4.r2', '15% improvement in average session duration'),
        t('projects.items.p4.r3', 'Top 3 search ranking for key terms'),
      ],
    },
    {
      id: 5,
      title: t('projects.items.p5.title'),
      description: t('projects.items.p5.desc'),
      longDescription: t('projects.items.p5.longDesc'),
      technologies: ['Next.js', 'NestJS', 'Microservices', 'Redis', 'Kafka', 'Elasticsearch'],
      category: 'scalable',
      metrics: t('projects.items.p5.metrics'),
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800',
      liveUrl: '#',
      codeUrl: '#',
      client: t('projects.items.p5.client', 'Confidential'),
      timeline: t('projects.items.p5.timeline', '5 months'),
      teamSize: t('projects.items.p5.teamSize', '10 members'),
      results: [
        t('projects.items.p5.r1', '50% faster page load times'),
        t('projects.items.p5.r2', '99.9% system uptime'),
        t('projects.items.p5.r3', 'Scaled to 100K+ products'),
      ],
    },
    {
      id: 6,
      title: t('projects.items.p6.title'),
      description: t('projects.items.p6.desc'),
      longDescription: t('projects.items.p6.longDesc'),
      technologies: ['React.js', 'Python', 'TensorFlow', 'FastAPI', 'PostgreSQL', 'D3.js'],
      category: 'ai',
      metrics: t('projects.items.p6.metrics'),
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800',
      liveUrl: '#',
      codeUrl: '#',
      client: t('projects.items.p6.client', 'Healthcare Provider'),
      timeline: t('projects.items.p6.timeline', '4 months'),
      teamSize: t('projects.items.p6.teamSize', '5 members'),
      results: [
        t('projects.items.p6.r1', '95% accuracy in predictions'),
        t('projects.items.p6.r2', 'Reduced analysis time by 70%'),
        t('projects.items.p6.r3', 'Integrated 10+ data sources'),
      ],
    },
  ];

  const filters = [
    { id: 'all', label: t('projects.filter.all') },
    { id: 'ai', label: t('projects.filter.ai') },
    { id: 'iot', label: t('projects.filter.iot') },
    { id: 'scalable', label: t('projects.filter.scalable') },
    { id: 'web', label: t('projects.filter.web') },
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('projects.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            {t('projects.subtitle')}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {[
              { icon: <Calendar className="w-6 h-6" />, value: '50+', label: t('projects.stats.completed') },
              { icon: <Users className="w-6 h-6" />, value: '30+', label: t('projects.stats.clients') },
              { icon: <Zap className="w-6 h-6" />, value: '40%', label: t('projects.stats.performance') },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 mx-auto mb-4">
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              {/* Search */}
              <div className="flex-grow">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('projects.search.placeholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filter Button (Mobile) */}
              <button className="md:hidden flex items-center justify-center px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl">
                <Filter className="w-5 h-5 mr-2" />
                {t('projects.search.filterBtn')}
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeFilter === filter.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <div className="mb-8">
              <p className="text-gray-600 dark:text-gray-400">
                {t('projects.results.showing')} {filteredProjects.length} {t('projects.results.of')} {projects.length} {t('projects.results.projects')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {t('projects.empty.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('projects.empty.desc')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('projects.cta.title.1')} <span className="gradient-text">{t('projects.cta.title.2')}</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {t('projects.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all"
              >
                {t('projects.cta.start')}
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all"
              >
                {t('projects.cta.view')}
              </motion.a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;