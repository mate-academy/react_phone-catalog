import classNames from 'classnames';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

export const Footer = () => {
  return (
    <section className={styles.footer} id="footer">
      <a href="#" className={styles.footer__link}>
        <img
          src="./img/icons/logo.svg"
          className={classNames('logo', styles.footer__icon)}
          alt="logo"
        />
      </a>

      <nav className={classNames(styles.footer__nav, styles.nav)}>
        <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            <a href="#" className="nav__link uppercase-text">
              Github
            </a>
          </li>
          <li className={styles.nav__item}>
            <a href="#" className="nav__link uppercase-text">
              Contacts
            </a>
          </li>
          <li className={styles.nav__item}>
            <a href="#" className="nav__link uppercase-text">
              rights
            </a>
          </li>
        </ul>
      </nav>

      <div className={styles.footer__buttons}>
        <p className="small-text">Back to top</p>
        <a href="#" className={classNames(styles.footer__btn)}>
          <FontAwesomeIcon icon={faChevronUp} />
        </a>
      </div>
    </section>
  );
};
