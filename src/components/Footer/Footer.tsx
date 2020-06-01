import React from 'react';
import './Footer.scss';

const navListFooter = [
  {
    title: 'Github',
    link: 'https://github.com/fe-feb20-team-2',
  },
  {
    title: 'Contacts',
    link: '/contacts',
  },
  {
    title: 'rights',
    link: '/rights',
  },
];

const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <div className="footer__logo logo">
        <img src="./img/logo/LOGO.svg" alt="logo" />
      </div>
      <nav className="footer__nav nav">
        <ul className="nav__list">
          {navListFooter.map(item => (
            <li key={item.title} className="nav__item">
              <a href={item.link} className="nav__link nav__link--footer">{item.title}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="footer__button">
        <span className="label-btn">Back to top</span>
        <button
          type="button"
          className="btn-back-top"
          aria-label="Mute volume"
          onClick={() => (
            window.scrollTo({ top: 0, behavior: 'smooth' })
          )}
        />
      </div>
    </div>
  </footer>
);

export default Footer;
