import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Status } from '../../types/navigate';

type Props = {
  to: string,
  text: Status,
};

export const PageNavLink: React.FC<Props> = ({ to, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) => (
      classNames(
        'nav__list__link',
        { 'nav__list__link--active': isActive },
      )
    )}
  >
    {text}
  </NavLink>
);
