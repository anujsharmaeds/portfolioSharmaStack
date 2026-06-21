import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Loader2, Instagram } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async () => {
    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

      const formData = new FormData();
      formData.append('name', 'Newsletter Subscriber');
      formData.append('email', email);
      formData.append('subject', 'Newsletter Subscription');
      formData.append('message', `New subscription request from ${email}`);
      formData.append('inquiryType', 'general');

      const response = await fetch(`${apiUrl}/api/contact/`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Successfully subscribed to the newsletter!');
        setEmail('');
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsSubscribing(false);
    }
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/services', label: t('nav.services') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const services = [
    t('service.webdev'),
    t('service.api'),
    t('service.ai'),
    t('service.iot'),
    t('service.consulting'),
  ];

  const socialLinks = [
    // {
    //   icon: <Linkedin className="w-5 h-5" />,
    //   href: 'https://linkedin.com/in/anujsharma007',
    //   label: 'LinkedIn'
    // },
    {
      icon: <Instagram className="w-5 h-5" />,
      href: 'https://www.instagram.com/sharmastack.official/',
      label: 'Instagram'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: 'mailto:contact@sharmastack.com',
      label: 'Email'
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">SS</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">sharmaStack</h2>
                {/* <p className="text-sm text-white">Senior Full Stack Developer</p> */}
              </div>
            </div>
            <p className="text-white mb-6">
              {t('footer.desc')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? "_self" : "_blank"}
                  rel={social.href.startsWith('mailto:') ? "" : "noopener noreferrer"}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-orange-600 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">{t('footer.services')}</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-white hover:text-white transition-colors cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">{t('contact.info.title')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                {/* <Phone className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" /> */}
                {/* <span className="text-white"></span> */}
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                <a
                  href="mailto:contact@sharmastack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white transition-colors"
                >
                  contact@sharmastack.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                <span className="text-white">
                  {t('hero.based', 'Gurugram, Haryana, India')}
                  <br />
                  <span className="text-sm">{t('status.europe')}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-white text-center mb-4">
              {t('footer.newsletter.title')}
            </h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                placeholder={t('footer.newsletter.placeholder')}
                className="flex-grow px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                disabled={isSubscribing}
              />
              <button
                onClick={handleSubscribe}
                disabled={isSubscribing}
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center min-w-[120px]"
              >
                {isSubscribing ? <Loader2 className="w-5 h-5 animate-spin" /> : t('footer.newsletter.btn')}
              </button>
            </div>
            <p className="text-center text-white text-sm mt-2">
              {t('footer.newsletter.desc')}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white text-sm">
              © {currentYear} sharmaStack. {t('footer.rights')}
            </p>

            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-white hover:text-white text-sm transition-colors"
              >
                {t('footer.privacy')}
              </a>
              <a
                href="#"
                className="text-white hover:text-white text-sm transition-colors"
              >
                {t('footer.terms')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer