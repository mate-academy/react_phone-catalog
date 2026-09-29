import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { IconButton } from '../IconButton';
import './Footer.scss';

const links = [
  {
    label: 'Github',
    href: 'https://github.com/IvanVarvaruk/react_phone-catalog',
  },
  { label: 'Contacts', href: '/contacts' },
  { label: 'Rights', href: '/rights' },
];

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          <Link to="/" aria-label="Nice Gadgets, go to home page">
            <Logo />
          </Link>
        </div>

        <nav className="footer__nav">
          <ul className="footer__nav-list">
            {links.map(link => (
              <li key={link.label}>
                <a href={link.href} className="footer__nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__back-to-top">
          <span className="footer__back-to-top-label">Back to top</span>
          <IconButton
            icon="chevron-up"
            ariaLabel="Back to top"
            onClick={scrollToTop}
          />
        </div>
      </div>
    </footer>
  );
};
