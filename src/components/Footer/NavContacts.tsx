import { FC } from 'react';

export const NavContacts: FC = () => (
  <div className="footer__links-container">
    <a
      href="https://github.com/juliiaap/react_phone-catalog"
      target="_blank"
      rel="noreferrer"
      className="nav-link-style footer__link"
    >
      github
    </a>
    <a
      href="/"
      className="nav-link-style footer__link"
    >
      contacts
    </a>
    <a
      href="/"
      className="nav-link-style footer__link"
    >
      rights
    </a>
  </div>
);
