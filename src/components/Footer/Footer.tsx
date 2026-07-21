import { Logo } from '../Logo';
import styles from './Footer.module.scss';
import classNames from 'classnames';

const ARROW_TOP_PATH =
  'M3.52876 10.4712C3.26841 10.2109 3.26841 9.78878 ' +
  '3.52876 9.52843L7.52876 5.52843C7.78911 5.26808 ' +
  '8.21122 5.26808 8.47157 5.52843L12.4716 9.52843C12.7319 ' +
  '9.78878 12.7319 10.2109 12.4716 10.4712C12.2112 ' +
  '10.7316 11.7891 10.7316 11.5288 10.4712L8.00016 ' +
  '6.94265L4.47157 10.4712C4.21122 10.7316 3.78911 ' +
  '10.7316 3.52876 10.4712Z';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={classNames(styles.footer__content, 'container')}>
        <div className={styles.footer__logo}>
          <Logo />
        </div>

        <nav className={styles.footer__nav}>
          <ul className={styles.footer__list}>
            <li>
              <a
                className={styles.footer__link}
                href="https://github.com/chumachenkoUA/react_phone-catalog"
              >
                Github
              </a>
            </li>
            <li>
              <a className={styles.footer__link} href="#">
                Contacts
              </a>
            </li>
            <li>
              <a className={styles.footer__link} href="#">
                Rights
              </a>
            </li>
          </ul>
        </nav>

        <button
          className={styles.footer__backToTop}
          type="button"
          onClick={scrollToTop}
        >
          <span className={styles.footer__backToTopText}>Back to top</span>
          <span className={styles.footer__backToTopIcon} aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d={ARROW_TOP_PATH}
                fill="currentColor"
              />
            </svg>
          </span>
        </button>
      </div>
    </footer>
  );
};
