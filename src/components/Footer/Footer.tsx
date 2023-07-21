import React from 'react';
import { NavItem } from '../NavItem/NavItem';
import { FOOTER_NAV_ITEMS, FOOTER_SOCIAL_ITEMS } from '../../helpers/NavLinks';

import './Footer.scss';

export const Footer: React.FC = React.memo(() => (
  <footer
    className="page__section footer"
  >
    <div className="container">
      <div className="grid">
        <div className="footer__content">
          <p className="footer__lang">
            English
          </p>

          <nav className="footer__nav">
            <ul className="footer__nav-list">
              {FOOTER_NAV_ITEMS.map(item => (
                <NavItem
                  item={item}
                  isDesktop
                  defaultLiClass="footer__nav-list-item"
                  defaultLinkClass="footer__nav-list-link"
                  key={item}
                />
              ))}
            </ul>
          </nav>

          <ul className="footer__social">
            {FOOTER_SOCIAL_ITEMS.map(item => (
              <NavItem
                item={item}
                isDesktop
                defaultLiClass="footer__social-list-item"
                defaultLinkClass="footer__social-list-link"
                key={item}
              />
            ))}
          </ul>

          <p className="footer__copyright">
            © Kuroso, 2023
            <br />
            Design & Development
            {' - '}
            <a
              className="footer__copyright-link"
              href="https://github.com/Vo7kov"
            >
              Jegor Volkov
            </a>
            <br />
            <a
              href="https://github.com/Vo7kov/react_cloth-catalog"
              className="footer__copyright-link"
              target="_blank"
              rel="noreferrer"
            >
              Link to repo
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
));
