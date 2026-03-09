import { Link } from 'react-router-dom';
import { imageUrl } from '../../../utils/imageUrl';
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
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img
            src={imageUrl('icons/Logo.svg')}
            alt=""
            className={styles.logo__img}
          />
        </Link>
        <nav className={styles.menu}>
          <ul className={styles.list}>
            <li className={styles.list__item}>
              <Link to="/" className={styles.list__link}>
                Github
              </Link>
            </li>
            <li className={styles.list__item}>
              <Link to="/" className={styles.list__link}>
                Contacts
              </Link>
            </li>
            <li className={styles.list__item}>
              <Link to="/" className={styles.list__link}>
                Rights
              </Link>
            </li>
          </ul>
        </nav>
        <button type="button" className={styles.button} onClick={scrollToTop}>
          Back to top
          <div className={styles.button__icon}>
            <img
              src={imageUrl('icons/ArrowUp.svg')}
              alt=""
              className={styles.button__icon_pic}
            />
          </div>
        </button>
      </div>
    </footer>
  );
};
