import { useTheme } from '../../../hooks/context/useTheme';
import { ThemeChekBox } from '../../UI/Inputs/ThemeChekBox';
import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = () => {
  const { theme, toogleTheme } = useTheme();
  return (
    <div className={styles.switcher}>
      <ThemeChekBox checked={theme === 'dark'} onChange={toogleTheme} />
    </div>
  );
};
