import React, { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  technologies: string[];
  pricing: string;
}

const Services: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useScrollAnimation({
    elementRef: titleRef,
    threshold: 0.2
  });

  useScrollAnimation({
    elementRef: contentRef,
    threshold: 0.1
  });

  const handleGetQuote = (service: Service) => {
    const subject = `Quote Request: ${service.title}`;
    const message = `Hi Anuj,

I'm interested in your ${service.title} service. Here are the details of my project:

Project Description:
[Please describe your project requirements here]

Timeline:
[When do you need this completed?]

Budget:
[What's your budget range?]

Additional Information:
[Any other relevant details]

Looking forward to hearing from you!

Best regards,
[Your Name]`;

    // Store the template data in sessionStorage
    sessionStorage.setItem('emailTemplate', JSON.stringify({
      subject,
      message
    }));

    // Dispatch custom event to notify Contact component
    window.dispatchEvent(new CustomEvent('emailTemplateReady', {
      detail: { subject, message }
    }));

    // Scroll to contact section
    const contactElement = document.getElementById('Contact');
    if (contactElement) {
      const offsetTop = contactElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const services: Service[] = [
    {
      id: 1,
      title: 'Python Development & Automation',
      description: 'Custom Python applications, scripts, and automation solutions to streamline your business processes.',
      icon: 'fab fa-python',
      features: [
        'Web scraping and data extraction',
        'API development and integration',
        'Process automation scripts',
        'Data processing pipelines',
        'Custom Python applications'
      ],
      technologies: ['Python', 'Django', 'Flask', 'FastAPI', 'Pandas', 'NumPy'],
      pricing: 'Starting from $50/hour'
    },
    {
      id: 2,
      title: 'Machine Learning & AI Solutions',
      description: 'Intelligent solutions using machine learning, deep learning, and LLM integration for your business needs.',
      icon: 'fas fa-brain',
      features: [
        'Custom ML model development',
        'LLM integration and fine-tuning',
        'RAG (Retrieval Augmented Generation) systems',
        'Computer vision applications',
        'Natural language processing',
        'Predictive analytics'
      ],
      technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'Ollama', 'Scikit-learn', 'Keras'],
      pricing: 'Starting from $75/hour'
    },
    {
      id: 3,
      title: 'Cloud & DevOps Solutions',
      description: 'Cloud infrastructure setup, deployment automation, and DevOps practices to scale your applications.',
      icon: 'fas fa-cloud',
      features: [
        'AWS cloud infrastructure setup',
        'CI/CD pipeline implementation',
        'Docker containerization',
        'Infrastructure as Code',
        'Monitoring and logging setup',
        'Performance optimization'
      ],
      technologies: ['AWS', 'Docker', 'Jenkins', 'Terraform', 'Kubernetes', 'Linux'],
      pricing: 'Starting from $60/hour'
    },
    {
      id: 4,
      title: 'Data Engineering & Analytics',
      description: 'End-to-end data solutions from collection and processing to visualization and insights.',
      icon: 'fas fa-chart-line',
      features: [
        'Data pipeline development',
        'Database design and optimization',
        'ETL/ELT processes',
        'Data visualization dashboards',
        'Business intelligence solutions',
        'Real-time data processing'
      ],
      technologies: ['PostgreSQL', 'MongoDB', 'Apache Spark', 'Airflow', 'Tableau', 'Power BI'],
      pricing: 'Starting from $65/hour'
    },
    {
      id: 5,
      title: 'Automation as a Service',
      description: 'End-to-end automation solutions using N8N workflows and Python scripts to streamline your business processes.',
      icon: 'fas fa-robot',
      features: [
        'N8N workflow automation',
        'Business process automation',
        'API integrations and webhooks',
        'Data synchronization between systems',
        'Scheduled task automation',
        'Custom automation dashboards'
      ],
      technologies: ['N8N', 'Python', 'Zapier', 'Make.com', 'REST APIs', 'Webhooks'],
      pricing: 'Starting from $60/hour'
    },
    {
      id: 6,
      title: 'Consulting & Code Review',
      description: 'Technical consulting, architecture review, and code optimization for existing projects.',
      icon: 'fas fa-search',
      features: [
        'Code review and optimization',
        'Architecture consultation',
        'Performance analysis',
        'Security audit',
        'Technology stack recommendations',
        'Best practices implementation'
      ],
      technologies: ['Multiple Technologies', 'Architecture Design', 'Code Quality', 'Security'],
      pricing: 'Starting from $80/hour'
    }
  ];

  return (
    <section id="Services" className="services-section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 ref={titleRef} className="section-title animate-out">Freelance Services</h1>
            <p className="section-subtitle text-center">
              Professional development services to help bring your ideas to life
            </p>
          </div>
        </div>

        <div ref={contentRef} className="animate-out">
          <div className="row">
            {services.map((service) => (
              <div key={service.id} className="col-lg-6 col-md-6 col-12 mb-4">
                <div className="service-card">
                  <div className="service-header">
                    <div className="service-icon">
                      <i className={service.icon}></i>
                    </div>
                    <div className="service-title-section">
                      <h3 className="service-title">{service.title}</h3>
                      <p className="service-pricing">{service.pricing}</p>
                    </div>
                  </div>
                  
                  <p className="service-description">{service.description}</p>
                  
                  <div className="service-features">
                    <h4>What's Included:</h4>
                    <ul>
                      {service.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="service-technologies">
                    <h4>Technologies:</h4>
                    <div className="tech-tags">
                      {service.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="service-cta">
                    <button
                      onClick={() => handleGetQuote(service)}
                      className="btn btn-primary service-btn"
                    >
                      <i className="fas fa-envelope me-2"></i>
                      Get Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="row mt-5">
            <div className="col-12">
              <div className="services-footer">
                <h3>Ready to Start Your Project?</h3>
                <p>Let's discuss your requirements and create something amazing together!</p>
                <a href="#Contact" className="btn btn-primary btn-lg">
                  <i className="fas fa-rocket me-2"></i>
                  Start Your Project
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
