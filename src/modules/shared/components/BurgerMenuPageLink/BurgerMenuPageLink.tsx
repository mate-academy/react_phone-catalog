import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './BurgerMenuPageLink.module.scss';
import { useBurgerMenu } from '../Contexts/BurgerMenuContext';

type Props = {
  title: string;
  to: string;
};

export const BurgerMenuPageLink: React.FC<Props> = ({ title, to }) => {
  const { isBurgerMenuOpened, closeBurgerMenu } = useBurgerMenu();

  const handleClick = () => {
    closeBurgerMenu();
  };

  return (
    <li>
      <NavLink
        aria-current="page"
        className={({ isActive }) =>
          classNames(styles.Link, isActive && styles.Link_active)
        }
        to={to}
        tabIndex={isBurgerMenuOpened ? 0 : -1}
        onClick={handleClick}
      >
        {title}
      </NavLink>
    </li>
  );
};
