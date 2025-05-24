import { NavLink } from 'react-router-dom';
import styles from './asideMenuPhone.module.scss';
import classNames from 'classnames';
import { IconsSvg } from '../../../../components/icons/icons';

export const AsideMenuPhone = ({ setActiveAsside}) => {
   const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.nav__link, { [styles['is-active']]: isActive });


  return (
    <aside className={styles.menu} id="menu">

      <nav className={styles.nav} onClick={() => setActiveAsside(false)}>
        <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            <NavLink to="/" className={getLinkClass}
            >
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
              Acessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.menu__bottom} onClick={() => setActiveAsside(false)}>
 <NavLink
  to="/favorite"
  className={({ isActive }) =>
    classNames(styles.buttonWrapper, {
      [styles['is-active']]: isActive,
    })
  }
>
  <IconsSvg name="heart" className={styles['visible--mobile']} />
</NavLink>

<div className={styles.divider}></div>

        <NavLink
    to="/cart"
    className={({ isActive }) =>
      classNames(styles.buttonWrapper, {
        [styles['is-active']]: isActive,
      })
    }
  >
  <IconsSvg name="cart" className={styles['visible--mobile']} />
</NavLink>


      </div>
    </aside>
  );
};
