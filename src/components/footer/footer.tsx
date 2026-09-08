import { Link, useLocation } from 'react-router-dom';
import logo from '../../img/icons/logo.svg';
import React, { useState, useEffect, useContext } from 'react';
import classNames from 'classnames';
import { ArrayContext } from '../../ArrayContext';


export const Footer: React.FC = () => {
  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const { cartProducts, favoriteProducts } = useContext(ArrayContext);
  const location = useLocation();
  const [pageHeight, setPageHeight] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    const updateHeights = () => {
      setPageHeight(document.documentElement.scrollHeight);
      setScreenHeight(window.innerHeight);
    };
    updateHeights();
    window.addEventListener('resize', updateHeights);

    return () => {
      window.removeEventListener('resize', updateHeights);
    };
  }, [location.pathname, cartProducts, favoriteProducts]);

  return (
    <div className="footer">
      <footer className="footer__container">
        <Link className="footer__logo" to={'/'}>
          <img src={logo} alt="logo" />
        </Link>
        <div className="footer__links">
          <Link className="footer__link" to={'https://github.com/kapesha'}>
            GitHUB
          </Link>
          <Link className="footer__link" to={'https://github.com/kapesha'}>
            Contacts
          </Link>
          <Link className="footer__link" to={'https://github.com/kapesha'}>
            Rights
          </Link>
        </div>
        <button className={classNames("footer__up", {
          "footer__up-hidden": pageHeight <= screenHeight,
        })}>
          <p onClick={goTop} className="footer__button-text">
            Back to top
          </p>
          <button onClick={goTop} className="button-slider button-size b-up" />
        </button>
      </footer>
    </div>
  );
};
