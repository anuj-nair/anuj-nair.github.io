import React, { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Inspiration {
  text: string;
  link: string;
}

interface Project {
  title: string;
  description: string;
  video?: string;
  image?: string;
  technologies: string[];
  features: string[];
  github?: string | null;
  demo?: string | null;
  status: string;
  inspiration?: Inspiration;
}

const Projects: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useScrollAnimation({
    elementRef: titleRef,
    threshold: 0.3,
    rootMargin: '0px 0px -20px 0px'
  });

  useScrollAnimation({
    elementRef: contentRef,
    threshold: 0.1,
    rootMargin: '0px 0px 50px 0px'
  });

  const projects: Project[] = [
    {
      title: 'PROJECT MNIST',
      description: "It's a fun project created to interact with the MNIST model. A web app with a canvas to draw numbers and then predict the number using the MNIST model. There is also a chart to show percentages given for each number.",
      video: '/assets/projects/Project_MNIST_Demo2.mp4',
      technologies: ['Python', 'Machine Learning', 'Flask', 'JavaScript', 'HTML5 Canvas'],
      features: [
        'Interactive drawing canvas',
        'Real-time digit prediction',
        'Confidence percentage display',
        'MNIST model integration'
      ],
      github: 'https://github.com/anuj-nair/mnist_proj',
      demo: 'http://anujnair.pythonanywhere.com/',
      status: 'Completed'
    },
    {
      title: 'AI SNAKE GAME',
      description: 'AI Snake Game Using Reinforcement Learning. Inspired from Python Engineer tutorials.',
      video: '/assets/projects/AI_Snake_Game.mp4',
      technologies: ['Python', 'Reinforcement Learning', 'PyTorch', 'Pygame'],
      features: [
        'Reinforcement learning agent',
        'Real-time game visualization',
        'Neural network training',
        'Performance metrics tracking'
      ],
      github: 'https://github.com/anuj-nair/learnRL/tree/main/AISnakeGame',
      demo: null,
      status: 'Completed',
      inspiration: {
        text: 'Python Engineer',
        link: 'https://www.youtube.com/playlist?list=PLqnslRFeH2UrDh7vUmJ60YrmWd64mTTKV'
      }
    },
    {
      title: 'A* Path Finding Algorithm',
      description: 'Implementation A* Algorithm and Visualization using PyGame. Inspired from Tech With Tim.',
      video: '/assets/projects/A-star_Algo_Demo.mp4',
      technologies: ['Python', 'PyGame', 'Algorithms', 'Visualization'],
      features: [
        'A* pathfinding implementation',
        'Interactive grid visualization',
        'Real-time algorithm execution',
        'Obstacle placement and removal'
      ],
      github: 'https://github.com/anuj-nair/A-star_Algorithm',
      demo: null,
      status: 'Completed',
      inspiration: {
        text: 'Tech With Tim',
        link: 'https://www.youtube.com/watch?v=JtiK0DOeI4A'
      }
    }
  ];

  return (
    <section id="Projects" className="projects-section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 ref={titleRef} className="section-title animate-out">Projects</h1>
          </div>
        </div>
        
        <div ref={contentRef} className="animate-out">
          <div className="row">
            {projects.map((project, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-12 mb-4">
                <div className="project-card">
                  <div className="project-media">
                    {project.video ? (
                      <video
                        className="project-video"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        onLoadStart={() => {
                          console.log('Video loading started:', project.video);
                        }}
                        onCanPlay={() => {
                          console.log('Video can play:', project.video);
                        }}
                        onError={(e) => {
                          console.error('Video failed to load:', project.video);
                          // Show fallback instead of hiding
                          const video = e.target as HTMLVideoElement;
                          const parent = video.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="project-placeholder">
                                <i class="fas fa-play-circle fa-3x"></i>
                                <p>Video Preview</p>
                                <small>Click to view project</small>
                              </div>
                            `;
                          }
                        }}
                      >
                        <source src={project.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="img-fluid"
                        loading="lazy"
                        onError={(e) => {
                          console.error('Image failed to load:', project.image);
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNGY0NmU1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                        }}
                      />
                    ) : (
                      <div className="project-placeholder">
                        <i className="fas fa-code fa-3x"></i>
                        <p>Project Media</p>
                      </div>
                    )}
                    <div className="project-overlay">
                      <div className="project-links">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                            aria-label="View GitHub Repository"
                          >
                            <i className="fab fa-github"></i>
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                            aria-label="View Live Demo"
                          >
                            <i className="fas fa-external-link-alt"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="project-content">
                    <div className="project-header">
                      <h3 className="project-title">{project.title}</h3>
                      <span className={`project-status status-${project.status.toLowerCase().replace(' ', '-')}`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <p className="project-description">{project.description}</p>

                    {project.inspiration && (
                      <div className="project-inspiration">
                        <p className="inspiration-text">
                          Inspired from{' '}
                          <a
                            href={project.inspiration.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inspiration-link"
                          >
                            {project.inspiration.text}
                          </a>
                        </p>
                      </div>
                    )}

                    <div className="project-features">
                      <h5>Key Features:</h5>
                      <ul>
                        {project.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="project-technologies">
                      <h5>Technologies:</h5>
                      <div className="tech-tags">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="project-actions">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-primary btn-sm me-2"
                        >
                          <i className="fab fa-github me-1"></i>
                          Code
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary btn-sm"
                        >
                          <i className="fas fa-external-link-alt me-1"></i>
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
