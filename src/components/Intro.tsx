import React, { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Intro: React.FC = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useScrollAnimation({
    elementRef: nameRef,
    introClasses: ['animate__animated', 'animate__fadeIn'],
    threshold: 0.3
  });

  useScrollAnimation({
    elementRef: contentRef,
    threshold: 0.2
  });

  return (
    <section id="Intro" className="intro-section">
      <div className="container">
        <div className="row min-vh-100 d-flex align-items-center">
          <div className="col-lg-8 col-md-10">
            <div ref={contentRef} className="intro-content animate-out">
              <pre className="intro-greeting">Hello, My name is</pre>
              <h1
                ref={nameRef}
                className="intro-name"
              >
                Anuj Nair
              </h1>
              <p className="intro-skills">
                <span className='intro-skill'>Python</span><span className="skill-separator">|</span> 
                <span className='intro-skill'>AI/ML</span><span className="skill-separator">|</span> 
                <span className='intro-skill'>LLM</span><span className="skill-separator">|</span> 
                <span className='intro-skill'>Automation</span><span className="skill-separator">|</span> 
                <span className='intro-skill'>DevOps</span><span className="skill-separator">|</span> 
                <span className='intro-skill'>Cloud</span>
              </p>
              <p className="intro-description">
                Passionate about solving real-world problems with cutting-edge technology. 
                I build intelligent systems that make a difference.
              </p>
              <div className="intro-cta">
                <a href="#About" className="btn btn-primary btn-lg me-3">
                  Learn More
                </a>
                <a href="#Contact" className="btn btn-outline-light btn-lg">
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
