import React, { useEffect, useState } from 'react';
import { Award, Zap, Heart } from 'lucide-react';

// Counter component for animated metric count up
const Counter: React.FC<{ target: number; suffix?: string; duration?: number }> = ({ target, suffix = "", duration = 1500 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    const totalSteps = 60;
    const stepTime = duration / totalSteps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      // Ease out quad formula for smooth decelerating animation
      const easedCount = Math.floor(end * (progress * (2 - progress)));
      setCount(easedCount);

      if (step >= totalSteps) {
        setCount(end);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
};

export const About: React.FC = () => {
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const timelineStages = [
    {
      year: "2012 - 2016",
      title: "Foundations & Static Excellence",
      desc: "Launched Sketch Web Tech with a focus on custom pixel-perfect static designs. Built clean, responsive landing pages and high-end interfaces that immediately set us apart.",
      tags: ["HTML5", "CSS3", "Responsive UI"]
    },
    {
      year: "2016 - 2018",
      title: "WordPress & CMS Customization",
      desc: "Transitioned to providing dynamic content management systems, building bespoke WordPress themes, complex plugins, and admin portals for growing businesses.",
      tags: ["WordPress", "PHP", "Dynamic CMS"]
    },
    {
      year: "2018 - 2021",
      title: "E-Commerce & Scale Integration",
      desc: "Engineered scalable digital stores with robust cart systems, payment gateways, and custom backend modules, allowing clients to tap into global retail platforms.",
      tags: ["WooCommerce", "Node.js", "Payment APIs"]
    },
    {
      year: "2021 - 2024",
      title: "SaaS Products & Enterprise Web Apps",
      desc: "Focused on high-performance SaaS platforms, real-time databases, and responsive PWAs. Built sophisticated cloud applications that simplified complex company operations.",
      tags: ["React", "TypeScript", "Vite", "Cloud Arch"]
    },
    {
      year: "2024 - Present",
      title: "AI Integrations & Customized Intelligent Solutions",
      desc: "Pioneering intelligent digital transformations. Integrating large language models (LLMs), machine learning models, and automated AI agents into business workflows, enabling next-level productivity.",
      tags: ["Generative AI", "LLM APIs", "Agentic Systems"]
    }
  ];

  return (
    <div className="container section">
      {/* Intro Header */}
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px' }}>
        <h1 className="about-main-title text-gradient">Our Journey</h1>
        <p className="about-main-desc">
          Over 14 years of helping enterprises, startups, and businesses adapt to the fast-moving technological landscape. We grow alongside technology so that our clients always stay ahead.
        </p>
      </div>

      {/* Metrics Dashboard Section */}
      <div className="metrics-grid">
        <div className="glass-card metric-card spotlight-card reveal-item" onMouseMove={handleCardMouseMove}>
          <div className="metric-number">
            <Counter target={14} suffix="+" />
          </div>
          <div className="metric-label">Years of Engineering Experience</div>
        </div>
        <div className="glass-card metric-card spotlight-card reveal-item" onMouseMove={handleCardMouseMove}>
          <div className="metric-number">
            <Counter target={100} suffix="+" />
          </div>
          <div className="metric-label">Satisfied Global Clients</div>
        </div>
        <div className="glass-card metric-card spotlight-card reveal-item" onMouseMove={handleCardMouseMove}>
          <div className="metric-number">
            <Counter target={30} suffix="+" />
          </div>
          <div className="metric-label">Custom Web Apps Built</div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="timeline-section">
        <h2 className="reveal-item about-section-title">Our Evolutionary Milestone</h2>
        <div className="timeline-line"></div>
        <div className="timeline-items-wrapper">
          {timelineStages.map((stage, index) => (
            <div key={index} className="timeline-item reveal-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content-wrapper spotlight-card" onMouseMove={handleCardMouseMove}>
                <h3 className="timeline-title text-gradient">{stage.title}</h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '16px' }}>{stage.desc}</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {stage.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--glass-border)',
                        fontSize: '0.75rem',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="timeline-meta">{stage.year}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Philosophy */}
      <section style={{ marginTop: '80px' }}>
        <h2 className="reveal-item about-section-title" style={{ marginBottom: '40px' }}>Core Philosophy</h2>
        <div className="services-grid">
          <div className="glass-card spotlight-card reveal-item" style={{ textAlign: 'center' }} onMouseMove={handleCardMouseMove}>
            <div className="service-icon-wrap" style={{ margin: '0 auto 20px' }}>
              <Award size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Exemplary Standards</h3>
            <p style={{ fontSize: '0.9rem' }}>
              We write clean, semantic, and highly commented code designed to stand the test of time and support hassle-free scaling.
            </p>
          </div>
          <div className="glass-card spotlight-card reveal-item" style={{ textAlign: 'center' }} onMouseMove={handleCardMouseMove}>
            <div className="service-icon-wrap" style={{ margin: '0 auto 20px' }}>
              <Zap size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Maximum Performance</h3>
            <p style={{ fontSize: '0.9rem' }}>
              Optimized layouts, lazy-loaded components, and lightweight dependencies keep page load speeds light-years ahead.
            </p>
          </div>
          <div className="glass-card spotlight-card reveal-item" style={{ textAlign: 'center' }} onMouseMove={handleCardMouseMove}>
            <div className="service-icon-wrap" style={{ margin: '0 auto 20px' }}>
              <Heart size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Adaptive Innovation</h3>
            <p style={{ fontSize: '0.9rem' }}>
              By integrating cloud architectures, custom SAP systems, and custom AI tools, we help our clients capture new market opportunities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
