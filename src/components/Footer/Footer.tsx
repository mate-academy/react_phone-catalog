import { useTranslation } from 'react-i18next';
import { SliderButton } from '../../shared/UI/Buttons/SliderButton';
import { Logo } from '../../shared/UI/Logo';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__logo}>
          <Logo />
        </div>

        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            <li>
              <a href="" className={styles.nav__link}>
                {t('footer.github')}
              </a>
            </li>
            <li>
              <a href="" className={styles.nav__link}>
                {t('footer.contacts')}
              </a>
            </li>
            <li>
              <a href="" className={styles.nav__link}>
                {t('footer.rights')}
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.backToTopBlock}>
          <span className={styles.backToTopLable}>
            {t('footer.back_to_top')}
          </span>
          <SliderButton
            onClick={scrollToTop}
            disabled={false}
            direction="up"
            className={styles.backToTopButton}
          />
        </div>
      </div>
    </footer>
  );
};
