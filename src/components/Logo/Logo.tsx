import { Link } from 'react-router-dom';

import LogoIcon from '../../images/logo.svg';
import './Logo.scss';

export const Logo = () => (
  <Link to="/home" className="Logo">
    <img
      src={LogoIcon}
      alt="Logo"
      width={40}
      height={24}
    />
  </Link>
);
