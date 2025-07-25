import React, { useRef, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Experience: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('all');
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [expandedTech, setExpandedTech] = useState<Set<number>>(new Set());
  const [animatingCards, setAnimatingCards] = useState<Set<number>>(new Set());
  const [animationStates, setAnimationStates] = useState<Map<number, 'expanding' | 'collapsing'>>(new Map());

  const toggleCard = (index: number) => {
    const newExpandedCards = new Set(expandedCards);
    const newAnimatingCards = new Set(animatingCards);
    const newAnimationStates = new Map(animationStates);

    if (newExpandedCards.has(index)) {
      // Start collapse animation
      newAnimatingCards.add(index);
      newAnimationStates.set(index, 'collapsing');
      setAnimatingCards(newAnimatingCards);
      setAnimationStates(newAnimationStates);

      // Remove from expanded after animation
      setTimeout(() => {
        const finalExpandedCards = new Set(expandedCards);
        const finalAnimatingCards = new Set(animatingCards);
        const finalAnimationStates = new Map(animationStates);

        finalExpandedCards.delete(index);
        finalAnimatingCards.delete(index);
        finalAnimationStates.delete(index);

        setExpandedCards(finalExpandedCards);
        setAnimatingCards(finalAnimatingCards);
        setAnimationStates(finalAnimationStates);
      }, 400);
    } else {
      // Start expand animation
      newExpandedCards.add(index);
      newAnimatingCards.add(index);
      newAnimationStates.set(index, 'expanding');

      setExpandedCards(newExpandedCards);
      setAnimatingCards(newAnimatingCards);
      setAnimationStates(newAnimationStates);

      // Remove animation state after animation
      setTimeout(() => {
        const finalAnimatingCards = new Set(animatingCards);
        const finalAnimationStates = new Map(animationStates);

        finalAnimatingCards.delete(index);
        finalAnimationStates.delete(index);

        setAnimatingCards(finalAnimatingCards);
        setAnimationStates(finalAnimationStates);
      }, 400);
    }
  };

  const toggleTech = (index: number) => {
    const newExpandedTech = new Set(expandedTech);
    if (newExpandedTech.has(index)) {
      newExpandedTech.delete(index);
    } else {
      newExpandedTech.add(index);
    }
    setExpandedTech(newExpandedTech);
  };

  useScrollAnimation({
    elementRef: titleRef,
    threshold: 0.2
  });

  useScrollAnimation({
    elementRef: contentRef,
    threshold: 0.1
  });

  const experiences = [
    {
      id: 1,
      title: 'AI Consultant',
      company: 'StikkmanUX',
      period: 'Jun 2025 - Jul 2025',
      duration: '2 months',
      location: 'Remote',
      type: 'Consulting',
      category: 'ai',
      status: 'current',
      description: [
        'Identified high-impact AI opportunities, from AI-driven automation to machine learning models, creating marketable solutions that drove both efficiency and revenue for clients.',
        'Led the OpenAI integration to build a Brand Guideline Assistant, enhancing design workflows with AI-powered suggestions.',
        'Created APIs for color scheme and typeface recommendations, alongside AI-driven image generation and logo augmentation.',
        'Deployed and managed low-code Lead Generation Automation Workflow using N8N and OpenAI, streamlining business processes and increasing efficiency.',
        'Built internal automation workflows using N8N and Ollama, improving operational tasks and simplifying processes for internal teams.'
      ],
      technologies: ['OpenAI', 'N8N', 'Ollama', 'Python', 'API Development', 'Automation'],
      achievements: [
        'Built AI-powered automation workflows',
      ]
    },
    {
      id: 2,
      title: 'Working Student: Automation and Data Analysis',
      company: 'Infineon Technologies',
      period: 'Jun 2023 - May 2025',
      duration: '2 years',
      location: 'Hybrid',
      type: 'Part-time',
      category: 'data',
      status: 'completed',
      description: [
        'Built automation for internal tools and products using Python and automation tools like Gitlab CI/CD and Jenkins.',
        'Built automation scripts to perform tasks in Jama and Product Life cycle Management (PLM)',
        'Built Dashboards to plot Real-Time Data using python',
        'Built an end-to-end flask prototype for interacting with PLM',
        'Worked on Data Analysis and Data Visualization tasks',
        'Build automation pipelines using tools like Jenkins, and Gitlab CI/CD'
      ],
      technologies: ['Python', 'Flask', 'Jenkins', 'GitLab CI/CD', 'Data Analysis', 'PLM', 'Jama'],
      achievements: [
        'Automated creating Document Placeholder and BoI Elements in PLM.',
        'Automated transfering items and item structures from one project to another.',
        'Built CI/CD pipeline to create documents and build deploy folder and transfer it to Artifactory.'
      ]
    },
    {
      id: 3,
      title: 'Machine Learning Engineer',
      company: 'Keemut',
      period: 'Apr 2021 - Apr 2023',
      duration: '2 years',
      location: 'Remote',
      type: 'Full-time',
      category: 'ml',
      status: 'completed',
      description: [
        'Automated the machine learning pipeline and reduced the time taken by more than 50%',
        'Developed predictive models using machine learning algorithms to forecast vehicle prices on a monthly basis',
        'Maintained and administered AWS servers that facilitated the Python back-end and machine learning pipeline',
        'Developed automated unit and integration tests to ensure the safety and reliability of the complete system',
        'Created various scripts to accumulate data regularly for the purpose of data analysis, producing dashboards, and updating databases',
        'Developed web crawlers to gather information on automobiles',
        'Developed bash and python scripts to preprocessing scraped data (using NLP and other algorithms) and build a machine learning model',
        'Developed dockerized API for deploying the inference engine of the machine learning models'
      ],
      technologies: ['Python', 'Machine Learning', 'Tesla API', 'AWS', 'Docker', 'NLP', 'Web Scraping', 'Flask'],
      achievements: [
        'Built automation pipeline for ML models',
        'Reduced ML pipeline time by 50%',
        'Built predictive models with 95%+ accuracy',
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Experience', icon: '💼' },
    { id: 'ai', label: 'AI & Automation', icon: '🤖' },
    { id: 'data', label: 'Data & Analytics', icon: '📊' },
    { id: 'ml', label: 'Machine Learning', icon: '🧠' }
  ];

  const filteredExperiences = filter === 'all'
    ? experiences
    : experiences.filter(exp => exp.category === filter);

  return (
    <section id="Experience" className="experience-section">
      <div className="container">
        <div className="experience-header">
          <h2 ref={titleRef} className="section-title animate-out">
            Professional Journey
          </h2>
          <p className="section-subtitle animate-out">
            Explore my career progression and key achievements across different domains
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="experience-filters animate-out">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${filter === category.id ? 'active' : ''}`}
              onClick={() => setFilter(category.id)}
            >
              <span className="filter-icon">{category.icon}</span>
              <span className="filter-label">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Vertical Timeline */}
        <div ref={contentRef} className="experience-timeline animate-out">
          <div className="timeline-line-vertical"></div>
          {filteredExperiences.map((exp, index) => (
            <div
              key={exp.id}
              className="timeline-item-modern"
            >
              <div className="timeline-marker-modern">
                <div className="timeline-year-badge">
                  <span className="year-start">{exp.period.split(' - ')[0]}</span>
                  <span className="year-separator">-</span>
                  <span className="year-end">{exp.period.split(' - ')[1]}</span>
                </div>
              </div>
              <div className="experience-card-modern">
                {/* Card Header */}
                <div className="card-header">
                  <div className="company-info">
                    <div className="company-details">
                      <h3 className="job-title">{exp.title}</h3>
                      <p className="company-name">{exp.company}</p>
                    </div>
                  </div>
                  <div className="job-meta">
                    <span className="job-type">{exp.type}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="card-body">
                  <div className="job-details">
                    <div className="detail-item">
                      <i className="fas fa-calendar-alt"></i>
                      <span>{exp.period}</span>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-clock"></i>
                      <span>{exp.duration}</span>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <div className="job-description">
                    <p className="job-summary">{exp.description[0]}</p>

                    {(expandedCards.has(index) || animatingCards.has(index)) && (
                      <div className={`expanded-content ${animationStates.get(index) === 'collapsing' ? 'collapsing' : ''}`}>
                        <ul className="description-list">
                          {exp.description.slice(1).map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>

                        <div className="achievements">
                          <h5>Key Achievements</h5>
                          <ul className="achievement-list">
                            {exp.achievements.map((achievement, idx) => (
                              <li key={idx}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="technologies">
                    <div className="tech-stack">
                      {expandedTech.has(index) ? (
                        // Show all technologies
                        exp.technologies.map((tech, idx) => (
                          <span key={idx} className="tech-badge">{tech}</span>
                        ))
                      ) : (
                        // Show only first 4 technologies
                        <>
                          {exp.technologies.slice(0, 4).map((tech, idx) => (
                            <span key={idx} className="tech-badge">{tech}</span>
                          ))}
                          {exp.technologies.length > 4 && (
                            <span
                              className="tech-more"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleTech(index);
                              }}
                            >
                              +{exp.technologies.length - 4} more
                            </span>
                          )}
                        </>
                      )}
                      {expandedTech.has(index) && exp.technologies.length > 4 && (
                        <span
                          className="tech-less"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTech(index);
                          }}
                        >
                          Show less
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="card-footer">
                  <button
                    className="expand-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCard(index);
                    }}
                  >
                    {expandedCards.has(index) ? 'Show Less' : 'Show More'}
                    <i className={`fas fa-chevron-${expandedCards.has(index) ? 'up' : 'down'}`}></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Experience Stats */}
        <div className="experience-stats animate-out">
          <div className="stat-item">
            <div className="stat-number">{experiences.length}</div>
            <div className="stat-label">Positions</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">20+</div>
            <div className="stat-label">Technologies</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100+</div>
            <div className="stat-label">Projects</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
