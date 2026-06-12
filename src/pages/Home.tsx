import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Cpu, Code, Globe, Terminal, Award, Shield, Workflow, Layers } from 'lucide-react';

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  // Typewriter effect states
  const tagline = "Crafting Intelligent Digital Experiences";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(tagline.substring(0, index + 1));
      index++;
      if (index >= tagline.length) {
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // HTML Canvas interactive particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const particleCount = Math.min(60, Math.floor((width * height) / 15000));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1
      });
    }

    const mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    // Attach listener to the parent hero section container to catch movements properly
    const heroEl = heroRef.current;
    if (heroEl) {
      heroEl.addEventListener('mousemove', handleMouseMove);
      heroEl.addEventListener('mouseleave', handleMouseLeave);
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw active particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        // Boundary bounce check
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.6)';
        ctx.fill();

        // Connect near particles together and draw packet flow
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw traveling network data packets
            const packetSpeed = 0.0008;
            const progress = (Date.now() * packetSpeed + (idx * 0.17)) % 1;
            const packetX = p.x + (p2.x - p.x) * progress;
            const packetY = p.y + (p2.y - p.y) * progress;

            ctx.beginPath();
            ctx.arc(packetX, packetY, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(6, 182, 212, ${0.7 * (1 - dist / 100)})`;
            ctx.fill();
          }
        }

        // Magnetism connect with cursor
        if (mouse.active) {
          const mDist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (mDist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.3 * (1 - mDist / 140)})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (heroEl) {
        heroEl.removeEventListener('mousemove', handleMouseMove);
        heroEl.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const featuredServices = [
    {
      icon: <Cpu size={24} />,
      title: "AI Integration & Consultation",
      desc: "Transform your existing software products or launch new business ventures with customized AI solutions, LLMs, and agentic workflows."
    },
    {
      icon: <Code size={24} />,
      title: "Full-Stack Web Applications",
      desc: "High-speed Single Page Applications (SPAs) and Progressive Web Apps (PWAs) tailored for performance, offline usage, and scalability."
    },
    {
      icon: <Globe size={24} />,
      title: "SAP Cloud Solutions & Consulting",
      desc: "Maximize business efficiency with expert SAP ERP implementations, custom workflow customizations, cloud migration, and data pipelines."
    }
  ];

  const testimonials = [
    {
      initials: "AM",
      text: "Sketch Web Tech integrated customized AI search models into our e-shop, resulting in a 40% boost in user engagement. Outstanding work!",
      author: "Amit Mehra",
      title: "CTO, RetailSync"
    },
    {
      initials: "SK",
      text: "Their team built a highly complex PWA for our logistics tracking. The offline accessibility features perform seamlessly under heavy workloads.",
      author: "Sonia Kapoor",
      title: "VP Operations, TransLogix"
    },
    {
      initials: "JD",
      text: "The SAP customization solutions developed by SWT streamlined our multi-warehouse operations. Their IT services are truly top-notch.",
      author: "Julius De",
      title: "IT Director, NexaManufacturing"
    },
    {
      initials: "RN",
      text: "Remarkable experience working with them. They redesigned our outdated SaaS product layout, and transformed it with premium custom micro-interactions.",
      author: "Rajesh N.",
      title: "Founder, Propiofy Solutions"
    },
    {
      initials: "EL",
      text: "We leveraged their custom AI integration services to automate our support desk operations. The solution is fast, robust, and reduced tickets by 50%.",
      author: "Elena L.",
      title: "Product Manager, ApexCorp"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <canvas className="hero-canvas" ref={canvasRef} />
        <div className="glow-bg" />
        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <div className="hero-content-wrapper">
            <span className="hero-tagline-badge">
              {typedText || <span style={{ opacity: 0 }}>.</span>}
              <span style={{ animation: 'pulse-glow 1s infinite' }}>|</span>
            </span>
            <h1 className="hero-title">
              We Build Next-Gen <br />
              <span className="text-gradient">Intelligent Software</span>
            </h1>
            <p className="hero-description">
              Sketch Web Tech is a forward-thinking software consulting agency. We deliver high-speed web apps, custom SAP architectures, and custom AI systems that power business growth.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => setActiveTab('services')}>
                Explore Services <ArrowRight size={16} />
              </button>
              <button className="btn btn-secondary" onClick={() => setActiveTab('contact')}>
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Info Section */}
      <section className="parallax-section">
        <div className="parallax-layer parallax-layer-1" />
        <div className="parallax-layer parallax-layer-2" />
        <div className="container">
          <div className="parallax-grid">
            <div>
              <span className="parallax-info-label">Adopting The Future</span>
              <h2 className="parallax-title">
                Merging Digital Artistry <br />
                with Cognitive Algorithms
              </h2>
              <p style={{ marginBottom: '24px' }}>
                We believe that software should be beautiful, fast, and intelligent. Our custom solutions bridge the gap between design and cutting-edge machine learning.
              </p>
              <p style={{ marginBottom: '32px' }}>
                Whether you need a custom e-commerce engine, enterprise SAP configuration, or a fine-tuned LLM assistant integrated into your legacy system, we handle it with maximum precision.
              </p>
              <button className="btn btn-secondary" onClick={() => setActiveTab('about')}>
                Our Journey
              </button>
            </div>
            <div className="parallax-visual">
              <div className="parallax-circle" />
              <div className="parallax-shape" />
              <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                <Terminal size={48} className="text-gradient" style={{ animation: 'float 4s ease-in-out infinite' }} />
                <div style={{ marginTop: '16px', fontWeight: '700', fontSize: '1.1rem', letterSpacing: '0.05em' }}>
                  SKETCH WEB TECH
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services Preview */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <h2 className="reveal-item" style={{ textAlign: 'center', fontSize: '2.2rem', marginBottom: '16px' }}>What We Excel At</h2>
          <p className="reveal-item" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 50px', color: 'var(--text-secondary)' }}>
            We specialize in creating robust digital ecosystems that help your company adapt and scale.
          </p>
          <div className="services-grid">
            {featuredServices.map((service, i) => (
              <div key={i} className="glass-card spotlight-card reveal-item" onMouseMove={handleCardMouseMove}>
                <div className="service-icon-wrap">{service.icon}</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{service.title}</h3>
                <p style={{ fontSize: '0.95rem' }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Strengths Section */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <span className="parallax-info-label reveal-item" style={{ display: 'block', textAlign: 'center' }}>Enterprise Capabilities</span>
          <h2 className="reveal-item" style={{ textAlign: 'center', fontSize: '2.2rem', marginBottom: '16px' }}>Why Innovators Choose Us</h2>
          <p className="reveal-item" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px', color: 'var(--text-secondary)' }}>
            We combine premium design engineering with enterprise core architectures.
          </p>
          <div className="strengths-grid">
            <div className="strength-card spotlight-card reveal-item" onMouseMove={handleCardMouseMove}>
              <div className="strength-icon">
                <Cpu size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>AI-First Approach</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                We don't just write scripts; we build cognitive interfaces utilizing vector databases, model fine-tuning, and neural agent pipelines.
              </p>
            </div>
            <div className="strength-card spotlight-card reveal-item" onMouseMove={handleCardMouseMove}>
              <div className="strength-icon">
                <Layers size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Performant PWA Engines</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Our sites are Progressive Web Apps from day one, giving users native mobile installability and full offline database storage caching.
              </p>
            </div>
            <div className="strength-card spotlight-card reveal-item" onMouseMove={handleCardMouseMove}>
              <div className="strength-icon">
                <Award size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>SAP Enterprise Integrations</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                With custom Fiori UI/UX wrappers and secure REST/GraphQL gateways, we connect legacy SAP setups to modern SaaS systems.
              </p>
            </div>
            <div className="strength-card spotlight-card reveal-item" onMouseMove={handleCardMouseMove}>
              <div className="strength-icon">
                <Shield size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Security Vetted</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Every custom application goes through strict sanitization, secure cookie policies, HTTPS enforcement, and SQL-injection mitigation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Roadmap Section */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <span className="parallax-info-label reveal-item" style={{ display: 'block', textAlign: 'center' }}>Our Workflow</span>
          <h2 className="reveal-item" style={{ textAlign: 'center', fontSize: '2.2rem', marginBottom: '16px' }}>Collaborative Project Roadmap</h2>
          <p className="reveal-item" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px', color: 'var(--text-secondary)' }}>
            A systematic engineering process designed to keep your project on schedule and scale without technical debt.
          </p>
          <div className="roadmap-container">
            <div className="roadmap-grid">
              <div className="roadmap-step spotlight-card reveal-item" onMouseMove={handleCardMouseMove}>
                <span className="roadmap-num">01</span>
                <h3 className="roadmap-title">Discover & Sketch</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  We map out API models, draft wireframe flows on paper, and align on technology blueprints.
                </p>
              </div>
              <div className="roadmap-step spotlight-card reveal-item" onMouseMove={handleCardMouseMove}>
                <span className="roadmap-num">02</span>
                <h3 className="roadmap-title">Design & Prototype</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Creating pixel-perfect layout mocks with premium dark themes, neon glow systems, and smooth animations.
                </p>
              </div>
              <div className="roadmap-step spotlight-card reveal-item" onMouseMove={handleCardMouseMove}>
                <span className="roadmap-num">03</span>
                <h3 className="roadmap-title">Build & Smarten</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Developing modular React components, writing secure database scripts, and integrating customized AI modules.
                </p>
              </div>
              <div className="roadmap-step spotlight-card reveal-item" onMouseMove={handleCardMouseMove}>
                <span className="roadmap-num">04</span>
                <h3 className="roadmap-title">Audit & Launch</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Running end-to-end lighthouse test checks, optimizing build sizes, setting up service workers, and hosting on Azure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies Spotlight Section */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container">
          <span className="parallax-info-label reveal-item" style={{ display: 'block', textAlign: 'center' }}>Featured Collaborations</span>
          <h2 className="reveal-item" style={{ textAlign: 'center', fontSize: '2.2rem', marginBottom: '16px' }}>Technology Spotlights</h2>
          <p className="reveal-item" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px', color: 'var(--text-secondary)' }}>
            Real metrics. Real impacts. Discover how clients leverage our solutions.
          </p>
          <div className="case-studies-container">
            {/* Case Study 1 */}
            <div className="glass-card case-study-card spotlight-card reveal-item" onMouseMove={handleCardMouseMove}>
              <div>
                <span className="case-study-tag">SaaS E-Commerce Transformation</span>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>RetailSync Dashboard</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  We re-designed a legacy multi-vendor platform, turning it into a progressive web app with a custom AI recommendation filter and checkout automation.
                </p>
                <div className="case-study-metrics-grid">
                  <div className="case-study-metric">
                    <div className="case-study-val">+40%</div>
                    <div className="case-study-lbl">Sales Conversion</div>
                  </div>
                  <div className="case-study-metric">
                    <div className="case-study-val">220ms</div>
                    <div className="case-study-lbl">Page Load Speed</div>
                  </div>
                  <div className="case-study-metric">
                    <div className="case-study-val">99.9%</div>
                    <div className="case-study-lbl">Offline Sync Success</div>
                  </div>
                </div>
              </div>
              <div className="case-study-visual-box">
                <div style={{ zIndex: 10, textAlign: 'center' }}>
                  <Globe size={32} className="text-gradient" />
                  <div style={{ marginTop: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Live Sync Active</div>
                </div>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="glass-card case-study-card spotlight-card reveal-item" onMouseMove={handleCardMouseMove}>
              <div className="case-study-visual-box">
                <div style={{ zIndex: 10, textAlign: 'center' }}>
                  <Workflow size={32} className="text-gradient" />
                  <div style={{ marginTop: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Neural Pipeline Loaded</div>
                </div>
              </div>
              <div>
                <span className="case-study-tag" style={{ background: 'rgba(6, 182, 212, 0.1)', borderColor: 'rgba(6, 182, 212, 0.2)', color: 'var(--accent-cyan)' }}>AI Automation</span>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>Cognitive Support Broker</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Integrated customized LLMs and document embeddings into a client's support database to auto-resolve user inquiries.
                </p>
                <div className="case-study-metrics-grid">
                  <div className="case-study-metric">
                    <div className="case-study-val">-50%</div>
                    <div className="case-study-lbl">Ticket Workload</div>
                  </div>
                  <div className="case-study-metric">
                    <div className="case-study-val">&lt; 3s</div>
                    <div className="case-study-lbl">Response Delay</div>
                  </div>
                  <div className="case-study-metric">
                    <div className="case-study-val">12+</div>
                    <div className="case-study-lbl">Languages Supported</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section with Scrolling Ticker (Privacy Protected) */}
      <section className="ticker-section">
        <h2 className="ticker-title">Loved by Innovators Worldwide</h2>
        <div className="ticker-wrap">
          <div className="ticker-track">
            {/* Render items twice for infinite scroll loop effect */}
            {[...testimonials, ...testimonials].map((item, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-rating">
                  {"★".repeat(5)}
                </div>
                <p className="testimonial-text">"{item.text}"</p>
                <div className="testimonial-profile">
                  <div className="testimonial-avatar">{item.initials}</div>
                  <div>
                    <div className="testimonial-author-name">{item.author}</div>
                    <div className="testimonial-author-title">{item.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
