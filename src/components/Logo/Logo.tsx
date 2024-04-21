import { NavLink } from 'react-router-dom';
import './Logo.scss';
import { Icon } from '../Icon';
import { IconType } from '../../types/IconTypes';

export const Logo = () => (
  <NavLink to="/" className="logo">
    <Icon iconType={IconType.logo} width={30} height={30} />
  </NavLink>
);
