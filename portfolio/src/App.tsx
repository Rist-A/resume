import { useState, useCallback, useRef } from 'react'
import type {ReactNode} from 'react'
import './App.css'
import StylishDock from "./Components/MagicDock";
import { Home as HomeIcon, Folder as Briefcase, User as User, Send as Mail, Sun, Moon, X } from "lucide-react";
import { useTheme } from './Context/ThemeContext';
import Hero from './Components/Hero.tsx'
import VenomBeam from "./UI/venom-beam.tsx";
import { FlowingLogos } from "./UI/flowing-logos.tsx";
import Skills from "./Components/Skills.tsx"
import Projects from './Components/Projects.tsx';
import Achievement from './Components/Achievement.tsx';
import Footer from './Components/Footer.tsx';
import DetailProject from './Components/DetailProject.tsx';
import Profile from './Components/Profile.tsx';
import Contact from './Components/Contact.tsx';

type ActiveComponent = 'home' | 'projects' | 'about' | 'contact' | null;

// Define props interface for Modal component
interface ModalProps {
  children: ReactNode;
  widthClass?: string;
  onClose: () => void;
}

// Move Modal component outside of App to avoid recreation
const Modal = ({ children, widthClass = "max-w-4xl", onClose }: ModalProps) => {
  const modalContainerClass = "fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm"; // Increased z-index to 100
  const scrollContainerClass = "overflow-y-auto h-full scrollbar-hide";

  return (
    <div className={modalContainerClass} onClick={onClose}>
      <div 
        className={`relative ${widthClass} w-full mx-4 max-h-[90vh] overflow-hidden rounded-2xl bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border border-white/20 dark:border-gray-700/30 shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md hover:bg-white dark:hover:bg-gray-800 transition-colors border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
        >
          <X size={20} className="text-gray-700 dark:text-gray-300" />
        </button>
        <div className={scrollContainerClass}>
          {children}
        </div>
      </div>
    </div>
  );
};

function App() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>(null);
  
  // Create ref for projects section
  const projectsSectionRef = useRef<HTMLDivElement>(null);

  const handleNavigation = (component: ActiveComponent) => {
    setActiveComponent(component);
  };

  // Use useCallback to memoize the close function
  const closeComponent = useCallback(() => {
    setActiveComponent(null);
  }, []);

  // Function to reload the page when Home is clicked
  const handleHomeClick = () => {
    window.location.reload();
  };

  // Function to scroll to projects section
  const scrollToProjects = () => {
    if (projectsSectionRef.current) {
      projectsSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Function to handle CV download
const handleDownloadCV = () => {
  const cvUrl = '/cv/CV Resume-wubrist.pdf';
  
  // Create a temporary anchor element to trigger download
  const link = document.createElement('a');
  link.href = cvUrl;
  link.download = 'Wubrist_Alemu_CV.pdf'; // This will be the downloaded filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  const dockItems = [
    {
      id: 1,
      icon: (
        <div className={`rounded-full p-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <HomeIcon size={24} className={isDarkMode ? 'text-white' : 'text-gray-800'} />
        </div>
      ),
      label: "Home",
      onClick: handleHomeClick, // Now reloads the page
    },
    {
      id: 2,
      icon: (
        <div className={`rounded-full p-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <Briefcase size={24} className={isDarkMode ? 'text-white' : 'text-gray-800'} />
        </div>
      ),
      label: "Projects",
      onClick: () => handleNavigation('projects'),
    },
    {
      id: 3,
      icon: (
        <div className={`rounded-full p-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <User size={24} className={isDarkMode ? 'text-white' : 'text-gray-800'} />
        </div>
      ),
      label: "About",
      onClick: () => handleNavigation('about'),
    },
    {
      id: 4,
      icon: (
        <div className={`rounded-full p-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <Mail size={24} className={isDarkMode ? 'text-white' : 'text-gray-800'} />
        </div>
      ),
      label: "Contact",
      onClick: () => handleNavigation('contact'),
    },
    { 
      id: 5,
      icon: (
        <div className={`rounded-full p-2 ${isDarkMode ? 'bg-yellow-100' : 'bg-gray-800'}`}>
          {isDarkMode ? (
            <Sun size={24} className="text-yellow-600" />
          ) : (
            <Moon size={24} className="text-white" />
          )}
        </div>
      ),
      label: isDarkMode ? "Light Mode" : "Dark Mode",
      onClick: toggleTheme,
    },
  ];

  // Render active component
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'home':
        return (
          <Modal widthClass="max-w-4xl" onClose={closeComponent}>
            <Hero onViewWorkClick={scrollToProjects} onDownloadCV={handleDownloadCV} />
          </Modal>
        );
      case 'projects':
        return (
          <Modal widthClass="max-w-7xl" onClose={closeComponent}>
            <DetailProject />
          </Modal>
        );
      case 'about':
        return (
          <Modal widthClass="max-w-7xl" onClose={closeComponent}>
            <Profile  />
          </Modal>
        );
      case 'contact':
        return (
          <Modal widthClass="max-w-4xl" onClose={closeComponent}>
            <Contact />
          </Modal>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Background - Moved to cover entire app */}
      <div className="fixed inset-0 -z-10">
        <VenomBeam />
      </div>

      {/* Foreground (Dock + Hero + others) */}
      <div className="relative z-20 flex flex-col items-center min-h-screen scrollbar-hide">
        {/* Dock - Conditionally rendered based on activeComponent */}
        {!activeComponent && (
          <div className="fixed top-9 z-50"> {/* Added z-50 to dock */}
            <StylishDock
              items={dockItems}
              distance={150}
              variant="tooltip"
              magnification={70}
              baseItemSize={53}
              panelHeight={70}
              className="mx-auto"
            />
          </div>
        )}

        {/* Hero */}
        <main className="flex flex-col items-center justify-center flex-1 w-full text-center px-2 scrollbar-hide">
          <Hero onViewWorkClick={scrollToProjects} onDownloadCV={handleDownloadCV} />
        </main>
      </div>

      {/* Main Content Sections - Conditionally rendered based on activeComponent */}
      {!activeComponent && (
        <div className="relative z-10 scrollbar-hide">
          <Skills />
          {/* Add ref to Projects section */}
          <div ref={projectsSectionRef}>
            <Projects />
          </div>
          {/* Reduced gap container */}
          <div className="mb-0 pb-0 -mt-4"> {/* Negative margin to pull footer closer */}
            <Achievement />
          </div>
          <Footer />
        </div>
      )}

      {/* Overlay Components - These will now appear over the VenomBeam background */}
      {renderActiveComponent()}
    </>
  );
}

export default App;