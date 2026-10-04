import cn from 'classnames';
import { useTheme } from '../../context/ThemeContext';
import { Icon } from '../Icon';
import styles from './ThemeToggle.module.scss';

interface Props {
  className?: string;
}

// layout (display, size) is set by the parent through className
export const ThemeToggle = ({ className }: Props) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={cn(styles.button, className)}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={toggleTheme}
    >
      <Icon name={isDark ? 'sun' : 'moon'} />
    </button>
  );
};
