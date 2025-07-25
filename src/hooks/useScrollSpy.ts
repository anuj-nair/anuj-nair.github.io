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

    // Intersection Observer for Contact section as backup detection
    const contactElement = document.getElementById('Contact');
    let contactObserver: IntersectionObserver | null = null;

    if (contactElement) {
      contactObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target.id === 'Contact') {
              if (activeSection !== 'Contact') {
                if (process.env.NODE_ENV === 'development') {
                  console.log('Contact section intersecting, activating Contact');
                }
                setActiveSection('Contact');
              }
            }
          });
        },
        {
          threshold: 0.1, // Trigger when 10% of Contact is visible
          rootMargin: '0px 0px -50px 0px' // Account for navbar
        }
      );

      contactObserver.observe(contactElement);
    }
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + adjustedOffset;

      // SIMPLIFIED CONTACT LOGIC: Once Contact is active, keep it active until we scroll to another section
      if (activeSection === 'Contact') {
        // Check if we've scrolled back to any previous section
        for (let i = sectionIds.length - 2; i >= 0; i--) { // Skip Contact (last section)
          const sectionId = sectionIds[i];
          const element = document.getElementById(sectionId);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            const sectionBottom = offsetTop + offsetHeight;

            // If we're clearly in another section, switch to it
            if (scrollPosition >= offsetTop - 50 && scrollPosition < sectionBottom + 50) {
              if (process.env.NODE_ENV === 'development') {
                console.log('Switching from Contact to:', sectionId);
              }
              setActiveSection(sectionId);
              return;
            }
          }
        }
        // If we're still not in any other section, stay on Contact
        return;
      }

      // NORMAL SECTION DETECTION
      let currentSection = '';

      // Check if we're near the bottom - always activate Contact
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isNearBottom = window.scrollY + windowHeight >= documentHeight - 200;

      if (isNearBottom) {
        currentSection = 'Contact';
      } else {
        // Check sections in reverse order (last section gets priority)
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const sectionId = sectionIds[i];
          const element = document.getElementById(sectionId);
          if (element) {
            const { offsetTop } = element;

            // If we've scrolled past this section's start, it's active
            if (scrollPosition >= offsetTop - 100) {
              currentSection = sectionId;
              break;
            }
          }
        }
      }

      // If at the very top, use first section
      if (!currentSection && window.scrollY < 100) {
        currentSection = sectionIds[0] || '';
      }

      // Update active section if it changed
      if (currentSection && currentSection !== activeSection) {
        // if (process.env.NODE_ENV === 'development') {
        //   console.log('Setting active section to:', currentSection, 'at scroll position:', scrollPosition);
        // }
        setActiveSection(currentSection);
      }
    };

    // Initial check
    handleScroll();
    
    // Simple, responsive scroll listener
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

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', handleScroll);

      // Cleanup intersection observer
      if (contactObserver && contactElement) {
        contactObserver.unobserve(contactElement);
        contactObserver.disconnect();
      }
    };
  }, [sectionIds, offset, activeSection]);

  return activeSection;
};
