import { Link } from 'react-router-dom';
import style from './Logo.module.scss';

type LogoProps = {
  className?: string;
};

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link to="/" className={`${style.logo} ${className}`}>
      <img src="img/logo/logo.svg" alt="Logo" />
    </Link>
  );
};
