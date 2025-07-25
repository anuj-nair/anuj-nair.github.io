import React from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';

const Navbar: React.FC = () => {
  const sections = ['Intro', 'About', 'Skills', 'Experience', 'Projects', 'Services', 'Contact'];
  const activeSection = useScrollSpy({ sectionIds: sections, offset: 100 });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    // Close mobile menu if open
    const navbarCollapse = document.getElementById('navbarDark');
    const navbarToggler = document.querySelector('.navbar-toggler') as HTMLButtonElement;
    
    if (navbarCollapse && navbarToggler && !navbarToggler.classList.contains('collapsed')) {
      navbarToggler.click();
    }
    
    // Scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="navbar navbar-expand-xl navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="#Intro"
          onClick={(e) => handleNavClick(e, 'Intro')}
        >
          <img src="/assets/icons/ar_logo.svg" width="60" alt="AR logo" />
        </a>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarDark"
          aria-controls="navbarDark"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarDark">
          <ul className="navbar-nav me-auto mb-2 mb-xl-0">
            <li className="nav-item">
              <a 
                className={`nav-link ${activeSection === 'About' ? 'active' : ''}`} 
                href="#About"
                onClick={(e) => handleNavClick(e, 'About')}
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeSection === 'Skills' ? 'active' : ''}`} 
                href="#Skills"
                onClick={(e) => handleNavClick(e, 'Skills')}
              >
                Skills
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeSection === 'Experience' ? 'active' : ''}`}
                href="#Experience"
                onClick={(e) => handleNavClick(e, 'Experience')}
              >
                Experience 
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeSection === 'Projects' ? 'active' : ''}`}
                href="#Projects"
                onClick={(e) => handleNavClick(e, 'Projects')}
              >
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeSection === 'Services' ? 'active' : ''}`}
                href="#Services"
                onClick={(e) => handleNavClick(e, 'Services')}
              >
                Services
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeSection === 'Contact' ? 'active' : ''}`}
                href="#Contact"
                onClick={(e) => handleNavClick(e, 'Contact')}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
