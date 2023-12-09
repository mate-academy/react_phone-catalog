import React from 'react';
import './footer.scss';
import Logo from './Logo.svg';
import Chevron from './Chevron.svg'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section1">
          <a href="#home">
            <img src={Logo} alt="Logo" className="logo__image" />
          </a>
        </div>
        <div className="footer-section2">
          <ul>
            <li><a href="#">GITHUB</a></li>
            <li><a href="#">CONTACTS</a></li>
            <li><a href="#">RIGHTS</a></li>
          </ul>
        </div>
        <div className="footer-section3">
          <h2>Back to top</h2>
          <img src={Chevron} alt="Chevron" className="chevron" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
