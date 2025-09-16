import { BackToTheTop } from '../BackToTheTop/BackToTheTop';
import scss from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={scss.footer}>
      <div className={scss.footer__container}>
        <a href="/" aria-label="Link to main page">
          <svg className={scss.footer__logo}>
            <use href="/icons/icons.svg#logo-icon"></use>
          </svg>
        </a>
        <ul className={scss.footer__links}>
          <li>
            <a
              href="https://github.com/farrelzum"
              target="_blank"
              rel="noopener noreferrer"
              className={scss.footer__link}
            >
              Github
            </a>
          </li>
          <li>
            <a href="mailto:grze.pra@gmail.com" className={scss.footer__link}>
              Contacts
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={scss.footer__link}
            >
              Rights
            </a>
          </li>
        </ul>
        <BackToTheTop />
      </div>
    </footer>
  );
};
