import styles from './Footer.module.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.footer__link, {
    [styles['is-active']]: isActive,
  });

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <NavLink to="/">
          <img
            className={styles.footer__logo}
            src="/img/icons/logo.svg"
            alt="Icon"
          />
        </NavLink>

        <nav className={styles.footer__links}>
          <a
            href="https://github.com/Alya-ya/react_phone-catalog"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footer__link}
          >
            GITHUB
          </a>

          <NavLink to="/contacts" end className={getLinkClass}>
            CONTACTS
          </NavLink>
          <NavLink to="/rights" end className={getLinkClass}>
            RIGHTS
          </NavLink>
        </nav>

        <div className={styles.footer__back_to_top_container}>
          <button
            type="button"
            className={styles.footer__back_to_top}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to top
            <div className={styles.footer__back_to_top_icon}>
              <img
                className={styles.footer__back_to_top_icon__img}
                src="/img/icons/button.svg"
                alt="Button"
              />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
