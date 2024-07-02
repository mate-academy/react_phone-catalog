import './Menu.scss';
import { MenuList } from '../shared/MenuList';
import { Link } from 'react-router-dom';

export const Menu = () => {
  return (
    <div className="menu__content">
      <nav className="menu__nav">
        <MenuList />
      </nav>
      <div className="menu__buttons">
        <Link to="/favourites" className="menu__link menu__link--heart-like">
          <span className="menu__count button__count">0</span>
          <img
            className="menu__image button__image"
            src="./img/icons/heart-like.svg"
            alt="heart-like"
          />
        </Link>
        <Link to="/cart" className="menu__link menu__link--cart">
          <span className="menu__count button__count">0</span>
          <img
            className="menu__image button__image"
            src="./img/icons/cart.svg"
            alt="cart"
          />
        </Link>
      </div>
    </div>
  );
};
