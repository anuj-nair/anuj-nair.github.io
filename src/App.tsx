import React, { useEffect, useState } from 'react';
import './App.css';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Intro from './components/Intro';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';

// Declare global types for external libraries
declare global {
  interface Window {
    AOS: any;
    bootstrap: any;
  }
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Initialize AOS (Animate On Scroll)
    const initAOS = () => {
      if (window.AOS) {
        window.AOS.init({
          duration: isMobile ? 400 : 600,
          easing: 'ease-out',
          once: true,
          offset: isMobile ? 50 : 100,
          disable: window.innerWidth < 480 ? true : false
        });
      }
    };

    // Simulate loading time
    const loadingDuration = isMobile ? 2500 : 4000;
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Initialize AOS after loading
      setTimeout(initAOS, 100);
    }, loadingDuration);

    // Initialize EmailJS
    const initEmailJS = async () => {
      try {
        const emailjs = await import('@emailjs/browser');
        const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'eESzSv1nFjpW9AxNt';
        emailjs.init(publicKey);
      } catch (error) {
        console.log('EmailJS not available:', error);
      }
    };

    initEmailJS();

    // Cleanup
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  // Add scroll spy functionality
  useEffect(() => {
    if (!isLoading) {
      // Enable Bootstrap scroll spy
      const scrollSpyElement = document.body;
      if (scrollSpyElement && window.bootstrap) {
        new window.bootstrap.ScrollSpy(scrollSpyElement, {
          target: '#navbar',
          offset: 100
        });
      }
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Navbar />
      <Intro />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Services />
      <Contact />
    </div>
  );
}

export default App;
