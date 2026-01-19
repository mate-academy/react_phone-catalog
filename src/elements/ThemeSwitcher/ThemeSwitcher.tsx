import styles from './ThemeSwitcher.module.scss';
import { useIsMobile } from '../../utils/hooks/UI/useIsMobile';
import classNames from 'classnames';
import { useTheme } from '../../utils/hooks/Context/useTheme';

export const ThemeSwitcher = () => {
  const isMobile = useIsMobile();
  const { currentTheme, toggleTheme } = useTheme();

  const isActive = (theme: 'light' | 'dark') => currentTheme === theme;

  const mobileActiveButtonClass = (baseClass: string) => {
    return isActive(baseClass === 'light' ? 'light' : 'dark')
      ? `${styles.themeButtonMobile} ${styles['themeButtonMobile--active']}`
      : styles.themeButtonMobile;
  };

  const mobileLayout = (
    <div className={styles.themeSwitcher}>
      <button
        className={mobileActiveButtonClass('light')}
        onClick={() => toggleTheme()}
      >
        Light
      </button>
      <button
        className={mobileActiveButtonClass('dark')}
        onClick={() => toggleTheme()}
      >
        Dark
      </button>
    </div>
  );

  const desktopLayout = (
    <button
      className={classNames(styles.themeButtonDesktop, 'button')}
      onClick={toggleTheme}
    >
      {currentTheme === 'dark' ? (
        <span className="icon icon--dark-theme" />
      ) : (
        <span className="icon icon--light-theme" />
      )}
    </button>
  );

  return <>{isMobile ? mobileLayout : desktopLayout}</>;
};
