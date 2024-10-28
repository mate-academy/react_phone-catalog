import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../public/img/logo/Logo.svg';
import arrowUp from '../../public/img/icons/ArrowUp.svg';
import '../App.scss';
import { FooterProps } from '../types/Footer';

export const Footer: React.FC<FooterProps> = ({ topRef }) => {
  // const topRef = useRef<HTMLDivElement | null>(null);

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <a href="/" className="footer__logo">
          <img src={logo} alt="Logo" />
        </a>

        <nav className="footer__nav">
          <ul className="footer__nav-list">
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__nav-link"
              >
                GITHUB
              </a>
            </li>
            <li>
              <NavLink to="/contacts" className="footer__nav-link">
                CONTACTS
              </NavLink>
            </li>
            <li>
              <NavLink to="/rights" className="footer__nav-link">
                RIGHTS
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="footer__elements">
          <p className="footer__text">Back to top</p>
          <button onClick={scrollToTop} className="footer__button">
            <img src={arrowUp} alt="Arrow up" className="footer__image" />
          </button>
        </div>
      </div>
    </footer>
  );
};
