import { Link } from 'react-router-dom';

import logo from '../../assets/svg/logo.svg';

export const Logo = () => (
  <Link to="/">
    <img
      src={logo}
      alt="Site logo"
    />
  </Link>
);
