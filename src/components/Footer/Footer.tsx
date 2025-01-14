import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import cl from './Footer.module.scss';
import {
  ArrowButton,
  ArrowButtonDirection,
  ArrowButtonOrigin,
} from '../HomePage/ArrowButton';

export const Footer = () => {
  return (
    <div className="container container__footer">
      <footer className={cl.footer}>
        <Logo />

        <ul className={cl.footer__links}>
          <li>
            <Link
              to="https://github.com/MaksymMohyla"
              target="_blank"
              className={cl.footer__link}
            >
              GITHUB
            </Link>
          </li>
          <li>
            <Link
              to="https://www.linkedin.com/"
              target="_blank"
              className={cl.footer__link}
            >
              CONTACTS
            </Link>
          </li>
          <li>
            <Link to="/" target="_blank" className={cl.footer__link}>
              RIGHTS
            </Link>
          </li>
        </ul>

        <div className={cl.backTopContainer}>
          <p className={cl.backTopContainer__text}>Back to top</p>
          <ArrowButton
            direction={ArrowButtonDirection.UP}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
            origin={ArrowButtonOrigin.ONFOOTER}
          />
        </div>
      </footer>
    </div>
  );
};
