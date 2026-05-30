import { BackToTheTop } from './BackToTheTop';
import scss from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={scss.footer}>
      <div className={scss.footer__container}>
        <a href={`${import.meta.env.BASE_URL}`} aria-label="Go to home">
          <svg
            className={scss.footer__logo}
            aria-hidden="true"
            focusable="false"
          >
            <use
              href={`${import.meta.env.BASE_URL}icons/icons.svg#logo-icon`}
            ></use>
          </svg>
        </a>
        <nav aria-label="Footer">
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
        </nav>

        <BackToTheTop />
      </div>
    </footer>
  );
};
