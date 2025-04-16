import { Button } from '../../shared/Button/Button';
import s from './Header.module.scss';

export const Header = () => {
  return (
    <header className={s.header}>
      <nav className={`${s.nav} ${s.container}`}>
        <a href="#" className={s.logo}>
          <img src="../../icons/logo.svg" alt="logo" className={s.logo__img} />
        </a>

        <ul className={s.nav__list}>
          <li className={s.nav__item}>
            <a href="" className={s.nav__link}>
              home
            </a>
          </li>
          <li className={s.nav__item}>
            <a href="" className={s.nav__link}>
              phones
            </a>
          </li>
          <li className={s.nav__item}>
            <a href="" className={s.nav__link}>
              tablets
            </a>
          </li>
          <li className={s.nav__item}>
            <a href="" className={s.nav__link}>
              accessories
            </a>
          </li>
        </ul>
      </nav>

      <div className={s.controls}>
        <div className={s.controls__visible}>
          <Button iconName="heart" />
          <Button iconName="shoping-bag" />
        </div>
        <div className={s.controls__hidden}>
          <Button iconName="menu" />
        </div>
      </div>
    </header>
  );
};
