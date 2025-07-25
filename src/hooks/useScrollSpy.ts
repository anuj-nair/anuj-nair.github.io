import { useEffect, useState } from 'react';

interface UseScrollSpyProps {
  sectionIds: string[];
  offset?: number;
}

export const useScrollSpy = ({ sectionIds, offset = 100 }: UseScrollSpyProps) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    // Adjust offset for mobile devices
    const isMobile = window.innerWidth <= 768;
    const adjustedOffset = isMobile ? offset + 50 : offset;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + adjustedOffset;
      
      // Find the current section
      let currentSection = '';
      
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = sectionId;
            break;
          }
        }
      }
      
      // If no section is found, check if we're at the top
      if (!currentSection && window.scrollY < 100) {
        currentSection = sectionIds[0] || '';
      }
      
      // If still no section and we're at the bottom, use the last section
      if (!currentSection && window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        currentSection = sectionIds[sectionIds.length - 1] || '';
      }
      
      setActiveSection(currentSection);
    };

    // Initial check
    handleScroll();
    
    // Add scroll listener with throttling
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sectionIds, offset]);

  return activeSection;
};
