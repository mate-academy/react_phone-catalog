import React, { useState } from 'react';
import './ThemeSwitch.scss';
import { useTheme } from '../../../../../../context/ThemeContext';
import classNames from 'classnames';

type Props = {
  className: string;
};

export const ThemeSwitch: React.FC<Props> = ({ className }) => {
  const { themeColor, setThemeColor } = useTheme();
  const [activeDark, setActiveDark] = useState(themeColor === 'dark');

  const changeTheme = () => {
    if (themeColor === 'dark') {
      setActiveDark(false);
      setThemeColor('light');
    } else {
      setActiveDark(true);
      setThemeColor('dark');
    }
  };

  return (
    <div className={`theme-switch ${className}`}>
      <div className="theme-switch__wrapper">
        <div
          className={classNames('theme-switch__lever', {
            'theme-switch__lever--dark': activeDark,
          })}
          onClick={() => changeTheme()}
        />
      </div>
    </div>
  );
};
