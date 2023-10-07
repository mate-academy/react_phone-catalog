import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './PageNavLink.scss';

type Props = {
  name: string,
  to: string,
};

export const PageNavLink:React.FC<Props> = ({
  name,
  to,
}) => {
  return (
    <NavLink
      type="button"
      to={{
        pathname: to,
      }}
      className={({ isActive }) => classNames(
        'nav__link',
        { 'nav__link--active': isActive },
      )}
    >
      {name}
    </NavLink>
  );
};
