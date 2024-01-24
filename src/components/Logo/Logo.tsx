import { Link } from 'react-router-dom';
import { LogoIcon } from '../../assets/image/icons/LogoIcon';
import './Logo.scss';

export const Logo = () => {
  return (
    <Link to="/" className="logo">
      <LogoIcon />
    </Link>
  );
};
