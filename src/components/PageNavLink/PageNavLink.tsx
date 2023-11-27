import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string,
  text: string,
};

export const PageNavLink: React.FC<Props> = ({
  to,
  text,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames(
        'navbar__link',
        { 'navbar__link--active': isActive },
      )}
    >
      {text}
    </NavLink>
  );
};
