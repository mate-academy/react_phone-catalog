import { useContext } from 'react';
import styles from './Button.module.scss';
import { ThemeContext } from '../../../../ThemeProvider';

export const Button = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      className={styles.button}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      <span className={styles.text}>Back to top</span>

      <div className={styles.circle}>
        <img src={theme === 'dark' ? '
          ' : "images/Vector Up.svg"} />
      </div>
    </button>
  );
};
