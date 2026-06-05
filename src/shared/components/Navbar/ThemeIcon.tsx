import { useTheme } from '@/app/providers/ThemeContext';
import styles from './Navbar.module.scss';
import { IconMoon } from '@/shared/ui/Icons/IconMoon';
import { IconSun } from '@/shared/ui/Icons/IconSun';
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      onClick={toggleTheme}
      className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${styles.navbar__icon}`}
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <IconSun width={16} height={16} style={{ color: 'var(--text-main)' }} />
      ) : (
        <IconMoon width={16} height={16} />
      )}
    </div>
  );
};

export default ThemeToggle;
