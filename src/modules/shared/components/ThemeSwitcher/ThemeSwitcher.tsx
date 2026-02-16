import styles from './ThemeSwitcher.module.scss';
import { useContext } from 'react';
import { ThemeContext } from '../../_store/ThemeProvider';
import { Moon, Sun } from 'lucide-react';
import { Themes } from '../../../../_types/themes';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className={styles.button} onClick={toggleTheme}>
      <div className={styles.icon}>
        {theme === Themes.light ? <Moon size={20} /> : <Sun size={20} />}
      </div>
    </button>
  );
};
