import { Link } from 'react-router-dom';

import logoImg from 'assets/img/logo/logo.svg';

import style from './Logo.module.scss';

type LogoProps = {
  className?: string;
};

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link className={`${style.logo} ${className}`} to="/">
      <img alt="Logo" src={logoImg} />
    </Link>
  );
};
