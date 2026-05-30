import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { Logo } from '../Logo';
import useLanguageStore from '../../stores/useLanguageStore';
import { ArrowIcon } from '../icons/ArrowIcon';

const handleButtonClick = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};

export const Footer = () => {
  const { t } = useLanguageStore();

  return (
    <div className={styles.footer}>
      <div className={styles['footer-wrapper']}>
        <div className={styles.container}>
          <div>
            <Logo />
          </div>

          <ul className={styles.nav}>
            <li className={styles['nav-item']}>
              <Link
                to="https://github.com/VictorKomara"
                className={styles.link}
                target="blank"
              >
                GITHUB
              </Link>
            </li>
            <li className={styles['nav-item']}>
              <Link
                to="https://github.com/VictorKomara/react_phone-catalog"
                className={styles.link}
                target="blank"
              >
                {t('footer_contacts')}
              </Link>
            </li>
            <li className={styles['nav-item']}>
              <Link
                to="https://github.com/VictorKomara/react_phone-catalog"
                className={styles.link}
                target="blank"
              >
                {t('footer_rights')}
              </Link>
            </li>
          </ul>

          <div
            className={styles['button-back__wrapper']}
            onClick={handleButtonClick}
          >
            <p className={styles['button-back__label']}>
              {t('footer_back_to_top')}
            </p>

            <div className={styles['button-back']} aria-label="Scroll to top">
              <ArrowIcon direction="up" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
