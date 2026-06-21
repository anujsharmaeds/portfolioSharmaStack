import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
// import { Menu, X, Sun, Moon, Monitor } from 'lucide-react';
// import { useTheme } from '../providers/ThemeProvider';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  // const { theme, setTheme } = useTheme();

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/services', label: t('nav.services') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-[#030712]/90 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 text-gray-900 dark:text-white transition-all duration-300 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">

            {/* Logo Box */}
            <div className="w-10 h-10 bg-transparent rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src="/logo.png"
                alt="SharmaStack Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center leading-tight">
              <h1 className="text-lg font-semibold text-white">
                SharmaStack
              </h1>
              <p className="text-[10px] uppercase tracking-wider font-bold text-orange-500 dark:text-orange-300">
                {t('header.subtitle', 'Web Development • AI • IoT • FinTech • Scalable Systems • 5+ Years')}
              </p>
            </div>

          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-all duration-300 ${location.pathname === item.path
                  ? 'text-orange-600 dark:text-orange-400 font-bold'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Switcher */}
            {/* <div className="hidden md:flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setTheme('light')}
                className={`p-2 rounded-md transition-colors ${theme === 'light'
                  ? 'bg-white dark:bg-gray-700 shadow'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                title={t('theme.light')}
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-2 rounded-md transition-colors ${theme === 'dark'
                  ? 'bg-white dark:bg-gray-700 shadow'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                title={t('theme.dark')}
              >
                <Moon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme('system')}
                className={`p-2 rounded-md transition-colors ${theme === 'system'
                  ? 'bg-white dark:bg-gray-700 shadow'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                title={t('theme.system')}
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div> */}

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* CTA Button */}
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center px-6 py-2 bg-gradient-to-r from-orange-600 to-orange-600 hover:from-orange-700 hover:to-orange-700 text-white rounded-xl font-medium shadow-lg hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-300"
            >
              {t('cta.hire')}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {
          isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-800 pt-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-base font-medium py-2 ${location.pathname === item.path
                      ? 'text-orange-600 dark:text-orange-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400'
                      }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <Link
                    to="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                  >
                    {t('cta.hire')}
                  </Link>
                </div>
              </div>
            </div>
          )
        }
      </div >
    </header >
  );
};

export default Header;