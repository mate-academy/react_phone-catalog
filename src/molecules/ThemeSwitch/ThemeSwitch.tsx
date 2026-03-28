import { cn } from '@/utils/cn';
import styles from './ThemeSwitch.module.scss';

type Props = {
  className?: string;
  theme: 'light' | 'dark';
  onToggle?: () => void;
};

const ThemeSwitch = ({ className = '', theme, onToggle }: Props) => {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      className={cn(styles.button, className)}
      aria-label={`Switch to ${nextTheme} theme`}
      onClick={onToggle}
    >
      {theme === 'dark' ? (
        <svg
          className={cn(styles.icon, styles.iconSun)}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <line x1="12" y1="3" x2="12" y2="5" strokeWidth="1.8" />
          <line x1="12" y1="19" x2="12" y2="21" strokeWidth="1.8" />
          <line x1="3" y1="12" x2="5" y2="12" strokeWidth="1.8" />
          <line x1="19" y1="12" x2="21" y2="12" strokeWidth="1.8" />
          <line x1="5.2" y1="5.2" x2="6.6" y2="6.6" strokeWidth="1.8" />
          <line x1="17.4" y1="17.4" x2="18.8" y2="18.8" strokeWidth="1.8" />
          <line x1="5.2" y1="18.8" x2="6.6" y2="17.4" strokeWidth="1.8" />
          <line x1="17.4" y1="6.6" x2="18.8" y2="5.2" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4.2" strokeWidth="1.8" fill="none" />
        </svg>
      ) : (
        <svg
          className={cn(styles.icon, styles.iconMoon)}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            className={styles.moonCrescent}
            d="M20.8 14.2A8.8 8.8 0 1 1 9.9 3.2a7.2 7.2 0 1 0 10.9 11Z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeSwitch;
