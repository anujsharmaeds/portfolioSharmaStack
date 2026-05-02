import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      'nav.home': 'Home',
      'nav.services': 'Services',
      'nav.projects': 'Projects',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'nav.blog': 'Blog',

      // Hero Section
      'hero.title': '',
      'hero.subtitle': 'MERN Stack • Next.js • NestJS • AI Integration',
      'hero.description': '5+ years crafting scalable web applications. Open to relocation in Europe.',
      'hero.cta.hire': 'Hire Me',
      'hero.cta.projects': 'View Projects',
      'hero.based': 'Based in Gurugram, Haryana, India',
      'hero.target': 'Target: European Tech Market',

      // Services
      'services.title': 'Services & Pricing',
      'services.subtitle': 'Professional packages tailored for your needs',
      'service.basic': 'Basic',
      'service.pro': 'Professional',
      'service.enterprise': 'Enterprise',
      'service.price.monthly': '/month',
      'service.price.project': '/project',
      'service.features': 'Features',
      'service.cta.select': 'Select Plan',
      'service.cta.contact': 'Contact for Custom',

      // Service Items
      'service.webdev': 'Web Development',
      'service.api': 'API Development',
      'service.ai': 'AI Integration',
      'service.iot': 'IoT Solutions',
      'service.consulting': 'Technical Consulting',
      'service.maintenance': 'Maintenance & Support',

      // Projects
      'projects.title': 'Featured Projects',
      'projects.subtitle': 'Real-world applications delivering business value',
      'project.view': 'View Case Study',
      'project.demo': 'Live Demo',
      'project.code': 'Source Code',
      'project.tech': 'Technologies Used',
      'project.role': 'My Role',

      // About
      'about.title': 'About Me',
      'about.subtitle': 'Senior Full Stack Developer focused on European markets',
      'about.experience': '5+ Years Experience',
      'about.projects': '50+ Projects',
      'about.clients': '30+ Happy Clients',
      'about.location': 'Pune, India → Europe',
      'about.languages': 'Languages',
      'about.availability': 'Available for new projects',

      // Contact
      'contact.title': 'Get In Touch',
      'contact.subtitle': 'Ready to discuss your project?',
      'contact.form.name': 'Your Name',
      'contact.form.email': 'Email Address',
      'contact.form.subject': 'Subject',
      'contact.form.message': 'Your Message',
      'contact.form.submit': 'Send Message',
      'contact.info.title': 'Contact Information',
      'contact.info.phone': 'Phone',
      'contact.info.email': 'Email',
      'contact.info.location': 'Location',
      'contact.info.linkedin': 'LinkedIn',
      'contact.info.github': 'GitHub',

      // Footer
      'footer.rights': 'All rights reserved.',
      'footer.privacy': 'Privacy Policy',
      'footer.terms': 'Terms of Service',

      // Theme
      'theme.dark': 'Dark',
      'theme.light': 'Light',
      'theme.system': 'System',

      // Language
      'lang.en': 'English',
      'lang.de': 'Deutsch',

      // CTA
      'cta.hire': 'Hire Me Now',
      'cta.contact': 'Contact Me',
      'cta.viewcv': 'View Resume',
      'cta.demo': 'Live Demo',

      // Status
      'status.available': 'Available for hire',
      'status.europe': 'Open to European relocation',
      'status.remote': 'Remote work available',
    }
  },
  de: {
    translation: {
      // Navigation
      'nav.home': 'Startseite',
      'nav.services': 'Dienstleistungen',
      'nav.projects': 'Projekte',
      'nav.about': 'Über Mich',
      'nav.contact': 'Kontakt',
      'nav.blog': 'Blog',

      // Hero Section
      'hero.title': 'Senior Full Stack Entwickler',
      'hero.subtitle': 'MERN Stack • Next.js • NestJS • KI-Integration',
      'hero.description': '5+ Jahre Erfahrung in skalierbaren Webanwendungen. Offen für Umsiedlung nach Europa.',
      'hero.cta.hire': 'Mich Beauftragen',
      'hero.cta.projects': 'Projekte Ansehen',
      'hero.based': 'Basis: Gurugram, Haryana, Indien',
      'hero.target': 'Ziel: Europäischer Technologiemarkt',

      // Services
      'services.title': 'Dienstleistungen & Preise',
      'services.subtitle': 'Professionelle Pakete für Ihre Bedürfnisse',
      'service.basic': 'Basis',
      'service.pro': 'Professional',
      'service.enterprise': 'Unternehmen',
      'service.price.monthly': '/Monat',
      'service.price.project': '/Projekt',
      'service.features': 'Funktionen',
      'service.cta.select': 'Plan Auswählen',
      'service.cta.contact': 'Anfrage für Individuell',

      // Service Items
      'service.webdev': 'Webentwicklung',
      'service.api': 'API-Entwicklung',
      'service.ai': 'KI-Integration',
      'service.iot': 'IoT-Lösungen',
      'service.consulting': 'Technische Beratung',
      'service.maintenance': 'Wartung & Support',

      // Projects
      'projects.title': 'Ausgewählte Projekte',
      'projects.subtitle': 'Praktische Anwendungen mit Geschäftswert',
      'project.view': 'Fallstudie Ansehen',
      'project.demo': 'Live Demo',
      'project.code': 'Quellcode',
      'project.tech': 'Verwendete Technologien',
      'project.role': 'Meine Rolle',

      // About
      'about.title': 'Über Mich',
      'about.subtitle': 'Senior Full Stack Entwickler mit Fokus auf europäische Märkte',
      'about.experience': '5+ Jahre Erfahrung',
      'about.projects': '50+ Projekte',
      'about.clients': '30+ Zufriedene Kunden',
      'about.location': 'Pune, Indien → Europa',
      'about.languages': 'Sprachen',
      'about.availability': 'Verfügbar für neue Projekte',

      // Contact
      'contact.title': 'Kontakt Aufnehmen',
      'contact.subtitle': 'Bereit, Ihr Projekt zu besprechen?',
      'contact.form.name': 'Ihr Name',
      'contact.form.email': 'E-Mail-Adresse',
      'contact.form.subject': 'Betreff',
      'contact.form.message': 'Ihre Nachricht',
      'contact.form.submit': 'Nachricht Senden',
      'contact.info.title': 'Kontaktinformationen',
      'contact.info.phone': 'Telefon',
      'contact.info.email': 'E-Mail',
      'contact.info.location': 'Standort',
      'contact.info.linkedin': 'LinkedIn',
      'contact.info.github': 'GitHub',

      // Footer
      'footer.rights': 'Alle Rechte vorbehalten.',
      'footer.privacy': 'Datenschutz',
      'footer.terms': 'Nutzungsbedingungen',

      // Theme
      'theme.dark': 'Dunkel',
      'theme.light': 'Hell',
      'theme.system': 'System',

      // Language
      'lang.en': 'Englisch',
      'lang.de': 'Deutsch',

      // CTA
      'cta.hire': 'Jetzt Beauftragen',
      'cta.contact': 'Kontaktieren',
      'cta.viewcv': 'Lebenslauf Ansehen',
      'cta.demo': 'Live Demo',

      // Status
      'status.available': 'Verfügbar für Aufträge',
      'status.europe': 'Offen für europäische Umsiedlung',
      'status.remote': 'Remote-Arbeit möglich',
    }
  },
  fr: {
    translation: {
      'nav.home': 'Accueil',
      'nav.services': 'Services',
      'nav.projects': 'Projets',
      'nav.about': 'À Propos',
      'nav.contact': 'Contact',
      'nav.blog': 'Blog',

      'hero.title': 'Développeur Full Stack Senior',
      'hero.subtitle': 'MERN Stack • Next.js • NestJS • IA',
      'hero.description': 'Plus de 4,5 ans dans la création d\'applications web évolutives. Ouvert à une relocalisation en Europe.',
      'hero.cta.hire': 'Embauchez-Moi',
      'hero.cta.projects': 'Voir les Projets',
      'hero.based': 'Basé à Gurugram, Haryana, Inde',
      'hero.target': 'Cible : Marché Tech Européen',

      'theme.dark': 'Sombre',
      'theme.light': 'Clair',
      'theme.system': 'Système',

      'lang.en': 'English',
      'lang.de': 'Deutsch',
      'lang.fr': 'Français',
      'lang.ko': '한국어',

      'cta.hire': 'Embauchez-Moi',
    }
  },
  ko: {
    translation: {
      'nav.home': '홈',
      'nav.services': '서비스',
      'nav.projects': '프로젝트',
      'nav.about': '소개',
      'nav.contact': '연락처',
      'nav.blog': '블로그',

      'hero.title': '시니어 풀스택 개발자',
      'hero.subtitle': 'MERN Stack • Next.js • NestJS • AI 통합',
      'hero.description': '5년 이상의 확장 가능한 웹 애플리케이션 개발. 유럽 이주 환영.',
      'hero.cta.hire': '채용하기',
      'hero.cta.projects': '프로젝트 보기',
      'hero.based': '인도 델리 거주',
      'hero.target': '목표: 유럽 기술 시장',

      'theme.dark': '다크',
      'theme.light': '라이트',
      'theme.system': '시스템',

      'lang.en': 'English',
      'lang.de': 'Deutsch',
      'lang.fr': 'Français',
      'lang.ko': '한국어',

      'cta.hire': '채용하기',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;