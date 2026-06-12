import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, Sparkles } from 'lucide-react';

export const Contact: React.FC = () => {
  // Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'AI Consultation',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form Validation and Submission
  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) tempErrors.message = "Message is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setIsSubmitted(false);

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
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          _subject: `New Project Inquiry: ${formData.service}`
        })
      });

      const result = await response.json();
      if (response.ok && result.success === "true") {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          service: 'AI Consultation',
          message: ''
        });
      } else {
        throw new Error(result.message || "Failed to send message via form service");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError("Unable to submit. Please try again or email info@sketchwebtech.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container section">
      {/* Intro Header */}
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }} className="text-gradient">Contact Us</h1>
        <p style={{ fontSize: '1.1rem' }}>
          Have an idea or project? Let's build it together. Get in touch with our team in Gurugram or chat with us directly.
        </p>
      </div>

      <div className="contact-grid">
        {/* Left Side: Details & Interactive Sketchpad */}
        <div className="contact-info-panel">
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>Office Address & Info</h3>

            <div className="contact-detail-row">
              <div className="contact-detail-icon">
                <MapPin size={20} />
              </div>
              <div>
                <div className="contact-detail-label">Headquarters</div>
                <div className="contact-detail-value">
                  C-042C 4th Floor Supermart, DLF Phase -IV, Gurugram, HR - 122009
                </div>
              </div>
            </div>

            <div className="contact-detail-row">
              <div className="contact-detail-icon">
                <Phone size={20} />
              </div>
              <div>
                <div className="contact-detail-label">WhatsApp Quick Chat</div>
                <div className="contact-detail-value">
                  <a
                    href="https://wa.me/918396914656"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#25d366', textDecoration: 'underline', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    +91 83969 14656 (Direct Link)
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-detail-row">
              <div className="contact-detail-icon">
                <Mail size={20} />
              </div>
              <div>
                <div className="contact-detail-label">General Inquiry</div>
                <div className="contact-detail-value">
                  <a href="mailto:info@sketchwebtech.com" style={{ color: 'var(--accent-cyan)' }}>info@sketchwebtech.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Mock/Embed */}
          <div className="map-frame">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.9715560943715!2d77.0805178!3d28.4653556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18de709cdcc7%3A0xc3c5093e1577c3cd!2sSupermart%201%20Gurgaon!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              title="Sketch Web Tech Location Map"
            ></iframe>
          </div>

        </div>

        {/* Right Side: Form Submission */}
        <div>
          <div className="glass-card">
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Send Us a Message</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Fill in your contact details, select the service area, and let us know what you need.
            </p>

            {isSubmitted && (
              <div className="success-alert">
                <Sparkles size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
                <strong>Success!</strong> Your inquiry has been sent. Our team will get back to you within 24 hours.
              </div>
            )}

            {submitError && (
              <div className="success-alert" style={{ background: 'rgba(239, 68, 68, 0.15)', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#f87171' }}>
                <strong>Error:</strong> {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={isSubmitting}
                />
                {errors.name && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isSubmitting}
                />
                {errors.email && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Select Service Area</label>
                <select
                  className="form-input"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  style={{ background: '#030712' }}
                  disabled={isSubmitting}
                >
                  <option value="AI Consultation">Customized AI Solutions</option>
                  <option value="AI Integration">AI Integration in Existing Apps</option>
                  <option value="SAP ERP Setup">SAP ERP Solutions & Consulting</option>
                  <option value="Web App Development">Web Applications (PWA)</option>
                  <option value="Website Design">Website UI/UX Design</option>
                  <option value="E-Commerce Solutions">E-Commerce Development</option>
                  <option value="IT Services">IT Services & Cloud Hosting</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Project Details / Message</label>
                <textarea
                  className="form-input"
                  placeholder="Briefly describe your requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={isSubmitting}
                />
                {errors.message && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.message}</span>}
              </div>

              <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%', justifyContent: 'center' }}>
                {isSubmitting ? (
                  <>
                    <span className="btn-spinner" style={{ marginRight: '8px' }}></span> Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send Project Inquiry
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
