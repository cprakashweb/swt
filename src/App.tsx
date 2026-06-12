import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { MessageSquare } from 'lucide-react';
import './App.css';


const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  // States for Callback Request form
  const [callbackName, setCallbackName] = useState('');
  const [callbackContact, setCallbackContact] = useState('');
  const [isSubmittingCallback, setIsSubmittingCallback] = useState(false);
  const [callbackStatus, setCallbackStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackName.trim() || !callbackContact.trim()) return;

    setIsSubmittingCallback(true);
    setCallbackStatus(null);

    try {
      // Obfuscated cprakashweb@gmail.com
      const targetEmail = atob("Y3ByYWthc2h3ZWJAZ21haWwuY29t");
      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: callbackName,
          contact: callbackContact,
          _subject: `New Callback Request from ${callbackName}`
        })
      });

      const result = await response.json();
      if (response.ok && result.success === "true") {
        setCallbackStatus({ type: 'success', message: 'Submitted! We will contact you shortly.' });
        setCallbackName('');
        setCallbackContact('');
        // Auto-close sidebar after 2.5 seconds on success
        setTimeout(() => {
          setIsRightSidebarOpen(false);
          setCallbackStatus(null);
        }, 2500);
      } else {
        throw new Error(result.message || "Failed to submit callback");
      }
    } catch (err) {
      console.error("Callback submission error:", err);
      setCallbackStatus({ type: 'error', message: 'Failed to submit request. Please try again.' });
    } finally {
      setIsSubmittingCallback(false);
    }
  };

  // Intersection Observer for scroll-reveal animations (with timeout for React DOM mounting)
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal-active');
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      const revealElements = document.querySelectorAll('.reveal-item');
      revealElements.forEach((el) => observer?.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [activeTab]);

  // Dynamic SEO and Title Updating Hook
  useEffect(() => {
    let title = "Sketch Web Tech | Crafting Intelligent Digital Experiences";
    let description = "Sketch Web Tech is a premier IT services, software development, and AI consultation firm. We design and build custom software, web applications, SAP solutions, and intelligent AI integrations.";

    switch (activeTab) {
      case 'home':
        title = "Sketch Web Tech | Crafting Intelligent Digital Experiences";
        description = "Sketch Web Tech is a premier IT services, software development, and AI consultation firm. We design and build custom software, web applications, SAP solutions, and intelligent AI integrations.";
        break;
      case 'services':
        title = "Services | Sketch Web Tech - Customized AI, SAP & Web Apps";
        description = "Discover our comprehensive range of services: Customized AI solutions, existing app AI integration, SAP ERP implementations, custom PWAs, and full-stack software solutions.";
        break;
      case 'about':
        title = "About Us | Sketch Web Tech - 12 Years of Tech Evolution";
        description = "Learn about our journey over the past 12 years. Delivering custom software across static sites, WordPress, E-Commerce, SaaS, and cutting-edge AI systems.";
        break;
      case 'contact':
        title = "Contact Us | Sketch Web Tech - Office DLF Gurugram";
        description = "Reach out to our team in Gurugram, and send a project inquiry to collaborate with us on your digital requirements.";
        break;
      default:
        break;
    }

    document.title = title;

    // Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  }, [activeTab]);

  // Render current tab component
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'services':
        return <Services />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>

      {/* Navbar Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} onToggleSidebar={() => setIsRightSidebarOpen(!isRightSidebarOpen)} />

      {/* Main Page Content */}
      <main style={{ flexGrow: 1 }}>
        {renderContent()}
      </main>

      {/* Sticky Widgets Section */}
      
      {/* 1. Desktop Sticky Vertical Social Sidebar */}
      <div className="sticky-social-bar-desktop">
        <a href="https://wa.me/918396914656" className="sticky-social-icon whatsapp" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
          <MessageSquare size={20} />
        </a>
        <a href="https://linkedin.com" className="sticky-social-icon linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
          <LinkedinIcon />
        </a>
        <a href="https://twitter.com" className="sticky-social-icon twitter" target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile">
          <TwitterIcon />
        </a>
      </div>

      {/* 2. Mobile Sticky Bottom Social Footer Bar */}
      <div className="sticky-social-bar-mobile">
        <a href="https://wa.me/918396914656" className="mobile-sticky-btn whatsapp" target="_blank" rel="noopener noreferrer">
          <MessageSquare size={16} /> WhatsApp Chat
        </a>
        <a href="https://linkedin.com" className="mobile-sticky-btn linkedin" target="_blank" rel="noopener noreferrer">
          <LinkedinIcon style={{ width: 16, height: 16, marginRight: 4 }} /> LinkedIn
        </a>
      </div>

      {/* Hidden layout trigger for pages to request contact tab navigation */}
      <button id="contact-nav-trigger" style={{ display: 'none' }} onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />

      {/* Right Sidebar Drawer */}
      <div className={`right-sidebar-overlay ${isRightSidebarOpen ? 'active' : ''}`} onClick={() => setIsRightSidebarOpen(false)} />
      <div className={`right-sidebar-drawer ${isRightSidebarOpen ? 'open' : ''}`}>
        <button className="right-sidebar-close" onClick={() => setIsRightSidebarOpen(false)}>✕</button>
        
        <h3 className="sidebar-heading text-gradient">Sketch Web Tech</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <strong>"Crafting Intelligent Digital Experiences"</strong><br /><br />
          We are an agile IT consulting firm specializing in customized AI solutions, SAP implementations, and high-performance React PWAs.
        </p>

        {/* Mini stats */}
        <div className="sidebar-stats-row">
          <div>
            <div className="sidebar-stat-val">14+</div>
            <div className="sidebar-stat-lbl">Years Exp</div>
          </div>
          <div>
            <div className="sidebar-stat-val">100+</div>
            <div className="sidebar-stat-lbl">Clients</div>
          </div>
          <div>
            <div className="sidebar-stat-val">30+</div>
            <div className="sidebar-stat-lbl">PWAs</div>
          </div>
        </div>

        {/* Quick Contact Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
          <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>Quick Details</h4>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <span>📍</span>
            <span>C-042C 4th Floor Supermart, DLF Phase -IV, Gurugram, HR - 122009</span>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '0.85rem' }}>
            <span>📞</span>
            <a href="https://wa.me/918396914656" target="_blank" rel="noopener noreferrer" style={{ color: '#25d366', textDecoration: 'underline' }}>
              +91 83969 14656 (WhatsApp)
            </a>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <span>✉️</span>
            <a href="mailto:info@sketchwebtech.com" style={{ color: 'var(--text-secondary)' }}>info@sketchwebtech.com</a>
          </div>
        </div>

        {/* Callback Request mini form */}
        <div style={{ marginTop: '20px', borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
          <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--text-primary)' }}>Request a Callback</h4>
          
          {callbackStatus && (
            <div className={`callback-alert ${callbackStatus.type}`} style={{ marginBottom: '12px' }}>
              <span>{callbackStatus.type === 'success' ? '✓' : '⚠'}</span>
              <span>{callbackStatus.message}</span>
            </div>
          )}

          <form onSubmit={handleCallbackSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="Name" 
                required 
                value={callbackName}
                onChange={(e) => setCallbackName(e.target.value)}
                disabled={isSubmittingCallback}
                style={{ width: '100%', padding: '10px', background: 'rgba(3,7,18,0.5)', border: '1px solid var(--glass-border)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }} 
              />
              <input 
                type="text" 
                placeholder="Email / Phone" 
                required 
                value={callbackContact}
                onChange={(e) => setCallbackContact(e.target.value)}
                disabled={isSubmittingCallback}
                style={{ width: '100%', padding: '10px', background: 'rgba(3,7,18,0.5)', border: '1px solid var(--glass-border)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }} 
              />
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={isSubmittingCallback}
                style={{ padding: '8px 12px', fontSize: '0.8rem', justifyContent: 'center' }}
              >
                {isSubmittingCallback ? (
                  <>
                    <span className="btn-spinner" style={{ marginRight: '8px' }}></span> Submitting...
                  </>
                ) : (
                  'Call Me Back'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Details */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
