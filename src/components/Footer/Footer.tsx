import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={classNames(styles.logo, styles['logo--footer'])}>
        <Link
          to="/"
          className={classNames(
            styles.logo__icon,
            styles['logo__icon--footer'],
          )}
        />
      </div>

      <ul className={styles.list}>
        <li>
          <Link
            className={styles.list__item}
            to="https://github.com/IvanovvvIhor"
          >
            Github
          </Link>
        </li>
        <li>
          <Link className={styles.list__item} to="tel:+380667210048">
            Contacts
          </Link>
        </li>
        <li>
          <Link className={styles.list__item} to="/">
            rights
          </Link>
        </li>
      </ul>

      <div className={styles.backTop}>
        <p className={styles.backTop__title}>Back to top</p>
        <button
          className={styles.backTop__button}
          onClick={scrollToTop}
          type="button"
        />
      </div>
    </footer>
  );
};
