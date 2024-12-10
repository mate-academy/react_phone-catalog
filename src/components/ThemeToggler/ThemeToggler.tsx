import React, { useContext } from 'react';
import cn from 'classnames';
import styles from './ThemeToggler.module.scss';
import { ThemeContext } from '../../store/ThemeContex';
import { Theme } from '../../types/Theme';
import moon from '../../images/icons/moon_for_light.svg';
import sun from '../../images/icons/sun_for_dark.svg';

type Props = {
  className?: string;
};

export const ThemeToggler: React.FC<Props> = ({ className }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={cn(styles.toggler, className)}>
      {theme === Theme.Light ? (
        <button className={styles.toggler__button} onClick={toggleTheme}>
          <img src={moon} alt="moon" className={styles.toggler__image} />
        </button>
      ) : (
        <button className={styles.toggler__button} onClick={toggleTheme}>
          <img src={sun} alt="sun" className={styles.toggler__image} />
        </button>
      )}
    </div>
  );
};
