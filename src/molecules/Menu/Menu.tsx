import { Link } from '@/atoms';
import s from './Menu.module.scss';

const Menu = () => {
  return (
    <nav className={s.nav} aria-label="Main navigation">
      <ul className={s.menu}>
        <li className={s.menu__item}>
          <Link to="/">Home</Link>
        </li>
        <li className={s.menu__item}>
          <Link to="/phones">Phones</Link>
        </li>
        <li className={s.menu__item}>
          <Link to="/tablets">Tablets</Link>
        </li>
        <li className={s.menu__item}>
          <Link to="/accessories">Accessories</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
