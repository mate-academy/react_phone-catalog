import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import s from './Header.module.scss';
import logo from '../../assets/images/logo.png';
import menu from '../../assets/images/icons/menu.svg';
import heart from '../../assets/images/icons/heart.svg';
import cart from '../../assets/images/icons/cart.svg';
import { NavBar } from '../shared/components/NavBar/NavBar';
import { BurgerMenu } from './components/BurgerMenu';

export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header>
      {isMenuOpen && <BurgerMenu onClose={closeMenu} />}
      <div className={s.headerWrapper}>
        <div className={s.leftPart}>
          <Link to="/">
            <div className={s.logoWrapper}>
              <img src={logo} alt="Logo" />
            </div>
          </Link>
          <div className={`${s.tabletVisible} ${s.menuWrapper}`}>
            <NavBar />
          </div>
        </div>
        <div className={s.rightPart}>
          <div className={`${s.iconWrapper} ${s.tabletVisible}`}>
            <img src={heart} alt="Favourite" />
          </div>
          <div className={`${s.iconWrapper} ${s.tabletVisible}`}>
            <img src={cart} alt="Shopping Cart" />
          </div>
          <div
            className={`${s.iconWrapper} ${s.mobileVisible}`}
            onClick={() => setIsMenuOpen(true)}
          >
            <img src={menu} alt="Mobile Menu" />
          </div>
        </div>
      </div>
    </header>
  );
};
