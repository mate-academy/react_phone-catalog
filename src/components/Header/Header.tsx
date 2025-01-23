import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { MainNav } from '../MainNav';
import './Header.scss';
import { getCart } from '../../api/cart';
import { getFavourites } from '../../api/favourites';

type Props = {
  openMenu: () => void;
};

export const Header: React.FC<Props> = ({ openMenu }) => {
  const location = useLocation();

  const headerRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const [cartCount, setCartCount] = useState(0);
  const [favouritesCount, setFavouritesCount] = useState(0);

  const buttonClass = (props: { isActive: boolean }) =>
    classNames('header__button', {
      'header__button--selected': props.isActive,
    });

  const updateCart = () => {
    setCartCount(getCart().length);
  };

  const updateFavourites = () => {
    setFavouritesCount(getFavourites().length);
  };

  useEffect(() => {
    updateCart();
    updateFavourites();

    const handler = (event: StorageEvent) => {
      if (event.storageArea === localStorage) {
        updateCart();
        updateFavourites();
      }
    };

    window.addEventListener('storage', handler);

    return () => {
      window.removeEventListener('storage', handler);
    };
  }, []);

  const moveCaret = () => {
    if (!headerRef.current || !caretRef.current || !navRef.current) {
      return;
    }

    const selectedElement = headerRef.current.querySelector(
      '[class*="--selected"]',
    );

    if (
      !selectedElement ||
      getComputedStyle(navRef.current).display === 'none'
    ) {
      caretRef.current.style.opacity = '0';

      return;
    }

    const selectedElementRect = selectedElement.getBoundingClientRect();
    const caretRect = caretRef.current.getBoundingClientRect();

    const prevOpacity = getComputedStyle(caretRef.current).opacity;

    caretRef.current.style.opacity = '1';

    if (caretRect.left === selectedElementRect.left) {
      return;
    }

    if (
      !caretRect.left ||
      Math.abs(caretRect.left - selectedElementRect.left) < 20 ||
      prevOpacity !== '1'
    ) {
      caretRef.current.style.left = `${selectedElementRect.left}px`;
      caretRef.current.style.width = `${selectedElementRect.width}px`;

      return;
    }

    const caretKeyframes: Partial<CSSStyleDeclaration>[] = [
      {
        left: `${caretRect.left}px`,
        transform: `scaleY(1)`,
      },
      {
        transform: `scaleY(50%) scaleX(150%)`,
      },
      {
        left: `${selectedElementRect.left}px`,
        width: `${selectedElementRect.width}px`,
        transform: `scaleY(1)`,
      },
    ];

    const caretTiming: KeyframeAnimationOptions = {
      duration: 300,
      iterations: 1,
      easing: 'ease-in-out',
    };

    const animation = caretRef.current.animate(
      caretKeyframes as Keyframe[],
      caretTiming,
    );

    animation.addEventListener('finish', () => {
      if (!caretRef.current) {
        return;
      }

      caretRef.current.style.left = `${selectedElementRect.left}px`;
      caretRef.current.style.width = `${selectedElementRect.width}px`;
    });
  };

  useEffect(() => {
    moveCaret();
  }, [location]);

  useEffect(() => {
    const resizeHandler = () => {
      moveCaret();
    };

    const observer = new window.ResizeObserver(resizeHandler);

    observer.observe(document.body);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <div className="header__caret" ref={caretRef}></div>

      <div className="header__left">
        <img src="logo.svg" alt="Logo" className="header__logo" />

        <div className="header__nav" ref={navRef}>
          <MainNav />
        </div>
      </div>

      <div className="header__buttons">
        <NavLink className={buttonClass} to="/favourites">
          <div className="header__button-container">
            <img src="icons/favourite.svg" alt="Favourite icon" />
            {!!favouritesCount && (
              <div className="header__button-count" key={favouritesCount}>
                <p className="header__button-count-text">{favouritesCount}</p>
              </div>
            )}
          </div>
        </NavLink>

        <NavLink className={buttonClass} to="/cart">
          <div className="header__button-container">
            <img src="icons/cart.svg" alt="Cart icon" />

            {!!cartCount && (
              <div className="header__button-count" key={cartCount}>
                <p className="header__button-count-text">{cartCount}</p>
              </div>
            )}
          </div>
        </NavLink>
      </div>

      <div className="header__buttons header__buttons-mobile">
        <div className="header__button" onClick={openMenu}>
          <img src="icons/menu.svg" alt="Burger menu icon" />
        </div>
      </div>
    </header>
  );
};
