"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <section className="section" id="contact">
      <div className="section-bg">
        <Image
          src="/images/contact_bg.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.08 }}
        />
        <div className="section-bg-overlay" />
      </div>

      <div className="section-kanji">連絡</div>

      <div className="container">
        <div className="section-header">
          <div className="section-tag">Get In Touch</div>
          <h2 className="section-title">START YOUR<br />PROJECT</h2>
          <p className="section-description">
            Ready to forge something extraordinary? Tell us about your vision
            and let&apos;s begin the journey.
          </p>
        </div>

        <div className="contact-layout">
          {/* Contact Info */}
          <div className="contact-info">
            <div className="contact-info-item">
              <span className="contact-info-label">Email</span>
              <a href="mailto:hello@sayalabs.com" className="contact-info-value">
                hello@sayalabs.com
              </a>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-label">Phone</span>
              <a href="tel:+1234567890" className="contact-info-value">
                +1 (234) 567-890
              </a>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-label">Location</span>
              <span className="contact-info-value">
                Tokyo, Japan &mdash; Available Worldwide
              </span>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-label">Working Hours</span>
              <span className="contact-info-value">
                Mon - Fri: 09:00 - 18:00 JST
              </span>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-label">Social</span>
              <div style={{ display: "flex", gap: "20px", marginTop: "4px" }}>
                <a href="#" className="contact-info-value">Twitter</a>
                <a href="#" className="contact-info-value">Dribbble</a>
                <a href="#" className="contact-info-value">LinkedIn</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  className="form-input"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  className="form-input"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="contact-company">
                  Company
                </label>
                <input
                  id="contact-company"
                  className="form-input"
                  type="text"
                  placeholder="Your Company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-budget">
                  Budget Range
                </label>
                <input
                  id="contact-budget"
                  className="form-input"
                  type="text"
                  placeholder="$10k - $50k"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">
                Project Details
              </label>
              <textarea
                id="contact-message"
                className="form-textarea"
                placeholder="Tell us about your project, goals, and timeline..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start" }}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
