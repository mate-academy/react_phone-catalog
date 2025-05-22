import classNames from 'classnames'
import styles from './header.module.scss'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { AsideMenuPhone } from '../../modules/HomePage/components/asideMenuPhone'
import logo from '/public/img/niceLogo.svg';
export const Header = () => {
  const [activeAsside, setActiveAsside] = useState(false);
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.nav__link, { [styles['is-active']]: isActive });

  return (<><header className={styles.header} id = 'page-top'>


      <div className={styles.header__content}>
      <NavLink to="/">
        <img className={styles.header__logo} src={logo} alt="NiceGadgetLogo"></img>
      </NavLink>

       <nav className={styles.nav} >
        <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            <NavLink to="/"

              className={getLinkClass}>
              Home
            </NavLink>
          </li>
          <li className={styles.nav__item}>
            <NavLink to="/phones"

              className={getLinkClass}>
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
        </div>
<div className={styles.box}>
      {<NavLink onClick={() => setActiveAsside(prev => !prev)} className={classNames(styles.icon,  activeAsside? styles['icon--close']:styles['icon--menu'])}></NavLink>}
        <NavLink to ="/favorite" className={`${styles.icon} ${styles['icon--heart']}`}>

        </NavLink>
        <div className={styles.divider}></div>
        <NavLink to ="/cart" className={`${styles.icon} ${styles['icon--cart']}`}>

        </NavLink>
        </div>





  </header>
  {activeAsside && <AsideMenuPhone  setActiveAsside={ setActiveAsside}  />}</>
  )
}
