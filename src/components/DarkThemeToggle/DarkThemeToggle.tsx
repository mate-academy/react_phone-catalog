import classNames from 'classnames';
import styles from './DarkThemeToggle.module.scss';
import { ThemeType } from '../../types/ThemeType';
import { useContext } from 'react';
import { ThemeContext } from '../../ContextProvider';

export const DarkThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const changeTheme = () => {
    const newTheme =
      theme === ThemeType.light ? ThemeType.dark : ThemeType.light;

    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      className={classNames(styles.darkThemeBtn, {
        [styles.darkThemeBtnIsActive]: theme === ThemeType.dark,
      })}
      aria-label="Dark theme toggle"
      onClick={changeTheme}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="21px"
        viewBox="0 -960 960 960"
        width="21px"
      >
        <path
          d="M481.11-164q-131.62 0-223.79-92.17-92.16-92.16-92.16-223.83
            0-125.77 85.04-215.88 85.04-90.12 208.41-98.2 7.67 0 15.07.62
            7.39.62 15.39 1.85-28.61 28.61-45.26 65.65-16.66 37.04-16.66
            77.96 0 93.33 64.34 157.67Q555.82-426 649.15-426q40.54 0 77.77-16.65
            37.23-16.66 65.46-45.27 1.23 8 1.85 15.4.61 7.4.61 15.07-7.69
            123.36-97.84 208.4Q606.84-164 481.11-164Zm.04-52q82 0 148.78-47.07
            66.78-47.08 98.22-122.93-20 5-39.66 8.5-19.67 3.5-39.34 3.5-113.85
            0-193.93-80.07-80.07-80.07-80.07-193.93 0-19.67 3.5-39.33 3.5-19.67
            8.5-39.67-75.85 31.45-122.92 98.22Q217.15-562 217.15-480q0
            110 77 187t187 77Zm-14-250Z"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="21px"
        viewBox="0 -960 960 960"
        width="21px"
      >
        <path
          d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35
            85q0 50 35 85t85 35Zm-.23 52q-71.69 0-121.73-50.27Q308-408.53
            308-480.23q0-71.69 50.27-121.73Q408.53-652 480.23-652q71.69 0
            121.73 50.27Q652-551.47 652-479.77q0 71.69-50.27 121.73Q551.47-308
            479.77-308ZM216-454H58v-52h158v52Zm686
            0H744v-52h158v52ZM454-744v-158h52v158h-52Zm0
            686v-158h52v158h-52ZM275.92-648.92l-95.69-93.46 36.39-40.39 96.23
            96.69-36.93 37.16Zm467.46 467.69-94.84-93.31 35.54-37.54 95.69
            94.46-36.39 36.39Zm-96.46-502.85 95.46-93.69 36.39 34.39-92.69
            97.23-39.16-37.93ZM177.23-216.62l97.31-92.84 34.77 33.54-91.08
            97.07-41-37.77ZM480-480Z"
        />
      </svg>
    </button>
  );
};
