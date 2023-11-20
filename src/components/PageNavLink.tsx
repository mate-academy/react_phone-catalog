import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import '../styles/navigation.scss';

type Props = {
  to: string,
  text: string,
};

export const PageNavLink:React.FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames('navigation__link', {
        'navigation__link--active': isActive,
      })}
    >
      {text}
    </NavLink>
  );
};
