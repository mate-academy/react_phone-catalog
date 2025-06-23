import classNames from 'classnames';
import styles from './header.module.scss';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { AsideMenuPhone } from '../asideMenuPhone';
import logo from '/public/img/niceLogo.svg';
import { IconsSvg } from '../icons/icons';
export const Header = () => {
  const [activeAsside, setActiveAsside] = useState(false);
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.nav__link, { [styles['is-active']]: isActive });

  return (
    <>
      <header className={styles.header} id="page-top">
        <div className={styles.header__content}>
          <NavLink to="/">
            <img
              className={styles.header__logo}
              src={logo}
              alt="NiceGadgetLogo"
            ></img>
          </NavLink>

          <nav className={styles.nav}>
            <ul className={styles.nav__list}>
              <li className={styles.nav__item}>
                <NavLink to="/" className={getLinkClass}>
                  Home
                </NavLink>
              </li>
              <li className={styles.nav__item}>
                <NavLink to="/phones" className={getLinkClass}>
                  Phones
                </NavLink>
              </li>
              <li className={styles.nav__item}>
                <NavLink to="/tablets" className={getLinkClass}>
                  Tablets
                </NavLink>
              </li>
              <li className={styles.nav__item}>
                <NavLink to="/accessories" className={getLinkClass}>
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.box}>
          <IconsSvg
            name={activeAsside ? 'close' : 'menu'}
            onClick={() => setActiveAsside(prev => !prev)}
          />
          <NavLink to="/favourites">
            <IconsSvg name={'heart'} />
          </NavLink>
          <div className={styles.box__divider}></div>
          <NavLink to="/cart">
            <IconsSvg name={'cart'} />
          </NavLink>
        </div>
      </header>
      {activeAsside && <AsideMenuPhone setActiveAsside={setActiveAsside} />}
    </>
  );
};
