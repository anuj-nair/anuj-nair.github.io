import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Contact: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [tooltipText, setTooltipText] = useState('Copy Email ID');
  const emailId = 'nairanuj29+website@gmail.com';
  
  // Contact form state
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Scroll animations
  useScrollAnimation({
    elementRef: titleRef,
    threshold: 0.5
  });
  
  useScrollAnimation({
    elementRef: contentRef,
    threshold: 0.3
  });

  // Check for email template from Services
  useEffect(() => {
    const checkForTemplate = () => {
      const template = sessionStorage.getItem('emailTemplate');
      if (template) {
        const { subject, message } = JSON.parse(template);
        setFormData(prev => ({
          ...prev,
          subject,
          message
        }));
        // Clear the template after using it
        sessionStorage.removeItem('emailTemplate');
      }
    };

    // Check immediately
    checkForTemplate();

    // Also check when the component becomes visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          checkForTemplate();
        }
      });
    });

    const contactSection = document.getElementById('Contact');
    if (contactSection) {
      observer.observe(contactSection);
    }

    // Listen for storage events (in case of multiple tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'emailTemplate' && e.newValue) {
        checkForTemplate();
      }
    };

    // Listen for custom event from Services component
    const handleEmailTemplateReady = (e: CustomEvent) => {
      const { subject, message } = e.detail;
      setFormData(prev => ({
        ...prev,
        subject,
        message
      }));
      // Clear the template from storage
      sessionStorage.removeItem('emailTemplate');
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('emailTemplateReady', handleEmailTemplateReady as EventListener);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('emailTemplateReady', handleEmailTemplateReady as EventListener);
    };
  }, []);

  const handleEmailClick = () => {
    navigator.clipboard.writeText(emailId);
    setTooltipText(`Copied: ${emailId}`);
    setTimeout(() => setTooltipText('Copy Email ID'), 2000);
  };



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // EmailJS configuration - replace with your actual IDs
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_5o39m8s';
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_mcksgun';
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'eESzSv1nFjpW9AxNt';

      // Template parameters
      const templateParams = {
        from_email: formData.email,
        from_name: formData.email.split('@')[0],
        subject: formData.subject,
        message: formData.message,
        to_email: emailId,
        reply_to: formData.email
      };

      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSubmitStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!'
      });
      
      // Reset form
      setFormData({
        email: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or contact me directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="Contact" className="contact-section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 ref={titleRef} className="section-title animate-out">Get In Touch</h1>
          </div>
        </div>
        
        <div ref={contentRef} className="animate-out">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="contact-intro">
                <p className="contact-description">
                  I'm always interested in new opportunities and exciting projects. 
                  Whether you have a question, want to collaborate, or just want to say hi, 
                  I'd love to hear from you!
                </p>
              </div>
              
              {/* Contact Form */}
              <div className="contact-form-container">
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input
                        type="email"
                        className="form-control contact-input"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        autoComplete="email"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        className="form-control contact-input"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control contact-input"
                      name="message"
                      rows={5}
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg contact-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane me-2"></i>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
                
                {/* Status Message */}
                {submitStatus.type && (
                  <div className={`alert ${submitStatus.type === 'success' ? 'alert-success' : 'alert-danger'} mt-3`}>
                    {submitStatus.message}
                  </div>
                )}
              </div>
              
              {/* Direct Contact */}
              <div className="direct-contact mt-5">
                {/* Social Links */}
                <div className="social-links">
                  <a href="https://github.com/anuj-nair" target="_blank" rel="noopener noreferrer" className="social-link">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://linkedin.com/in/anuj-nair-b79b941a9" target="_blank" rel="noopener noreferrer" className="social-link">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="https://x.com/nairanuj29" target="_blank" rel="noopener noreferrer" className="social-link">
                    <i className="fa-brands fa-x-twitter"></i>
                  </a>
                  <button
                    className="social-link email-copy-btn"
                    onClick={handleEmailClick}
                    title={tooltipText}
                    aria-label="Copy email address"
                  >
                    <i className="fas fa-envelope"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
