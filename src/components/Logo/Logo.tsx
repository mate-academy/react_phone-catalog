import { Link } from 'react-router-dom';
import './Logo.scss';

type LogoProps = {
  className?: string;
};

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link to="/" className={`logo ${className}`}>
      <img src="img/Logo.svg" alt="Logo" />
    </Link>
  );
};
