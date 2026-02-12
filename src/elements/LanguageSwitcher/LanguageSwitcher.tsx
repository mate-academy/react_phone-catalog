import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.scss';
import { useIsMobile } from '../../utils/hooks/UI/useIsMobile';
import classNames from 'classnames';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const isMobile = useIsMobile();

  const changeLanguage = (lng: 'en' | 'uk') => {
    i18n.changeLanguage(lng);
  };

  const isActive = (lng: 'en' | 'uk') => i18n.resolvedLanguage === lng;

  const mobileActiveButtonClass = (baseClass: string) => {
    return isActive(baseClass === 'en' ? 'en' : 'uk')
      ? `${styles.languageButtonMobile} ${styles['languageButtonMobile--active']}`
      : styles.languageButtonMobile;
  };

  const mobileLayout = (
    <div className={styles.languageSwitcher}>
      <button
        className={mobileActiveButtonClass('en')}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
      <button
        className={mobileActiveButtonClass('uk')}
        onClick={() => changeLanguage('uk')}
      >
        UA
      </button>
    </div>
  );

  const desktopLayout = (
    <button
      className={classNames(styles.languageButtonDesktop, 'button')}
      onClick={() => changeLanguage(i18n.language === 'uk' ? 'en' : 'uk')}
    >
      {i18n.language === 'uk' ? 'UA' : 'EN'}
    </button>
  );

  return <>{isMobile ? mobileLayout : desktopLayout}</>;
};
