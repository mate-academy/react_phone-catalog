import classNames from 'classnames';
import styles from './Nav.module.scss';
import { NavLink, useLocation } from 'react-router-dom';

type Props = {
  names: string[];
  targets: string[];
  destination: 'footer' | 'nav';
  exit: () => void;
};

export const Nav: React.FC<Props> = ({ names, targets, destination, exit }) => {
  const category = useLocation().pathname.slice(1);

  return (
    <nav className={classNames(styles.nav)}>
      <ul
        className={classNames(styles.nav__list, {
          [styles['nav__list--footer']]: destination === 'footer',
        })}
      >
        {names.map((n, i) => (
          <li
            className={classNames(styles.nav__item, {
              [styles['nav__item--active']]: category === n,
            })}
            key={i}
            onClick={exit}
          >
            <NavLink to={targets[i]} className={classNames(styles.nav__link)}>
              {n}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
