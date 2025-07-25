import React, { useRef, useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Skill {
  name: string;
  iconPath?: string;
  hasIcon: boolean;
  fallbackIcon?: string;
  downloadUrl?: string;
}

interface SkillDepartment {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
  color: string;
}

interface SkillsData {
  skillDepartments: SkillDepartment[];
  missingLogos?: {
    downloadInstructions: string;
    logos: Array<{
      name: string;
      filename: string;
      url: string;
      note: string;
    }>;
  };
}

const Skills: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [skillsData, setSkillsData] = useState<SkillsData | null>(null);
  const [loading, setLoading] = useState(true);

  // Enhanced scroll animation with earlier trigger and navbar offset
  useScrollAnimation({
    elementRef: titleRef,
    threshold: 0.1,
    rootMargin: '0px 0px 100px 0px'
  });

  useScrollAnimation({
    elementRef: contentRef,
    threshold: 0.05,
    rootMargin: '0px 0px 150px 0px'
  });

  // Load skills data from external JSON
  useEffect(() => {
    const loadSkillsData = async () => {
      try {
        const response = await fetch('/data/skills.json');
        if (!response.ok) {
          throw new Error('Failed to load skills data');
        }
        const data: SkillsData = await response.json();
        setSkillsData(data);
      } catch (error) {
        console.error('Error loading skills data:', error);
        // Fallback to default data if JSON fails to load
        setSkillsData({
          skillDepartments: []
        });
      } finally {
        setLoading(false);
      }
    };

    loadSkillsData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section id="Skills" className="skills-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="section-title">Skills & Expertise</h1>
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading skills...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state or no data
  if (!skillsData || !skillsData.skillDepartments.length) {
    return (
      <section id="Skills" className="skills-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="section-title">Skills & Expertise</h1>
              <div className="text-center">
                <p className="text-muted">Unable to load skills data.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="Skills" className="skills-section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 ref={titleRef} className="section-title animate-out">Skills & Expertise</h1>
            <p className="section-subtitle animate-out">
              Technologies and tools I work with across different domains
            </p>
          </div>
        </div>

        <div ref={contentRef} className="animate-out">
          {/* Skills Departments */}
          <div className="skills-departments">
            {skillsData.skillDepartments.map((department: SkillDepartment, deptIndex: number) => (
              <div key={department.id || deptIndex} className="skill-department">
                <div className="department-header">
                  <h3 className="department-title" style={{ color: department.color }}>
                    {department.title}
                  </h3>
                  <p className="department-description">{department.description}</p>
                </div>

                <div className="skills-grid">
                  {department.skills.map((skill: Skill, skillIndex: number) => (
                    <div key={`${department.id}-${skillIndex}`} className="skill-item">
                      <div className="skill-icon-container">
                        {skill.hasIcon && skill.iconPath ? (
                          <img
                            src={skill.iconPath}
                            alt={`${skill.name} icon`}
                            className="skill-icon-img"
                            onError={(e) => {
                              console.error('Icon failed to load:', skill.iconPath);
                              console.log('Download URL available:', skill.downloadUrl);
                              // Hide broken image and show fallback
                              (e.target as HTMLImageElement).style.display = 'none';
                              const fallback = document.createElement('i');
                              fallback.className = skill.fallbackIcon || 'fas fa-code skill-icon-fallback';
                              (e.target as HTMLImageElement).parentNode?.appendChild(fallback);
                            }}
                          />
                        ) : skill.fallbackIcon ? (
                          <i className={`${skill.fallbackIcon} skill-icon-fallback`}></i>
                        ) : (
                          <i className="fas fa-code skill-icon-fallback"></i>
                        )}
                      </div>
                      <span className="skill-name">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Debug info for missing logos in development */}
          {process.env.NODE_ENV === 'development' && skillsData.missingLogos && (
            <div className="mt-4 p-3 bg-warning bg-opacity-10 rounded">
              <h6>Missing Logos (Development Only):</h6>
              <small className="text-muted">
                {skillsData.missingLogos.downloadInstructions}
              </small>
              <ul className="mt-2 mb-0">
                {skillsData.missingLogos.logos.map((logo, index) => (
                  <li key={index}>
                    <strong>{logo.name}</strong>:
                    <a href={logo.url} target="_blank" rel="noopener noreferrer" className="ms-1">
                      Download {logo.filename}
                    </a>
                    <small className="text-muted ms-2">({logo.note})</small>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
