import styles from './ThemeSwitcher.module.scss';
import sunIcon from '../../../../assets/icons/sun.svg';
import moonIcon from '../../../../assets/icons/moon.svg';

type Props = {
  theme: string;
  setTheme: (theme: string) => void;
};

export const ThemeSwitcher = ({ theme, setTheme }: Props) => {
  const isLight = theme === 'light';

  const toggleTheme = () => {
    setTheme(isLight ? 'dark' : 'light');
  };

  return (
    <button
      className={`${styles.switch} ${isLight ? styles.light : styles.dark}`}
      onClick={toggleTheme}
    >
      <span className={styles.icon}>
        <img
          src={sunIcon}
          alt="Sun"
        />
      </span>
      <span className={styles.icon}>
        <img
          src={moonIcon}
          alt="Moon"
        />
      </span>

      <span
        className={`${styles.thumb} ${isLight ? styles.left : styles.right}`}
      />
    </button>
  );
};
