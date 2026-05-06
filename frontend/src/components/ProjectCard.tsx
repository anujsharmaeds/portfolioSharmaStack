import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  metrics: string;
  image: string;
  liveUrl: string;
  // codeUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  metrics,
  image,
  liveUrl,
  // codeUrl,
}) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-card overflow-hidden group hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:border-purple-500/40 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10 pointer-events-none" />
      {/* Project Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-6 relative z-20">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {description}
        </p>

        {/* Metrics Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium glass border-green-500/30 text-green-300">
            📈 {metrics}
          </span>
        </div>

        {/* Technologies */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('project.tech')}:
          </h4>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 glass text-blue-300 rounded-full text-xs font-medium border-blue-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex space-x-3">
            <motion.a
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 glass rounded-lg hover:bg-white/10 hover:text-purple-400 transition-colors"
              title={t('project.demo')}
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>

            {/* <motion.a
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 glass rounded-lg hover:bg-white/10 hover:text-purple-400 transition-colors"
              title={t('project.code')}
            >
              <Github className="w-5 h-5" />
            </motion.a> */}
          </div>

          <motion.button
            whileHover={{ x: 5 }}
            onClick={() => toast(t('common.comingSoon', 'Coming Soon!'), { icon: '🚀' })}
            className="flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            {t('project.view')}
            <ArrowRight className="ml-2 w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;