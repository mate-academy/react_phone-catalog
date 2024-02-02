/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Footer.scss';
import '../styles/logo.scss';

const NAVIGATES = ['github', 'contacts', 'rights'];
const githubLink = 'https://github.com/yurii-shkrobut-m';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Link to="/" className="logo" />

      <div className="footer__nav-block">
        <ul className="footer__list">
          {NAVIGATES.map(item => (
            <li key={item}>
              <Link
                to={item === 'github' ? githubLink : item}
                className="footer__link"
                target={item === 'github' ? '_blank' : '_self'}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer__back-top">
        <span className="footer__back-top--text">
          Back to top
        </span>

        <a href="#header" className="footer__back-top--link" />
      </div>
    </footer>
  );
};
