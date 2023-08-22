/* eslint-disable max-len */
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

type Props = {
  inputText: string,
  setInputText: (event: React.ChangeEvent<HTMLInputElement>) => void,
  favoritesCount: number,
  basketCount: number,
};

export const Header: React.FC<Props> = ({
  inputText,
  setInputText,
  favoritesCount,
  basketCount,
}) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [isIconLikeHidden, setIsIconLikeHiden] = useState(false);
  const [isIconCartHidden, setIsIconCartHiden] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    if (currentPath === '/phones') {
      setSearchVisible(true);
    } else {
      setSearchVisible(false);
    }

    if (favoritesCount === 0) {
      setIsIconLikeHiden(true);
    } else {
      setIsIconLikeHiden(false);
    }

    if (basketCount === 0) {
      setIsIconCartHiden(true);
    } else {
      setIsIconCartHiden(false);
    }
  }, [location, favoritesCount, basketCount]);

  return (
    <header className="header">
      <div className="header__nav">
        <NavLink to="/">
          <div className="header__icon--logo" />
        </NavLink>
        <ul className="header__nav__list">
          <li className="header__nav__list-item">
            <NavLink
              to="/"
              className="header__nav__list-link"
            >
              home
            </NavLink>
          </li>
          <li className="header__nav__list-item">
            <NavLink
              to="/phones"
              className="header__nav__list-link"
            >
              phones

            </NavLink>
          </li>
          <li className="header__nav__list-item">
            <NavLink
              to="/tablets"
              className="header__nav__list-link"
            >
              tablets
            </NavLink>
          </li>
          <li className="header__nav__list-item">
            <NavLink
              to="/accessories"
              className="header__nav__list-link"
            >
              accessories
            </NavLink>
          </li>
        </ul>
        {searchVisible && (
          <form className="header__form">
            <input
              type="text"
              className="header__input"
              placeholder="Search in phones..."
              value={inputText}
              onChange={setInputText}
            />
            <svg
              className="header__icon--search"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Icons/Search">
                <path id="Union" fillRule="evenodd" clipRule="evenodd" d="M2.66683 7.33334C2.66683 4.75601 4.75617 2.66668 7.3335 2.66668C9.91083 2.66668 12.0002 4.75601 12.0002 7.33334C12.0002 8.59061 11.503 9.73176 10.6945 10.5709C10.6716 10.5884 10.6497 10.6077 10.6287 10.6286C10.6078 10.6495 10.5886 10.6715 10.571 10.6943C9.73189 11.5028 8.59075 12 7.3335 12C4.75617 12 2.66683 9.91067 2.66683 7.33334ZM11.0786 12.0213C10.0522 12.8424 8.75016 13.3333 7.3335 13.3333C4.01979 13.3333 1.3335 10.6471 1.3335 7.33334C1.3335 4.01963 4.01979 1.33334 7.3335 1.33334C10.6472 1.33334 13.3335 4.01963 13.3335 7.33334C13.3335 8.75003 12.8425 10.052 12.0214 11.0785L14.4715 13.5286C14.7319 13.789 14.7319 14.2111 14.4715 14.4714C14.2112 14.7318 13.7891 14.7318 13.5287 14.4714L11.0786 12.0213Z" fill="#333333" />
              </g>
            </svg>

          </form>
        )}

        <div className="header__nav__icon-container">
          <NavLink
            to="liked"
            className="header__nav__icon-item
        header__nav__icon-item--1"
          >
            <svg width="24" height="24" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M9.62846 0.631356C10.1584 0.411782 10.7264 0.298767 11.3 0.298767C11.8736 0.298767 12.4416 0.411782 12.9715 0.631356C13.5014 0.85093 13.9829 1.17276 14.3884 1.57846C14.794 1.98392 15.1157 2.46531 15.3353 2.99513C15.5549 3.52505 15.6679 4.09304 15.6679 4.66665C15.6679 5.24026 15.5549 5.80825 15.3353 6.33817C15.1157 6.86805 14.7939 7.34947 14.3883 7.75496C14.3883 7.755 14.3883 7.75492 14.3883 7.75496L8.49496 13.6483C8.22159 13.9217 7.77838 13.9217 7.50501 13.6483L1.61168 7.75496C0.792607 6.93589 0.332458 5.82499 0.332458 4.66665C0.332458 3.50831 0.792607 2.39741 1.61168 1.57834C2.43075 0.759273 3.54165 0.299124 4.69999 0.299124C5.85833 0.299124 6.96922 0.759273 7.78829 1.57834L7.99999 1.79003L8.21156 1.57846C8.21152 1.5785 8.2116 1.57842 8.21156 1.57846C8.61705 1.17281 9.09859 0.850909 9.62846 0.631356ZM13.3982 2.56818C13.1227 2.29255 12.7956 2.0739 12.4356 1.92472C12.0756 1.77555 11.6897 1.69877 11.3 1.69877C10.9103 1.69877 10.5244 1.77555 10.1644 1.92472C9.80435 2.0739 9.47724 2.29255 9.20174 2.56818L8.49496 3.27496C8.22159 3.54833 7.77838 3.54833 7.50501 3.27496L6.79834 2.56829C6.24182 2.01177 5.48702 1.69912 4.69999 1.69912C3.91295 1.69912 3.15815 2.01177 2.60163 2.56829C2.04511 3.12481 1.73246 3.87961 1.73246 4.66665C1.73246 5.45369 2.04511 6.20849 2.60163 6.76501L7.99999 12.1634L13.3983 6.76501C13.674 6.48951 13.8927 6.16229 14.0419 5.80227C14.1911 5.44224 14.2679 5.05635 14.2679 4.66665C14.2679 4.27695 14.1911 3.89106 14.0419 3.53103C13.8927 3.17101 13.6739 2.84367 13.3982 2.56818Z" fill="#333333" />
            </svg>
            <svg
              className={classNames('icon--elipse', {
                'icon--hidden': isIconLikeHidden,
              })}
              width="20"
              height="20"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle id="Ellipse 10" cx="7" cy="7" r="6.5" fill="#EB5757" stroke="white" />
              {favoritesCount > 0 && (
                <text x="50%" y="50%" textAnchor="middle" dy="0.3em" fill="white" fontSize={8}>
                  {favoritesCount}
                </text>
              )}
            </svg>

          </NavLink>

          <NavLink
            to="basket"
            className="header__nav__icon-item
        header__nav__icon-item--2"
          >
            <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.46671 0.933323C3.59261 0.765453 3.7902 0.666656 4.00004 0.666656H12C12.2099 0.666656 12.4075 0.765453 12.5334 0.933323L14.5334 3.59999C14.6199 3.71539 14.6667 3.85574 14.6667 3.99999V13.3333C14.6667 13.8638 14.456 14.3725 14.0809 14.7475C13.7058 15.1226 13.1971 15.3333 12.6667 15.3333H3.33337C2.80294 15.3333 2.29423 15.1226 1.91916 14.7475C1.54409 14.3725 1.33337 13.8638 1.33337 13.3333V3.99999C1.33337 3.85574 1.38016 3.71539 1.46671 3.59999L3.46671 0.933323ZM4.33337 1.99999L2.66671 4.22221V13.3333C2.66671 13.5101 2.73695 13.6797 2.86197 13.8047C2.98699 13.9298 3.15656 14 3.33337 14H12.6667C12.8435 14 13.0131 13.9298 13.1381 13.8047C13.2631 13.6797 13.3334 13.5101 13.3334 13.3333V4.22221L11.6667 1.99999H4.33337Z" fill="#313237" />
              <path fillRule="evenodd" clipRule="evenodd" d="M1.33337 4.00001C1.33337 3.63182 1.63185 3.33334 2.00004 3.33334H14C14.3682 3.33334 14.6667 3.63182 14.6667 4.00001C14.6667 4.3682 14.3682 4.66668 14 4.66668H2.00004C1.63185 4.66668 1.33337 4.3682 1.33337 4.00001Z" fill="#313237" />
              <path fillRule="evenodd" clipRule="evenodd" d="M5.33329 6C5.70148 6 5.99996 6.29848 5.99996 6.66667C5.99996 7.1971 6.21067 7.70581 6.58575 8.08088C6.96082 8.45595 7.46953 8.66667 7.99996 8.66667C8.53039 8.66667 9.0391 8.45595 9.41417 8.08088C9.78925 7.70581 9.99996 7.1971 9.99996 6.66667C9.99996 6.29848 10.2984 6 10.6666 6C11.0348 6 11.3333 6.29848 11.3333 6.66667C11.3333 7.55072 10.9821 8.39857 10.357 9.02369C9.73186 9.64881 8.88401 10 7.99996 10C7.1159 10 6.26806 9.64881 5.64294 9.02369C5.01782 8.39857 4.66663 7.55072 4.66663 6.66667C4.66663 6.29848 4.9651 6 5.33329 6Z" fill="#313237" />
            </svg>
            <svg
              className={classNames('icon--elipse', 'icon--elipse--2', {
                'icon--hidden': isIconCartHidden,
              })}
              width="20"
              height="20"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle id="Ellipse 10" cx="7" cy="7" r="6.5" fill="#EB5757" stroke="white" />
              {basketCount > 0 && (
                <text x="50%" y="50%" textAnchor="middle" dy="0.3em" fill="white" fontSize={8}>
                  {basketCount}
                </text>
              )}
            </svg>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
