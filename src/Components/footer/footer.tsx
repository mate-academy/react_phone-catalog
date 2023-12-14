import React from 'react';
import './footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section1">
          <a href="#home">
            <img src="/img/Logo.svg" alt="Logo" className="logo__image" />
          </a>
        </div>
        <div className="footer-section2">
          <ul>
            <li><a href="/github">GITHUB</a></li>
            <li><a href="/contacts">CONTACTS</a></li>
            <li><a href="/rights">RIGHTS</a></li>
          </ul>
        </div>
        <div className="footer-section3">
          <h2>Back to top</h2>
          <img src="/img/Chevron-right.svg" alt="Chevron" className="chevron" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
