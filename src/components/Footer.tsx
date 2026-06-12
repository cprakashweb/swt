import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Download } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`PWA install prompt outcome: ${outcome}`);
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  const handleLinkClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrap">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand">
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Sketch Web Tech</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '16px' }}>
              Crafting Intelligent Digital Experiences. Building fast, performant, and premium web apps, custom software solutions, SAP implementations, and customized AI models.
            </p>
            {isInstallable && (
              <button className="btn btn-secondary" onClick={handleInstallClick} style={{ width: 'fit-content', padding: '8px 16px', fontSize: '0.8rem' }}>
                <Download size={14} /> Install Web App (PWA)
              </button>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-links-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#home" className="footer-link" onClick={() => handleLinkClick('home')}>Home</a>
              </li>
              <li>
                <a href="#services" className="footer-link" onClick={() => handleLinkClick('services')}>Services</a>
              </li>
              <li>
                <a href="#about" className="footer-link" onClick={() => handleLinkClick('about')}>About Us</a>
              </li>
              <li>
                <a href="#contact" className="footer-link" onClick={() => handleLinkClick('contact')}>Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Address & Contact */}
          <div>
            <h4 className="footer-links-title">Connect With Us</h4>
            <ul className="footer-links-list" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <MapPin size={18} className="text-gradient" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>C-042C 4th Floor Supermart, DLF Phase -IV, Gurugram, HR - 122009</span>
              </li>
              <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Phone size={16} className="text-gradient" />
                <a href="https://wa.me/918396914656" target="_blank" rel="noopener noreferrer" className="footer-link">+91 83969 14656</a>
              </li>
              <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Mail size={16} className="text-gradient" />
                <a href="mailto:info@sketchwebtech.com" className="footer-link">info@sketchwebtech.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} Sketch Web Tech. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#privacy" className="footer-link" onClick={() => handleLinkClick('about')}>Privacy Policy</a>
            <a href="#terms" className="footer-link" onClick={() => handleLinkClick('about')}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
