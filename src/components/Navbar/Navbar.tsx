import { Link } from 'react-router-dom';

import shopping from '@Images/icons/Shopping-bag.svg';
import like from '@Images/icons/like-icons.svg';
import style from './Navbar.module.scss';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/Cart';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { cartItems } = useContext(CartContext);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav
        className={` ${style.navbar}  ${isOpen ? style.navbar__active : ''} `}
      >
        <ul className={style.navbar__list}>
          <li>
            <Link
              onClick={() => {
                window.scrollTo({
                  top: 0,
                });
              }}
              className={style.navbar__link}
              to="/"
            >
              home
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                window.scrollTo({
                  top: 0,
                });
              }}
              className={style.navbar__link}
              to="/phones"
            >
              Phones
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                window.scrollTo({
                  top: 0,
                });
              }}
              className={style.navbar__link}
              to="/tablets"
            >
              tablets
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                window.scrollTo({
                  top: 0,

                  behavior: 'smooth',
                });
              }}
              className={style.navbar__link}
              to="/accessories"
            >
              accessories
            </Link>
          </li>
        </ul>

        <div className={`${style.actions}`}>
          <a
            className={`${style.navbar__link} ${style['navbar__link--action']}`}
          >
            <img src={like} alt="like" />
          </a>
          <Link
            to={'cart'}
            className={`${style.navbar__link} ${style['navbar__link--action']}`}
          >
            <img src={shopping} alt="shopping" />
            {!!cartItems.length && (
              <span className={style.shopping}>{cartItems.length}</span>
            )}
          </Link>
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
