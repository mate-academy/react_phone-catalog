import { useTheme } from '../../context/ThemeContext';
import styles from './DarkThemeButton.module.scss';

export const DarkThemeButton = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <div className={styles.darkThemeButton}>
      <p style={isDarkTheme ? { color: '#fff' } : {}}>
        {isDarkTheme ? 'OFF' : 'ON'}
      </p>
      <button className={styles.darkThemeButton__btn} onClick={toggleTheme} />
    </div>
  );
};
