import React from 'react';
import './Footer.scss';
import { Logo } from '../Logo';

const pagesOfMenu = [
  { name: 'Github' },
  { name: 'Contacts' },
  { name: 'Rights' },
];

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <Logo />
        <div className="footer__menu">
          <ul className="footer__menu-list">
            {pagesOfMenu.map(page => (
              <li className="footer__menu-item" key={page.name}>
                <a href={`#${page.name}`} className="footer__menu-link">
                  {page.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer__button">
          <p className="footer__button-text">Back to top</p>
          <button
            className="footer__button-back"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="../../../img/arrow-to-top.svg"
              alt="Back to top"
              className="footer__button-back-img"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
