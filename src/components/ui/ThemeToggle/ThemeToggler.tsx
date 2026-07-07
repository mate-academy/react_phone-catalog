import { useThemeStore } from '@/store/themeStore';
import { Sun, Moon } from 'lucide-react';
import styles from './ThemeToggler.module.scss';

export const ThemeToggler = ({ className = '' }: { className?: string }) => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className={`${styles.controlBtn} ${className}`}
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
