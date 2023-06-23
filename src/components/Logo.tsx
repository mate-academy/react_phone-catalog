import { Link } from 'react-router-dom';

import logo from '../assets/svg/logo.svg';

export const Logo = () => (
  <Link to="/home">
    <img
      src={logo}
      alt="Site logo"
    />
  </Link>
);
