import { useThemeStore } from '@/store/themeStore';
import { Sun, Moon } from 'lucide-react';
import styles from './ThemeToggler.module.scss';

export const ThemeToggler = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className={styles.controlBtn}
      title="Toggle Theme"
    >
      {theme === 'light' ? (
        <Moon size={16} strokeWidth={1.5} />
      ) : (
        <Sun size={16} strokeWidth={1.5} />
      )}
    </button>
  );
};
