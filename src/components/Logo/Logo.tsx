import { Link } from 'react-router-dom';
import LogoIcon from '../../assets/logo/logo.svg?react';

export const Logo = () => {
  return (
    <Link to="/">
      <LogoIcon />
    </Link>
  );
};
