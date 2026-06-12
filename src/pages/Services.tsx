import React, { useState, useRef } from 'react';
import { Sparkles, Code2, Layers, ShoppingBag, Settings, LineChart, Server, Cpu, Database, Eye } from 'lucide-react';

interface ServiceItem {
  id: string;
  category: 'web' | 'ai' | 'sap' | 'consulting';
  icon: React.ReactNode;
  title: string;
  desc: string;
  features: string[];
  highlighted?: boolean;
}

// 3D Tilt & Spotlight Card Wrapper Component
const TiltCard: React.FC<{ children: React.ReactNode; highlighted?: boolean; className?: string }> = ({ children, highlighted = false, className = "" }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element

    // Track mouse coordinates for CSS hover spotlights
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Maximum tilt angles (degrees)
    const maxTilt = 8;
    const rotateX = ((centerY - y) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease',
      zIndex: 10
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`glass-card service-card spotlight-card ${highlighted ? 'ai-highlighted' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export const Services: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const servicesData: ServiceItem[] = [
    {
      id: "ai-custom",
      category: "ai",
      icon: <Sparkles size={24} />,
      title: "Customized AI Solutions",
      desc: "Tailor-made artificial intelligence systems designed around your unique corporate intelligence needs. Automate data pipelines and generate predictive models.",
      features: ["Custom Model Training & Tuning", "Agentic Workflow Automation", "Predictive Analytics Systems"],
      highlighted: true
    },
    {
      id: "ai-integration",
      category: "ai",
      icon: <Cpu size={24} />,
      title: "AI Integration in Existing Apps",
      desc: "Incorporate cognitive abilities into your current platforms. Seamlessly add natural language processing, automated search engines, and ChatGPT modules.",
      features: ["Large Language Model (LLM) Integration", "Semantic & Vector Search Setup", "Intelligent Chatbots & Assistances"],
      highlighted: true
    },
    {
      id: "sap-solutions",
      category: "sap",
      icon: <Database size={24} />,
      title: "SAP ERP Solutions & Consulting",
      desc: "Streamline multi-department workflows and maximize asset usage with standard-setting SAP consulting, custom ABAP add-ons, and database migration services.",
      features: ["SAP S/4HANA Implementation", "Custom ABAP & Fiori App Development", "Data Migration & Pipelines Configuration"],
      highlighted: true
    },
    {
      id: "web-apps",
      category: "web",
      icon: <Layers size={24} />,
      title: "Web Applications (SPA & PWA)",
      desc: "Fast, secure, installable web software that runs seamlessly on any device. Features extensive offline accessibility support and desktop app experiences.",
      features: ["Progressive Web App (PWA) Setup", "Offline Data Caching (Service Workers)", "Responsive Single Page Applications"],
      highlighted: false
    },
    {
      id: "web-dev",
      category: "web",
      icon: <Code2 size={24} />,
      title: "Website Development",
      desc: "High-fidelity, lightning-fast dynamic and static websites built for high conversions, responsive interfaces, and strict SEO compliance.",
      features: ["SEO Friendly Code Architectures", "Optimized Core Web Vitals", "Custom Animations & Parallax Effects"],
      highlighted: false
    },
    {
      id: "web-design",
      category: "web",
      icon: <Eye size={24} />,
      title: "Website UI/UX Design",
      desc: "Visually striking, interactive designs tailored to represent your company identity and provide user-friendly journeys that convert visitors.",
      features: ["Wireframing & Prototyping", "Curated Palette & Brand Identity Design", "Motion Graphics & Micro-interactions"],
      highlighted: false
    },
    {
      id: "ecommerce",
      category: "web",
      icon: <ShoppingBag size={24} />,
      title: "E-Commerce Websites",
      desc: "Reliable custom shopping carts and global e-shops integrated with secure payment systems, auto-invoicing, and simple stock monitors.",
      features: ["Secure Payment Gateway Audits", "Custom Inventory Dashboards", "Automated Checkout Flow Improvements"],
      highlighted: false
    },
    {
      id: "software-solutions",
      category: "sap",
      icon: <Settings size={24} />,
      title: "Custom Software Solutions",
      desc: "Tailored desktop and cloud-based automation tools created to solve specific operational bottlenecks in your team's workflow.",
      features: ["Custom REST & GraphQL API creation", "Automation Scripts", "Systems Integration Services"],
      highlighted: false
    },
    {
      id: "it-services",
      category: "consulting",
      icon: <Server size={24} />,
      title: "IT Services & Cloud Hosting",
      desc: "Setup your systems on AWS or Azure with zero downtime. We structure secure database clusters, backup schedules, and active threat monitors.",
      features: ["Azure & AWS Cloud Setup", "Automated CI/CD Deployment Pipelines", "Cloud Cost Optimization & Audits"],
      highlighted: false
    },
    {
      id: "consulting",
      category: "consulting",
      icon: <LineChart size={24} />,
      title: "Business Tech Consulting",
      desc: "Navigate through framework selections, architecture plans, and technology roadmaps to scale your operations efficiently.",
      features: ["Infrastructure Audits", "Security Vulnerability Scans", "Modernization Roadmaps"],
      highlighted: false
    }
  ];

  const filteredServices = selectedCategory === 'all'
    ? servicesData
    : servicesData.filter(s => s.category === selectedCategory);

  return (
    <div className="container section">
      {/* Intro Header */}
      <div className="services-header">
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }} className="text-gradient">Our Services</h1>
        <p style={{ fontSize: '1.1rem' }}>
          Explore our suite of software development, enterprise SAP consulting, and cognitive AI integration services. Built with speed and crafted for intelligent interactions.
        </p>
      </div>

      {/* Filter Categories Bar */}
      <div className="services-filter-bar">
        {['all', 'web', 'ai', 'sap', 'consulting'].map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
            style={{ textTransform: 'capitalize' }}
          >
            {cat === 'all' ? 'Show All' : cat === 'web' ? 'Web & UI' : cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Services Grid wrapper (with scroll-reveal) */}
      <div className="services-grid reveal-item">
        {filteredServices.map((service) => (
          <TiltCard key={service.id} highlighted={service.highlighted}>
            <div className="service-icon-wrap">{service.icon}</div>
            <h3 className="service-card-title">{service.title}</h3>
            <p className="service-card-desc">{service.desc}</p>
            <ul className="service-features-list">
              {service.features.map((feature, fIdx) => (
                <li key={fIdx} className="service-feature-item">
                  <span className="feature-dot"></span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setSelectedService(service)}
              style={{
                marginTop: '20px',
                background: 'none',
                border: 'none',
                color: service.highlighted ? 'var(--accent-purple)' : 'var(--accent-cyan)',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem'
              }}
            >
              Read More Details →
            </button>
          </TiltCard>
        ))}
      </div>

      {/* Detailed Modal Drawer */}
      {selectedService && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(3, 7, 18, 0.85)',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={() => setSelectedService(null)}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '600px',
              width: '100%',
              backgroundColor: 'var(--bg-secondary)',
              borderColor: selectedService.highlighted ? 'var(--accent-purple)' : 'var(--glass-border)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div className="service-icon-wrap" style={{ marginBottom: 0 }}>{selectedService.icon}</div>
                <div>
                  <h3 style={{ fontSize: '1.5rem' }}>{selectedService.title}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                    {selectedService.category} Solutions
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '1.5rem',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>
              {selectedService.desc}
            </p>
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Detailed Offerings:</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '20px', color: 'var(--text-secondary)' }}>
                {selectedService.features.map((feat, idx) => (
                  <li key={idx} style={{ lineHeight: '1.4' }}>{feat}</li>
                ))}
                <li>Comprehensive QA vetting and unit testing integration.</li>
                <li>Fully documented source code + maintenance handbook.</li>
                <li>30 days post-launch active performance scaling support.</li>
              </ul>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedService(null)}>
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedService(null);
                  // Quick navigation hack to trigger tab state update
                  const el = document.getElementById('contact-nav-trigger');
                  if (el) el.click();
                }}
              >
                Request Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
