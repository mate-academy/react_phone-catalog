import { Link } from 'react-router-dom';
import { ArrowButton } from '../Arrow/ArrowButton';
import { Logo } from '../Logo';
import styles from './Footer.module.scss';
import { useAppState } from '../../contexts/AppContext';
import { getTranslation } from '../../modules/shared/utils/getTranslation';

export const Footer: React.FC = () => {
  const { language } = useAppState();
  const t = getTranslation(language);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logo}>
          <Logo location="footer" />
        </div>

        <ul className={styles.list}>
          <li className="uppercaseText">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className={styles.listLink}
              to="https://github.com/Mihakurochkin/"
            >
              {t.footer.github}
            </Link>
          </li>
          <li className="uppercaseText">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className={styles.listLink}
              to="/"
            >
              {t.footer.contacts}
            </Link>
          </li>
          <li className="uppercaseText">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className={styles.listLink}
              to="/"
            >
              {t.footer.rights}
            </Link>
          </li>
        </ul>

        <div className={styles.backToTop}>
          <p className="smallText">{t.footer.backToTop}</p>

          <ArrowButton
            direction="up"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
          />
        </div>
      </div>
    </footer>
  );
};
