import s from './Header.module.scss';

export const Header = () => {
  return (
    <nav className={s.nav}>
      <a className={s.logo}>
        <img src="../../img/icons/logo.svg" alt="logo" />
      </a>
      <div className={s.nav__flex}>
        <li className={s.nav__list}>
          <ul className={s.nav__item}>
            <a href="#" className={s.nav__link}>
              Home
            </a>
          </ul>
          <ul className={s.nav__item}>
            <a href="#" className={s.nav__link}>
              Phones
            </a>
          </ul>
          <ul className={s.nav__item}>
            <a href="#" className={s.nav__link}>
              Tablets
            </a>
          </ul>
          <ul className={s.nav__item}>
            <a href="#" className={s.nav__link}>
              Label
            </a>
          </ul>
        </li>
        <div className={s.menu}>
          <li className={s.controls}>
            <ul className={s.controls__item}>
              <a href="">
                <img src="../../img/icons/shoping-bag.svg" alt="" />
              </a>
            </ul>
            <ul className={s.controls__item}>
              <a href="">
                <img src="../../img/icons/heard.svg" alt="" />
              </a>
            </ul>
          </li>
          <a href="" className={s.menu__colapsed}>
            <img src="" alt="" />
          </a>
        </div>
      </div>
    </nav>
  );
};
