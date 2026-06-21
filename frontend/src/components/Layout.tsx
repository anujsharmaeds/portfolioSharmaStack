import Header from './Header';
import Footer from './Footer';
import AIChatBot from './AIChatBot';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white transition-colors duration-300 relative">
      {/* Subtle background glow for dark mode */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent opacity-0 dark:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
        <AIChatBot />
      </div>
    </div>
  );
};

export default Layout;