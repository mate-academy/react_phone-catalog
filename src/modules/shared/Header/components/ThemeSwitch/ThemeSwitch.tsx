import { useContext } from 'react';
import classNames from 'classnames';
import { ThemeContext } from '../../../../../store/ThemeProvider';
import styles from './ThemeSwitch.module.scss';

export const ThemeSwitch = () => {
  const { isThemeDark, setIsThemeDark } = useContext(ThemeContext);

  return (
    <div
      className={classNames(styles.ThemeSwitch, {
        [styles.ThemeSwitch_darkTheme]: isThemeDark,
      })}
      onClick={() => setIsThemeDark(!isThemeDark)}
    ></div>
  );
};
