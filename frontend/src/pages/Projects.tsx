import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Github, Filter, Search, Calendar, Users, Zap } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const projects = [
    {
      id: 1,
      title: 'Publish Ads And Keep The Track',
      description: 'AI-powered analytics platform for enterprise clients with automated budget allocation',
      longDescription: 'Led development of enterprise-scale media analytics platform using Next.js and NestJS. Implemented AI-driven budget optimization system using prompt engineering and data analysis.',
      technologies: ['Next.js', 'NestJS', 'MongoDB', 'AWS', 'OpenAI', 'Redis'],
      category: 'ai',
      metrics: '60% reduction in manual effort',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800',
      liveUrl: '#',
      codeUrl: '#',
      client: 'Adglobal360',
      timeline: '6 months',
      teamSize: '8 members',
      results: [
        'Reduced manual campaign management by 60%',
        'Improved ad performance by 35%',
        'Handled 50K+ daily data points',
      ],
    },
    {
      id: 2,
      title: 'Real-time Betting Platform',
      description: 'Scalable gambling platform handling 10K+ concurrent users with live event streaming',
      longDescription: 'Engineered real-time casino betting platforms with React.js and Node.js. Implemented Socket.IO for live event streaming and optimized MongoDB for high-performance transactions.',
      technologies: ['React.js', 'Node.js', 'Socket.IO', 'MongoDB', 'Docker', 'Redis'],
      category: 'scalable',
      metrics: '30% faster transaction processing',
      image: 'https://images.pexels.com/photos/6664179/pexels-photo-6664179.jpeg?auto=compress&cs=tinysrgb&w=800',
      liveUrl: '#',
      codeUrl: '#',
      client: 'Block-Star Pvt. Ltd.',
      timeline: '4 months',
      teamSize: '6 members',
      results: [
        'Supported 10K+ concurrent users',
        'Reduced data latency by 20%',
        '30% improvement in API response times',
      ],
    },
    {
      id: 3,
      title: 'Industrial IoT Dashboard',
      description: 'Real-time monitoring system for manufacturing clients across multiple industrial sites',
      longDescription: 'Developed real-time IoT monitoring dashboards for industrial clients including Holcim and Sierratek. Built secure RESTful APIs with JWT authentication and implemented AWS IoT Core.',
      technologies: ['React.js', 'AWS IoT', 'WebSocket', 'PostgreSQL', 'Chart.js', 'JWT'],
      category: 'iot',
      metrics: '40% latency reduction',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800',
      liveUrl: '#',
      codeUrl: '#',
      client: 'Yash Technologies',
      timeline: '3 months',
      teamSize: '4 members',
      results: [
        'Monitored 5+ industrial sites',
        'Reduced system latency by 40%',
        'Improved data accuracy by 25%',
      ],
    },
    {
      id: 4,
      title: 'Tourism Portal',
      description: 'SEO-optimized tourism portal with responsive design and booking system',
      longDescription: 'Designed and developed SEO-optimized tourism portal using React.js and Node.js. Implemented responsive design principles and optimized website performance.',
      technologies: ['React.js', 'Node.js', 'PostgreSQL', 'Stripe', 'SEO', 'PWA'],
      category: 'web',
      metrics: '25% increase in mobile engagement',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800',
      liveUrl: '#',
      codeUrl: '#',
      client: 'Paryatan Guru Holidays',
      timeline: '2 months',
      teamSize: '3 members',
      results: [
        '25% increase in mobile user engagement',
        '15% improvement in average session duration',
        'Top 3 search ranking for key terms',
      ],
    },
    {
      id: 5,
      title: 'E-commerce Platform',
      description: 'Full-featured e-commerce platform with inventory management and analytics',
      longDescription: 'Built scalable e-commerce platform with microservices architecture. Implemented real-time inventory management and advanced analytics dashboard.',
      technologies: ['Next.js', 'NestJS', 'Microservices', 'Redis', 'Kafka', 'Elasticsearch'],
      category: 'scalable',
      metrics: '50% faster page loads',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800',
      liveUrl: '#',
      codeUrl: '#',
      client: 'Confidential',
      timeline: '5 months',
      teamSize: '10 members',
      results: [
        '50% faster page load times',
        '99.9% system uptime',
        'Scaled to 100K+ products',
      ],
    },
    {
      id: 6,
      title: 'Healthcare Analytics Dashboard',
      description: 'AI-powered healthcare analytics with predictive modeling and data visualization',
      longDescription: 'Developed healthcare analytics platform with predictive modeling capabilities. Integrated machine learning algorithms for patient outcome predictions.',
      technologies: ['React.js', 'Python', 'TensorFlow', 'FastAPI', 'PostgreSQL', 'D3.js'],
      category: 'ai',
      metrics: '95% prediction accuracy',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800',
      liveUrl: '#',
      codeUrl: '#',
      client: 'Healthcare Provider',
      timeline: '4 months',
      teamSize: '5 members',
      results: [
        '95% accuracy in predictions',
        'Reduced analysis time by 70%',
        'Integrated 10+ data sources',
      ],
    },
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI & Machine Learning' },
    { id: 'iot', label: 'IoT Solutions' },
    { id: 'scalable', label: 'Scalable Platforms' },
    { id: 'web', label: 'Web Applications' },
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
              { icon: <Calendar className="w-6 h-6" />, value: '50+', label: 'Projects Completed' },
              { icon: <Users className="w-6 h-6" />, value: '30+', label: 'Happy Clients' },
              { icon: <Zap className="w-6 h-6" />, value: '40%', label: 'Avg. Performance Gain' },
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
                    placeholder="Search projects by name, tech, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Filter Button (Mobile) */}
              <button className="md:hidden flex items-center justify-center px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl">
                <Filter className="w-5 h-5 mr-2" />
                Filter
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeFilter === filter.id
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
                Showing {filteredProjects.length} of {projects.length} projects
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
                No projects found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria
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
              Have a <span className="gradient-text">Project in Mind</span>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Let's collaborate to build something amazing. Share your ideas and let's make them reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all"
              >
                Start a Project
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all"
              >
                View Case Studies
              </motion.a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;