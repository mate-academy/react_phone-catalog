import shopping from '@Images/icons/Shopping-bag.svg';
import like from '@Images/icons/like-icons.svg';
import style from './Navbar.module.scss';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav
        className={` ${style.navbar}  ${isOpen ? style.navbar__active : ''} `}
      >
        <ul className={style.navbar__list}>
          <li>
            <a className={style.navbar__link} href="#">
              home
            </a>
          </li>
          <li>
            <a className={style.navbar__link} href="#">
              Phones
            </a>
          </li>
          <li>
            <a className={style.navbar__link} href="#">
              tablets
            </a>
          </li>
          <li>
            <a className={style.navbar__link} href="#">
              accessories
            </a>
          </li>
        </ul>

        <div className={`${style.actions}  `}>
          <a className={style.navbar__link}>
            <img src={like} alt="like" />
          </a>
          <a className={style.navbar__link}>
            <img src={shopping} alt="shopping" />
          </a>
        </div>
      </nav>

      <button
        onClick={toggleMenu}
        className={`${style.burger} ${isOpen ? style.burger__active : ''}`}
      ></button>
    </>
  );
};

export default Navbar;
