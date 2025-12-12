import React from "react"
import { NavLink } from "react-router-dom"
import styles from './Header.module.scss'
import Logo from './icons/Logo.png'
import HeartIcon from './icons/heart-icon.png'
import CartIcon from './icons/cart-icon.png'
import BurgerMenu from './icons/burger-menu-icon.png'

export const Header:React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <NavLink to="/">
            <img src={Logo} alt="Logo" className={styles.header__logo__img} />
          </NavLink>
        </div>
        <nav className={styles.header__nav}>
          <NavLink to="/" className={styles.header__nav__item}>HOME</NavLink>
          <NavLink to="/phones" className={styles.header__nav__item}>PHONES</NavLink>
          <NavLink to="/tablets" className={styles.header__nav__item}>TABLETS</NavLink>
          <NavLink to="/accessories" className={styles.header__nav__item}>ACCESSORIES</NavLink>
        </nav>
        <div className={styles.header__icons}>
          <NavLink to="/favorites">
            <img src={HeartIcon} alt="Favorites" className={styles.header__icons__img} />
          </NavLink>
        </div>

        <div className={styles.header__icons}>
          <NavLink to="/cart">
            <img src={CartIcon} alt="Cart" className={styles.header__icons__img} />
          </NavLink>
        </div>
      </div>
    </header>
  )
}
