import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const footerLinks = [
  {
    link: 'GITHUB',
    url: 'https://github.com/fe-feb20-team6/react_phone-catalog',
  },
  {
    link: 'CONTACTS',
    url: '#',
  },
  {
    link: 'RIGHTS',
    url: '#',
  },
];

export const Footer = () => {
  return (
    <footer className="Footer">
      <div className="Footer__left">
        <Link to="/home">
          <img src="./LOGO.svg" alt="logo" />
        </Link>
      </div>
      <div className="Footer__middle">
        <ul className="Footer__list">
          {footerLinks.map(({ link, url }) => (
            <li
              key={link}
              className="Footer__item"
            >
              <a className="nav__link" href={url}>
                {link}
              </a>
            </li>
          ))}
        </ul>

      </div>
      <div className="Footer__left">
        <p className="Footer__backTo">Back to top</p>
        <button
          type="button"
          className="Footer__backhome"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          { }
        </button>

      </div>
    </footer>
  );
};
