import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';

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
  <footer className="Footer">
    <div className="Footer__Container">
      <Link to="/" className="Footer__Logo Logo">
        <img src="./img/logo/LOGO.svg" alt="logo" />
      </Link>
      <nav className="Footer__Nav Nav">
        <ul className="Nav__List">
          {navListFooter.map(item => (
            <li key={item.title} className="Nav__Item">
              <a href={item.link} className="Nav__Link Nav__Link--footer">{item.title}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="Footer__Button">
        <label className="Label__Btn" htmlFor="username">
          <span className="Label__Btn-Text">Back to top</span>
          <input
            type="button"
            id="username"
            className="Btn__Back--top"
            aria-label="Mute volume"
            onClick={() => (
              window.scrollTo({ top: 0, behavior: 'smooth' })
            )}
          />
        </label>
      </div>
    </div>
  </footer>
);

export default Footer;
