import footer from './Footer.module.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { ScrollToSectionContext } from '../../contexts/ScrollToSectionContext';

export const Footer = () => {
  const { scrollToSection } = React.useContext(ScrollToSectionContext);

  return (
    <footer className={footer.footer}>
      <div className="container">
        <div className={footer.footer__content}>
          <div className={footer.footer__logo__container}>
            <Link
              to="/"
              className={footer.footer__logo}
              onClick={() => scrollToSection('top')}
            ></Link>
          </div>

          <nav className={cn(footer.footer__nav, footer.nav)}>
            <ul className={footer.nav__list}>
              <li className={footer.nav__item}>
                <Link to="/" className={footer.nav__link}>
                  Github
                </Link>
              </li>
              <li className={footer.nav__item}>
                <Link to="/phones" className={footer.nav__link}>
                  Contacts
                </Link>
              </li>
              <li className={footer.nav__item}>
                <Link to="/tablets" className={footer.nav__link}>
                  rights
                </Link>
              </li>
            </ul>
          </nav>
          <button
            type="button"
            className={footer['footer__to-top']}
            onClick={() => scrollToSection('top')}
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};
