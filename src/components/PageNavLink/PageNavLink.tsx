import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { PageNavLinkType } from '../../types/PageNavLink';
import './PageNavLink.scss';

type Props = {
  to: string,
  text: string,
  type: PageNavLinkType,
};

export const PageNavLink: React.FC<Props> = ({
  to,
  text,
  type,
}) => (
  <NavLink
    to={to}
    className={({ isActive }) => classNames(
      'navbar__item',
      {
        'navbar__item--active': isActive,
        'navbar__item-menu': type === 'menu',
      },
    )}
  >
    {text}
  </NavLink>
);
