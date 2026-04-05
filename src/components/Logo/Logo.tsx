import React from 'react';

import logoLight from '../../assets/logo/logo-l.svg';
import logoDark from '../../assets/logo/logo-d.svg';
import { useTheme } from '../../context/ThemeContext';

interface LogoProps {
  className: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  const { theme } = useTheme();

  return (
    <img
      src={theme === 'dark' ? logoDark : logoLight}
      alt="Logo"
      className={className}
    />
  );
};
