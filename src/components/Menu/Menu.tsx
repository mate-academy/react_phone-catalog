import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductContext } from '../../helpers/ProductsContext';
import { Nav } from '../Nav';
import './Menu.scss';

export function Menu() {
  const {
    isMenuActive, setIsMenuActive, windowWidth,
  } = useContext(ProductContext);
  const { pathname } = useLocation();
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuActive(false);
  }, [windowWidth, pathname]);

  useEffect(() => {
    if (isMenuActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuActive]);

  const menuStyles = {
    top: `${scrollPosition}px`,
  };

  return (
    <aside
      className={classNames(
        'menu',
        { 'menu--active': isMenuActive },
      )}
      style={menuStyles}
    >
      <Nav />
    </aside>
  );
}
