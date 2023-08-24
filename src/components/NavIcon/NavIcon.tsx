import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './NavIcon.scss';

type Props = {
  path: string,
  alt: string,
  src: string,
};

export const NavIcon: React.FC<Props> = ({ path, alt, src }) => {
  const navbarItemClass = ({ isActive }: {
    isActive: boolean
  }) => classNames('nav-icon', {
    'nav__link nav__link--is-active': isActive,
  });

  return (
    <NavLink
      className={navbarItemClass}
      to={path}
    >
      <img alt={alt} src={src} />
    </NavLink>
  );
};
