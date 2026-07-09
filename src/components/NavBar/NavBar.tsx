import { Link, useLocation } from 'react-router-dom';
import s from './NavBar.module.scss';
import classNames from 'classnames';

type Props = {
  onClose?: (v: boolean) => void;
};

export const NavBar = ({ onClose = () => {} }: Props) => {
  const { pathname } = useLocation();

  return (
    <nav className={s.nav}>
      {['home', 'phones', 'tablets', 'accessories'].map(item => {
        const path = item === 'home' ? '/' : `/${item}`;

        return (
          <Link
            key={item}
            to={path}
            className={classNames(s.nav__link, {
              [s['nav__link--active']]: pathname === path,
            })}
            onClick={() => onClose(false)}
          >
            {item}
          </Link>
        );
      })}
    </nav>
  );
};
