import { useTheme } from '../../context';
import { Icon } from '../Icon';
import styles from './ThemeSwitch.module.scss';

export const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={styles['theme-switch']}
      aria-label="Switch color theme"
      onClick={toggleTheme}
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
    </button>
  );
};
