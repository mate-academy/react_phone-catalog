import './Navigation.scss';
import cn from 'classnames';
import { navLinks } from '../../helpers/constants';
import { NavigationLink } from '../NavigationLinks';

const isActiveLink = ({ isActive }: { isActive: boolean }) => cn(
  'navigation__link', {
    'navigation__link-is-active': isActive,
  },
);

export const Navigation = () => {
  return (
    <nav className="navigation">
      {navLinks.map(link => (
        <NavigationLink
          name={link}
          classNameFunc={isActiveLink}
          key={link}
        />
      ))}
    </nav>
  );
};
