import { useContext } from 'react';
import { ColorThemeContext } from '../ContextProviders';
import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = () => {
  const { theme, colorThemeToggler } = useContext(ColorThemeContext);

  return (
    <div className={styles.container}>
      <div className={styles.root}>
        <label className={styles.switch} htmlFor="toggler">
          {' '}
          <input
            id="toggler"
            type="checkbox"
            onClick={colorThemeToggler}
            checked={theme === 'light'}
            readOnly
          />
          <span className={styles.slider} />
          <span className={styles.wave} />
        </label>
      </div>
    </div>

  );
};
