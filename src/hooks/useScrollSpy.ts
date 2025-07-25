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

      // Check if we're near the bottom of the page
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isNearBottom = windowHeight + window.scrollY >= documentHeight - 200;

      // If we're near the bottom, always highlight Contact (last section)
      if (isNearBottom) {
        const lastSection = sectionIds[sectionIds.length - 1];
        if (lastSection && lastSection !== activeSection) {
          if (process.env.NODE_ENV === 'development') {
            console.log('Near bottom, setting active section to:', lastSection);
          }
          setActiveSection(lastSection);
        }
        return;
      }

      // STICKY CONTACT LOGIC: If Contact is currently active, only change if we scroll back to a previous section
      if (activeSection === 'Contact') {
        // Check if we've scrolled back up to any previous section
        const contactElement = document.getElementById('Contact');
        if (contactElement) {
          const contactTop = contactElement.offsetTop;

          // If we're still at or past the Contact section, keep Contact active
          if (scrollPosition >= contactTop - 100) {
            if (process.env.NODE_ENV === 'development') {
              console.log('Keeping Contact active - still in Contact area');
            }
            return; // Keep Contact active
          }

          // We've scrolled back up, so check which previous section we're in
          if (process.env.NODE_ENV === 'development') {
            console.log('Scrolled back up from Contact, checking previous sections');
          }
        }
      }

      // Normal section detection for all sections
      let currentSection = '';

      // Go through sections in normal order to find the current section
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          const sectionBottom = offsetTop + offsetHeight;

          // Check if we're within this section (with some tolerance)
          if (scrollPosition >= offsetTop - 50 && scrollPosition < sectionBottom + 50) {
            currentSection = sectionId;
            break;
          }
        }
      }

      // If no current section found, find the closest one
      if (!currentSection) {
        let closestSection = '';
        let closestDistance = Infinity;

        for (const sectionId of sectionIds) {
          const element = document.getElementById(sectionId);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            const sectionCenter = offsetTop + offsetHeight / 2;
            const distance = Math.abs(scrollPosition - sectionCenter);

            if (distance < closestDistance) {
              closestDistance = distance;
              closestSection = sectionId;
            }
          }
        }
        currentSection = closestSection;
      }

      // If no section is found and we're at the top, use the first section
      if (!currentSection && window.scrollY < 100) {
        setActiveSection(sectionIds[0] || '');
        return;
      }

      // Only update if the section has changed
      if (currentSection && currentSection !== activeSection) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Setting active section to:', currentSection, 'at scroll position:', scrollPosition);
        }
        setActiveSection(currentSection);
      }
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
  }, [sectionIds, offset, activeSection]);

  return activeSection;
};
