import './Menu.scss';
import { MenuList } from '../shared/MenuList';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../shared/Context/Context';
import { CSSTransition } from 'react-transition-group';

export const Menu = () => {
  const { favourite, totalSums } = useContext(ProductContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    setIsOpen(true);

    return () => {
      document.body.style.overflow = '';
      setIsOpen(false);
    };
  }, []);

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="menu__content"
      unmountOnExit
    >
      <div className="menu__content">
        <nav className="menu__nav">
          <MenuList />
        </nav>
        <div className="menu__buttons">
          <Link to="/favourites" className="menu__link menu__link--cart">
            {favourite.length > 0 && (
              <span className="menu__count button__count">
                {favourite.length}
              </span>
            )}
            <img
              className="menu__image button__image"
              src="./img/icons/heart-like.svg"
              alt="heart-like"
            />
          </Link>
          <Link to="/cart" className="menu__link menu__link--cart">
            {totalSums[0] > 0 && (
              <span className="menu__count button__count">{totalSums[0]}</span>
            )}
            <img
              className="menu__image button__image"
              src="./img/icons/cart.svg"
              alt="cart"
            />
          </Link>
        </div>
      </div>
    </CSSTransition>
  );
};
