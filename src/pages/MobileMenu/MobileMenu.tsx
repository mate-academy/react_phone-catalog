import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import React, { useState } from 'react';
import './MobileMenu.scss';
import { GITHUB_URL } from '../../helpers/constants';
import { ComingSoon } from '../../components/ComingSoon';

type Props = {
  isMenuShown: boolean,
  setIsMenuShown: (value: boolean) => void,
};

export const MobileMenu: React.FC<Props> = ({
  isMenuShown,
  setIsMenuShown,
}) => {
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLinkClick = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 4000);
  };

  return (
    <div className={cn('MobileMenu', {
      'menu-shown': isMenuShown,
    })}
    >
      <div className="MobileMenu__top">
        <Link
          to="/"
          className="MobileMenu__logo-link"
          onClick={() => setIsMenuShown(false)}
        >
          <div className="MobileMenu__logo-link-image" />
        </Link>

        <button
          aria-label="Close button"
          type="button"
          className="MobileMenu__close-link"
          onClick={() => setIsMenuShown(false)}
        >
          <div className="MobileMenu__close-link-image icon icon--remove" />
        </button>
      </div>

      <div className="MobileMenu__container">
        <nav className="MobileMenu__nav">
          <ul className="MobileMenu__nav-list">
            <li className="MobileMenu__nav-list-item">
              <Link
                to="/"
                className="MobileMenu__nav-list-link"
                onClick={() => setIsMenuShown(false)}
              >
                Home
              </Link>
            </li>

            <li className="MobileMenu__nav-list-item">
              <Link
                to="/phones"
                className="MobileMenu__nav-list-link"
                onClick={() => setIsMenuShown(false)}
              >
                Phones
              </Link>
            </li>

            <li className="MobileMenu__nav-list-item">
              <Link
                to="/tablets"
                className="MobileMenu__nav-list-link"
                onClick={() => setIsMenuShown(false)}
              >
                Tablets
              </Link>
            </li>

            <li className="MobileMenu__nav-list-item">
              <Link
                to="/accessories"
                className="MobileMenu__nav-list-link"
                onClick={() => setIsMenuShown(false)}
              >
                Accessories
              </Link>
            </li>

            <li className="MobileMenu__nav-list-item">
              <Link
                to="/favourites"
                className="MobileMenu__nav-list-link"
                onClick={() => setIsMenuShown(false)}
              >
                Favourites
              </Link>
            </li>

            <li className="MobileMenu__nav-list-item">
              <Link
                to="/cart"
                className="MobileMenu__nav-list-link"
                onClick={() => setIsMenuShown(false)}
              >
                Cart
              </Link>
            </li>

            <li className="MobileMenu__nav-list-item">
              <Link
                to={pathname}
                className="MobileMenu__nav-list-link"
                onClick={handleLinkClick}
              >
                Contact us
              </Link>
            </li>

            <li className="MobileMenu__nav-list-item">
              <Link
                to={GITHUB_URL}
                className="MobileMenu__nav-list-link"
                target="_blank"
                onClick={() => setIsMenuShown(false)}
              >
                GitHub
              </Link>
            </li>
          </ul>
        </nav>
        {isModalOpen && <ComingSoon onClose={setIsModalOpen} />}
      </div>
    </div>
  );
};
