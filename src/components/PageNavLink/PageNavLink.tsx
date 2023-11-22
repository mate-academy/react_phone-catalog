import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { PageNavLinkType } from '../../types/PageNavLink';
import './PageNavLink.scss';

type Props = {
  to: string;
  text: string;
  type: PageNavLinkType;
};

export const PageNavLink: React.FC<Props> = ({
  to,
  text,
  type,
}) => (
  <NavLink
    to={to}
    className={({ isActive }) => classNames(
      'nav__link',
      { 'nav__link--active': isActive },
      { menu__item: type === 'menu' },
    )}
  >
    {text}
  </NavLink>
);
