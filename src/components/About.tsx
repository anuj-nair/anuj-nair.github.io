import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Stats {
  githubRepos: number;
  leetcodeSolved: number;
}

const About: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    githubRepos: 0,
    leetcodeSolved: 0
  });
  const [loading, setLoading] = useState(true);
  
  // Refs for scroll animations
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  // Scroll animations
  useScrollAnimation({
    elementRef: titleRef,
    threshold: 0.5
  });
  
  useScrollAnimation({
    elementRef: contentRef,
    threshold: 0.3
  });
  
  useScrollAnimation({
    elementRef: statsRef,
    threshold: 0.4
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch GitHub repositories
        const githubResponse = await axios.get('https://api.github.com/users/anuj-nair/repos?type=public&per_page=100');
        const publicRepos = githubResponse.data.length;

        // For LeetCode, we'll try multiple APIs and fallback gracefully
        let leetcodeSolved = 0;
        try {
          // Try LeetCode GraphQL API (requires CORS proxy in production)
          const leetcodeResponse = await fetch('https://leetcode-stats-api.herokuapp.com/anuj-nair');
          if (leetcodeResponse.ok) {
            const leetcodeData = await leetcodeResponse.json();
            leetcodeSolved = leetcodeData.totalSolved || 0;
          }
        } catch (leetcodeError) {
          console.log('LeetCode API not available, using fallback');
          // Fallback to a reasonable estimate
          leetcodeSolved = 150;
        }

        setStats({
          githubRepos: publicRepos,
          leetcodeSolved
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Set fallback values
        setStats({
          githubRepos: 20,
          leetcodeSolved: 150
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    
    // Refresh stats every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="About" className="about-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12">
            <h1 ref={titleRef} className="section-title about-title animate-out">About Me</h1>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-lg-4 col-md-6 col-12 mb-4">
            <div className="profile-image-container">
              <img
                src="/assets/imgs/profile_pic.jpg"
                className="profile-image"
                alt="Anuj Nair"
                loading="lazy"
              />
            </div>
          </div>

          <div className="col-lg-8 col-md-6 col-12">
            <div ref={contentRef} className="about-content animate-out">
              <p className="about-text">
                Passionate about solving real-world problems with Python, Machine Learning, LLMs, and Cloud solutions.
              </p>
              <p className="about-text">
                With hands-on experience in backend development, automation, AI engineering, and data pipelines, 
                I enjoy turning complex ideas into impactful solutions. I've worked with RAG models, fine-tuned LLMs, 
                and deployed cloud-based applications that deliver value.
              </p>
              <p className="about-text">
                I'm actively looking for opportunities to contribute, learn, and grow with forward-thinking teams. 
                Let's connect if you're building something exciting in AI, Data, or Cloud!
              </p>
              <div className="about-cta">
                <a
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="/assets/resume/AnujNair_CV.pdf"
                >
                  <i className="fas fa-download me-2"></i>
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Live Stats Section */}
        <div className="row mt-5">
          <div className="col-12">
            <div ref={statsRef} className="stats-section animate-out">
              <h3 className="stats-title">Live Stats</h3>
              <div className="row justify-content-center">
                <div className="col-md-6 col-sm-6 col-12 mb-3">
                  <div className="stat-item">
                    <a 
                      href="https://github.com/anuj-nair" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="stat-link"
                      aria-label="View GitHub Profile"
                    >
                      <h3 className="stat-number">{loading ? '...' : stats.githubRepos}</h3>
                      <p className="stat-label">GitHub Public Repos</p>
                    </a>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6 col-12 mb-3">
                  <div className="stat-item">
                    <a 
                      href="https://leetcode.com/anuj-nair" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="stat-link"
                      aria-label="View LeetCode Profile"
                    >
                      <h3 className="stat-number">{loading ? '...' : stats.leetcodeSolved}</h3>
                      <p className="stat-label">LeetCode Problems Solved</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
