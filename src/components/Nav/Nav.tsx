import classNames from 'classnames';
import './Nav.scss';
import { navLinks } from '../../helpers/constants';
import { NaviLink } from '../NaviLink';

const isActiveLink = ({ isActive }: { isActive: boolean }) =>
  classNames('navigation__link', {
    'navigation__link-is-active': isActive,
  });

export const Nav = () => {
  return (
    <nav className="navigation">
      {navLinks.map(link => (
        <NaviLink name={link} classNameFunc={isActiveLink} key={link} />
      ))}
    </nav>
  );
};
