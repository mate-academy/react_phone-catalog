import { useState } from 'react';
import style from './BurgerMenu.module.scss';
import { Logo } from '../Logo/Logo';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../../modules/shared/constants/navLinks';
import { useFavorites } from '../../context/FavoritesContext';
import { useAdd } from '../../context/AddCartContext';

export const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { favourites } = useFavorites();
  const { getTotalItems } = useAdd();
  const cartCount = getTotalItems();

  return (
    <>
      <button
        className={style.burger}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 4.5C1 4.08579 1.39175 3.75 1.875 3.75H14.125C14.6082 3.75 15 4.08579 15 4.5C15 4.91421 14.6082 5.25 14.125 5.25H1.875C1.39175 5.25 1 4.91421 1 4.5Z"
            fill="#313237"
          />
          <path
            d="M1 8C1 7.58579 1.39175 7.25 1.875 7.25H14.125C14.6082 7.25 15 7.58579 15 8C15 8.41421 14.6082 8.75 14.125 8.75H1.875C1.39175 8.75 1 8.41421 1 8Z"
            fill="#313237"
          />
          <path
            d="M1.875 10.75C1.39175 10.75 1 11.0858 1 11.5C1 11.9142 1.39175 12.25 1.875 12.25H14.125C14.6082 12.25 15 11.9142 15 11.5C15 11.0858 14.6082 10.75 14.125 10.75H1.875Z"
            fill="#313237"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={style.modal}>
          <div className={style.modal_header}>
            <Logo />
            <button
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <svg
                width="49"
                height="48"
                viewBox="0 0 49 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_134091_2929)">
                  <mask id="path-1-inside-1_134091_2929" fill="white">
                    <path d="M1 0H49V48H1V0Z" />
                  </mask>
                  <path d="M1 0H49V48H1V0Z" fill="white" />
                  <path
                    d="M49 47H1V49H49V47Z"
                    fill="#E2E6E9"
                    mask="url(#path-1-inside-1_134091_2929)"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M29.4714 20.4714C29.7318 20.211 29.7318 19.7889 29.4714 19.5286C29.2111 19.2682 28.789 19.2682 28.5286 19.5286L25 23.0572L21.4714 19.5286C21.2111 19.2682 20.789 19.2682 20.5286 19.5286C20.2683 19.7889 20.2683 20.211 20.5286 20.4714L24.0572 24L20.5286 27.5286C20.2683 27.7889 20.2683 28.211 20.5286 28.4714C20.789 28.7317 21.2111 28.7317 21.4714 28.4714L25 24.9428L28.5286 28.4714C28.789 28.7317 29.2111 28.7317 29.4714 28.4714C29.7318 28.211 29.7318 27.7889 29.4714 27.5286L25.9428 24L29.4714 20.4714Z"
                    fill="#313237"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_134091_2929"
                    x="0"
                    y="0"
                    width="49"
                    height="48"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dx="-1" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.886275 0 0 0 0 0.901961 0 0 0 0 0.913725 0 0 0 1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_134091_2929"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_134091_2929"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </button>
          </div>

          <nav className={style.nav}>
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  isActive ? `${style.link} ${style.link_active}` : style.link
                }
                onClick={() => setIsOpen(false)} // закрыть после клика
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className={style.modal_footer}>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive
                  ? `${style.icon_btn} ${style.icon_btn_active}`
                  : style.icon_btn
              }
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.62852 1.63136C10.1584 1.41178 10.7264 1.29877 11.3 1.29877C11.8737 1.29877 12.4416 1.41178 12.9716 1.63136C13.5015 1.85093 13.983 2.17276 14.3885 2.57846C14.7941 2.98392 15.1158 3.46531 15.3353 3.99513C15.5549 4.52505 15.6679 5.09304 15.6679 5.66665C15.6679 6.24026 15.5549 6.80825 15.3353 7.33817C15.1158 7.86805 14.794 8.34947 14.3884 8.75496C14.3883 8.755 14.3884 8.75492 14.3884 8.75496L8.49502 14.6483C8.22165 14.9217 7.77844 14.9217 7.50507 14.6483L1.61174 8.75496C0.792668 7.93589 0.33252 6.82499 0.33252 5.66665C0.33252 4.50831 0.792668 3.39741 1.61174 2.57834C2.43081 1.75927 3.54171 1.29912 4.70005 1.29912C5.85839 1.29912 6.96928 1.75927 7.78835 2.57834L8.00005 2.79003L8.21162 2.57846C8.21158 2.5785 8.21166 2.57842 8.21162 2.57846C8.61711 2.17281 9.09865 1.85091 9.62852 1.63136ZM13.3983 3.56818C13.1228 3.29255 12.7957 3.0739 12.4357 2.92472C12.0756 2.77555 11.6898 2.69877 11.3 2.69877C10.9103 2.69877 10.5245 2.77555 10.1644 2.92472C9.80441 3.0739 9.4773 3.29255 9.2018 3.56818L8.49502 4.27496C8.22165 4.54833 7.77844 4.54833 7.50507 4.27496L6.7984 3.56829C6.24189 3.01177 5.48708 2.69912 4.70005 2.69912C3.91301 2.69912 3.15821 3.01177 2.60169 3.56829C2.04517 4.12481 1.73252 4.87961 1.73252 5.66665C1.73252 6.45369 2.04517 7.20849 2.60169 7.76501L8.00005 13.1634L13.3984 7.76501C13.674 7.48951 13.8928 7.16229 14.042 6.80227C14.1911 6.44224 14.2679 6.05635 14.2679 5.66665C14.2679 5.27695 14.1911 4.89106 14.042 4.53103C13.8928 4.17101 13.6739 3.84367 13.3983 3.56818Z"
                  fill="#313237"
                />
              </svg>
              {favourites.length > 0 && (
                <span className={style.favourites_count}>
                  {favourites.length}
                </span>
              )}
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? `${style.icon_btn} ${style.icon_btn_active}`
                  : style.icon_btn
              }
              onClick={() => setIsOpen(false)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.46671 0.933293C3.59261 0.765422 3.7902 0.666626 4.00004 0.666626H12C12.2099 0.666626 12.4075 0.765422 12.5334 0.933293L14.5334 3.59996C14.6199 3.71536 14.6667 3.85571 14.6667 3.99996V13.3333C14.6667 13.8637 14.456 14.3724 14.0809 14.7475C13.7058 15.1226 13.1971 15.3333 12.6667 15.3333H3.33337C2.80294 15.3333 2.29423 15.1226 1.91916 14.7475C1.54409 14.3724 1.33337 13.8637 1.33337 13.3333V3.99996C1.33337 3.85571 1.38016 3.71536 1.46671 3.59996L3.46671 0.933293ZM4.33337 1.99996L2.66671 4.22218V13.3333C2.66671 13.5101 2.73695 13.6797 2.86197 13.8047C2.98699 13.9297 3.15656 14 3.33337 14H12.6667C12.8435 14 13.0131 13.9297 13.1381 13.8047C13.2631 13.6797 13.3334 13.5101 13.3334 13.3333V4.22218L11.6667 1.99996H4.33337Z"
                  fill="#313237"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.33337 3.99998C1.33337 3.63179 1.63185 3.33331 2.00004 3.33331H14C14.3682 3.33331 14.6667 3.63179 14.6667 3.99998C14.6667 4.36817 14.3682 4.66665 14 4.66665H2.00004C1.63185 4.66665 1.33337 4.36817 1.33337 3.99998Z"
                  fill="#313237"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.33329 6C5.70148 6 5.99996 6.29848 5.99996 6.66667C5.99996 7.1971 6.21067 7.70581 6.58575 8.08088C6.96082 8.45595 7.46953 8.66667 7.99996 8.66667C8.53039 8.66667 9.0391 8.45595 9.41417 8.08088C9.78925 7.70581 9.99996 7.1971 9.99996 6.66667C9.99996 6.29848 10.2984 6 10.6666 6C11.0348 6 11.3333 6.29848 11.3333 6.66667C11.3333 7.55072 10.9821 8.39857 10.357 9.02369C9.73186 9.64881 8.88401 10 7.99996 10C7.1159 10 6.26806 9.64881 5.64294 9.02369C5.01782 8.39857 4.66663 7.55072 4.66663 6.66667C4.66663 6.29848 4.9651 6 5.33329 6Z"
                  fill="#313237"
                />
              </svg>

              {cartCount > 0 && (
                <span className={style.cart_count}>{cartCount}</span>
              )}
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};
