import Header from './Header';
import Footer from './Footer';
import AIChatBot from './AIChatBot';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
      <AIChatBot />
    </div>
  );
};

export default Layout;