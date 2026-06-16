"use client";

import { useState, FormEvent } from "react";
import SplitText from "./SplitText";
import RevealOnScroll from "./RevealOnScroll";
import MagneticButton from "./MagneticButton";

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
    console.log("Form submitted:", formData);
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div style={{ marginBottom: "clamp(40px, 5vw, 80px)" }}>
          <RevealOnScroll>
            <div className="eyebrow">Get In Touch</div>
          </RevealOnScroll>
        </div>

        <h2 className="contact-headline">
          <SplitText as="span" split="chars" stagger={0.025} duration={1.1}>
            LET&apos;S
          </SplitText>{" "}
          <span className="accent">
            <SplitText as="span" split="chars" stagger={0.025} duration={1.1}>
              BUILD
            </SplitText>
          </span>
          <br />
          <span className="stroke">
            <SplitText as="span" split="chars" stagger={0.025} duration={1.1}>
              SOMETHING
            </SplitText>
          </span>
          <br />
          <SplitText as="span" split="chars" stagger={0.025} duration={1.1}>
            EXTRAORDINARY.
          </SplitText>
        </h2>

        <div className="contact-layout">
          <RevealOnScroll y={40} animateChildren stagger={0.08}>
            <div className="contact-info-item">
              <span className="contact-info-label">Email</span>
              <a href="mailto:hello@sayalabs.com" className="contact-info-value" data-cursor="link">
                hello@sayalabs.com
              </a>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-label">Phone</span>
              <a href="tel:+1234567890" className="contact-info-value" data-cursor="link">
                +1 (234) 567-890
              </a>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-label">Location</span>
              <span className="contact-info-value">Tokyo, Japan &mdash; Available Worldwide</span>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-label">Hours</span>
              <span className="contact-info-value">Mon – Fri / 09:00 – 18:00 JST</span>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-label">Social</span>
              <div style={{ display: "flex", gap: "20px", marginTop: "4px" }}>
                <a href="#" className="contact-info-value" data-cursor="link">Twitter</a>
                <a href="#" className="contact-info-value" data-cursor="link">Dribbble</a>
                <a href="#" className="contact-info-value" data-cursor="link">LinkedIn</a>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll y={40} delay={0.1}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">Your Name</label>
                  <input
                    id="contact-name"
                    className="form-input"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">Email Address</label>
                  <input
                    id="contact-email"
                    className="form-input"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-company">Company</label>
                  <input
                    id="contact-company"
                    className="form-input"
                    type="text"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-budget">Budget Range</label>
                  <input
                    id="contact-budget"
                    className="form-input"
                    type="text"
                    placeholder="$10k – $50k"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Project Details</label>
                <textarea
                  id="contact-message"
                  className="form-textarea"
                  placeholder="Tell us about your project, goals, and timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <div style={{ marginTop: 32 }}>
                <MagneticButton as="button" className="btn-primary">
                  Send Message
                </MagneticButton>
              </div>
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
