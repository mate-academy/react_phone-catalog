import { useTheme } from '../../context/ThemeContext';
import styles from './BackToTopButton.module.scss';

export const BackToTopButton: React.FC = () => {
  const { theme } = useTheme();
  const img = `img/icons/backToTop-icon-${theme}.svg`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={styles.button}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <span className={styles.button__text}>Back to top</span>
      <img className={styles.icon} src={img} alt="Go Up Button" />
    </button>
  );
};
