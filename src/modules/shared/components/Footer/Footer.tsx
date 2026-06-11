/* eslint-disable prettier/prettier */

//#region IMPORTS
import { Link } from 'react-router-dom';

import arrowUp from '@/assets/svg/arrow-up.svg';
import logoIcon from '@/assets/svg/logo.svg';

import style from './Footer.module.scss';
import { Button } from '../ui/Button';
//#endregion

//#region STYLES
const {
  footer,

  logo,
  logoImg,

  nav,
  navList,
  navItem,
  navLink,

  scrollBlock,
  scrollText,
  scrollBtn,
} = style;
//#endregion

export const Footer = () => {
  //#region HANDLERS
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  //#endregion

  //#region RENDER
  return (
    <footer className={footer}>
      <div className="container">
        <div className={logo}>
          <Link to="/">
            <img src={logoIcon} className={logoImg} alt="Nice Gadgets logo" />
          </Link>
        </div>

        <nav className={nav}>
          <ul className={navList}>
            <li className={navItem}>
              <a
                href="https://github.com/tavorotuk/react_phone-catalog"
                className={navLink}
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li className={navItem}>
              <Link to="/contacts" className={navLink}>
                Contacts
              </Link>
            </li>
            <li className={navItem}>
              <Link to="/right" className={navLink}>
                Rights
              </Link>
            </li>
          </ul>
        </nav>

        <div className={scrollBlock}>
          <span className={scrollText}>Back to top</span>

          <Button
            variant="icon"
            className={scrollBtn}
            aria-label="Scroll to top"
            onClick={scrollToTop}
          >
            <img src={arrowUp} alt="Back to top" />
          </Button>
        </div>
      </div>
    </footer>
  );
  //#endregion
};
