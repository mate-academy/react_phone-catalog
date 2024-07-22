import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import styles from './Footer.module.scss';
import btnStyles from '../../styles/buttons.module.scss';
import iconStyles from '../../styles/icons.module.scss';
import gStyles from '../../styles/general.module.scss';
import { Nav } from '../Nav';
import { Logo } from '../Logo';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

const backToTop = () => {
  window.scrollTo({ top: 0 });
};

export const Footer = () => {
  const { t } = useTranslation();
  const [showBackToTop, setShowBackToTop] = useState(true);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const contentHeight = document.documentElement.scrollHeight;
      const screen = window.innerHeight;

      setShowBackToTop(contentHeight > screen * 1.5);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <footer className={styles.block}>
      <div className={gStyles.container}>
        <div className={styles.content}>
          <Logo footer />

          <Nav footer />

          <div
            className={classNames(styles.backToTop, {
              [styles.backToTop_m_hide]: !showBackToTop,
            })}
          >
            <button
              type="button"
              className={btnStyles.backToTop}
              onClick={backToTop}
              title={t(TRANSLATIONS.footer.backToTop.title)}
              aria-label={t(TRANSLATIONS.footer.backToTop.ariaLabel)}
            >
              {t(TRANSLATIONS.footer.backToTop.text)}
            </button>

            <button
              type="button"
              className={`${btnStyles.block} ${btnStyles.slider} ${btnStyles.squareSm}`}
              onClick={backToTop}
              title={t(TRANSLATIONS.footer.backToTop.title)}
              aria-label={t(TRANSLATIONS.footer.backToTop.ariaLabel)}
            >
              <span
                className={`${iconStyles.block} ${iconStyles.arrowUp}`}
              ></span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
