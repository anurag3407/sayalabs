export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        {/* Brand Column */}
        <div className="footer-brand">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                fontFamily: "var(--font-japanese)",
                fontSize: "1.3rem",
                color: "var(--crimson)",
              }}
            >
              鍛
            </span>
            <span className="footer-brand-name">SAYA LABS</span>
          </div>
          <p className="footer-brand-desc">
            A digital craft studio forging extraordinary experiences with
            precision, artistry, and an uncompromising pursuit of excellence.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="footer-col-title">Navigation</h4>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="footer-col-title">Services</h4>
          <ul className="footer-links">
            <li><a href="#services">Web Design</a></li>
            <li><a href="#services">Development</a></li>
            <li><a href="#services">Branding</a></li>
            <li><a href="#services">Motion Design</a></li>
            <li><a href="#services">UI/UX Design</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="footer-col-title">Contact</h4>
          <ul className="footer-links">
            <li><a href="mailto:hello@sayalabs.com">hello@sayalabs.com</a></li>
            <li><a href="tel:+1234567890">+1 (234) 567-890</a></li>
            <li><a href="#">Tokyo, Japan</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <span className="footer-copyright">
          © {new Date().getFullYear()} Saya Labs. All rights reserved.
        </span>
        <div className="footer-socials">
          <a href="#">Twitter</a>
          <a href="#">Dribbble</a>
          <a href="#">LinkedIn</a>
          <a href="#">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
