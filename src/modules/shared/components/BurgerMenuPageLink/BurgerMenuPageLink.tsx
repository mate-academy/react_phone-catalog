import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { HandleBurgerMenuLinkClick } from '../../types/handlers';
import styles from './BurgerMenuPageLink.module.scss';

type Props = {
  title: string;
  to: string;
  onClick: HandleBurgerMenuLinkClick;
};

export const BurgerMenuPageLink: React.FC<Props> = ({ title, to, onClick }) => {
  return (
    <li>
      <NavLink
        aria-current="page"
        className={({ isActive }) =>
          classNames(styles.Link, isActive && styles.Link_active)
        }
        to={to}
        onClick={onClick}
      >
        {title}
      </NavLink>
    </li>
  );
};
