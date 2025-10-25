import classNames from 'classnames';
import styles from './Nav.module.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  names: string[];
  targets: string[];
  destination: 'footer' | 'nav';
};

export const Nav: React.FC<Props> = ({ names, targets, destination }) => {
  return (
    <nav className={classNames(styles.nav)}>
      <ul
        className={classNames(styles.nav__list, {
          [styles['nav__list--footer']]: destination === 'footer',
        })}
      >
        {names.map((n, i) => (
          <li className={classNames(styles.nav__item)} key={i}>
            <NavLink to={targets[i]} className={classNames(styles.nav__link)}>
              {n}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
