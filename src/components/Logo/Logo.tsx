import { NavLink } from 'react-router-dom';

import './Logo.scss';
import logo from '../../images/icons/logo.svg';

type Props = {
  onClick?: () => void;
};

export const Logo: React.FC<Props> = ({ onClick }) => (
  <NavLink to="/" className="logo" onClick={onClick}>
    <img
      src={logo}
      alt="logo"
      className="logo__img"
    />
  </NavLink>
);
