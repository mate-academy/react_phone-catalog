import { ButtonToUp } from '../Button/ButtonToUp';
import { Logo } from '../Logo';

import './Footer.scss';

const FOOTER_NAVIGATION = {
  github: 'https://github.com/ValeraViachalo',
  contacts: 'https://www.instagram.com/hiwrldp/',
  rights: 'https://github.com/mate-academy/react_phone-catalog',
};

export const Footer = () => (
  <footer className="footer">
    <div className="
        container
        container-footer
        footer-content"
    >
      <Logo />

      <nav className="footer__nav">
        <ul className="footer__list">
          {Object.entries(FOOTER_NAVIGATION).map(([label, link]) => (
            <li
              key={label}
              className="footer--item"
            >
              <a
                href={link}
                className="footer--item-link"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <ButtonToUp />
    </div>
  </footer>
);
