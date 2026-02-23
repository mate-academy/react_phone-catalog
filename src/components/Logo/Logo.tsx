import React from 'react';

import logo from '../../assets/logo/logo-m-t.svg';

interface LogoProps {
  className: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return <img src={logo} alt="logo" className={className} />;
};
