import { Link } from 'react-router-dom';
import { imageUrl } from '../../../utils/imageUrl';
import { scrollToTop } from '../../../utils/scrollToTop';
import styles from './Footer.module.scss';
import { useTheme } from '../../../hooks/useTheme';

export const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img
            src={
              theme === 'dark'
                ? imageUrl('icons/Logo_white.svg')
                : imageUrl('icons/Logo.svg')
            }
            alt=""
            className={styles.logo__img}
          />
        </Link>
        <nav className={styles.menu}>
          <ul className={styles.list}>
            <li className={styles.list__item}>
              <Link
                to="https://github.com/HiBlurryface"
                className={styles.list__link}
              >
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
              style={{ transform: 'rotate(270deg)' }}
              src={
                theme === 'dark'
                  ? imageUrl('icons/Arrow_white.svg')
                  : imageUrl('icons/ArrowRight.svg')
              }
              alt=""
              className={styles.button__icon_pic}
            />
          </div>
        </button>
      </div>
    </footer>
  );
};
