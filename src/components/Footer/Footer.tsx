import footer from './Footer.module.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { ScrollToSectContext } from '../../contexts/ScrollToSectContext';

export const Footer = () => {
  const { scrollToSect } = React.useContext(ScrollToSectContext);

  return (
    <footer className={footer.footer}>
      <div className="frame">
        <div className="container">
          <div className={footer.footer__content}>
            <div className={footer.footer__logo__container}>
              <Link
                to="/"
                className={footer.footer__logo}
                onClick={() => scrollToSect('top')}
              ></Link>
            </div>

            <nav className={cn(footer.footer__nav, footer.nav)}>
              <ul className={footer.nav__list}>
                <li className={footer.nav__item}>
                  <Link
                    to="https://github.com/PolianskyiDmytro/react_phone-catalog"
                    className={footer.nav__link}
                  >
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
              onClick={() => scrollToSect('top')}
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
