import { useEffect, RefObject } from 'react';

interface UseScrollAnimationProps {
  elementRef: RefObject<HTMLElement>;
  introClasses?: string[];
  outroClasses?: string[];
  threshold?: number;
  rootMargin?: string;
}

export const useScrollAnimation = ({ 
  elementRef, 
  introClasses = [], 
  outroClasses = [],
  threshold = 0.1,
  rootMargin = '0px 0px -100px 0px'
}: UseScrollAnimationProps) => {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is in viewport
            entry.target.classList.add('animate-in');
            entry.target.classList.remove('animate-out');
            
            // Remove outro classes
            outroClasses.forEach(className => {
              entry.target.classList.remove(className);
            });
            
            // Add intro classes
            introClasses.forEach(className => {
              entry.target.classList.add(className);
            });
          } else {
            // Element is not in viewport
            entry.target.classList.add('animate-out');
            entry.target.classList.remove('animate-in');
            
            // Remove intro classes
            introClasses.forEach(className => {
              entry.target.classList.remove(className);
            });
            
            // Add outro classes
            outroClasses.forEach(className => {
              entry.target.classList.add(className);
            });
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, introClasses, outroClasses, threshold, rootMargin]);
};
