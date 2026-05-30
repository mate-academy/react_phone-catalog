/* eslint-disable max-len */
import s from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { BackToTopButton } from '../../modules/shared/BackToTopButton/BackToTopButton';
import { Logo } from '../Logo/Logo';
/* eslint-enable max-len */

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.footerContent}>
        <Logo />

        <ul className={s.linkList}>
          <li className={s.linkItem}>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={s.link}
            >
              Github
            </a>
          </li>
          <li className={s.linkItem}>
            <Link to="/contacts" className={s.link}>
              Contacts
            </Link>
          </li>
          <li className={s.linkItem}>
            <Link to="/rights" className={s.link}>
              Rights
            </Link>
          </li>
        </ul>

        <div className={s.backToTopWrapper}>
          <BackToTopButton />
        </div>
      </div>
    </footer>
  );
};
