import s from './Header.module.scss';

export const Header = () => {
  return (
    <header className={s.header}>
      <nav className={`${s.nav} ${s.container}`}>
        <a href="#" className={s.logo}>
          <img
            src="../../img/icons/logo.svg"
            alt="logo"
            className={s.logo__img}
          />
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
        <a href="" className={`${s.controls__visible} ${s.button}`}>
          <img src="../../img/icons/heard.svg" alt="" />
        </a>
        <a href="" className={`${s.controls__visible} ${s.button}`}>
          <img src="../../img/icons/shoping-bag.svg" alt="" />
        </a>
        <a
          href=""
          className={`${s.controls__button} ${s.controls__hidden} ${s.button}`}
        >
          <img src="../../img/icons/menu.svg" alt="" />
        </a>
      </div>
    </header>
  );
};
