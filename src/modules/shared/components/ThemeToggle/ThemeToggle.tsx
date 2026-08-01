import cn from 'classnames';
import { useTheme } from '@shared/context';
import styles from './ThemeToggle.module.scss';

interface Props {
  label: string;
}

export const ThemeToggle: React.FC<Props> = ({ label }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={styles.toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={label}
      title={label}
      onClick={toggleTheme}
    >
      <span className={cn(styles.track, { [styles.trackOn]: isDark })}>
        <span className={styles.knob} />
      </span>
    </button>
  );
};
