import { Link } from 'react-router-dom';
import './Aside.scss';
import classNames from 'classnames';
import { useContext, useEffect } from 'react';
import { ProductsContext } from '../../context/ProductContext';

type Props = {
  isMenuOpen: boolean;
  handleMenuClose: () => void;
};

export const Aside: React.FC<Props> = ({ isMenuOpen, handleMenuClose }) => {
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isMenuOpen]);

  const { favoritesProducts, addedCartProducts } = useContext(ProductsContext);

  const sumOfCounters = addedCartProducts.reduce((acc, value) => {
    return acc + value.quantity;
  }, 0);

  return (
    <aside
      className={classNames('menu', { 'menu--open': isMenuOpen })}
      id="menu"
    >
      <div className="menu__nav">
        <Link to="/" className="menu__logo">
          <img src="logo/logo.svg" alt="Logo" />
        </Link>

        <div
          className="menu__close"
          aria-label="Close menu"
          onClick={() => {
            handleMenuClose();
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              // eslint-disable-next-line max-len
              d="M9.47205 1.47138C9.7324 1.21103 9.7324 0.788925 9.47205 0.528575C9.21171 0.268226 8.7896 0.268226 8.52925 0.528575L5.00065 4.05717L1.47206 0.528575C1.21171 0.268226 0.789596 0.268226 0.529247 0.528575C0.268897 0.788925 0.268897 1.21103 0.529247 1.47138L4.05784 4.99998L0.529247 8.52857C0.268897 8.78892 0.268897 9.21103 0.529247 9.47138C0.789596 9.73173 1.21171 9.73173 1.47206 9.47138L5.00065 5.94279L8.52925 9.47138C8.7896 9.73173 9.21171 9.73173 9.47205 9.47138C9.7324 9.21103 9.7324 8.78892 9.47205 8.52857L5.94346 4.99998L9.47205 1.47138Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      <div className="menu__main">
        <Link
          to="/"
          className="menu__navs-link"
          onClick={() => {
            handleMenuClose();
          }}
        >
          Home
        </Link>
        <Link
          to="/phones"
          className="menu__navs-link"
          onClick={() => {
            handleMenuClose();
          }}
        >
          Phones
        </Link>
        <Link
          to="/tablets"
          className="menu__navs-link"
          onClick={() => {
            handleMenuClose();
          }}
        >
          Tablets
        </Link>
        <Link
          to="/accessories"
          className="menu__navs-link"
          onClick={() => {
            handleMenuClose();
          }}
        >
          Accessories
        </Link>
      </div>
      <div className="menu__footer">
        <Link
          to="/favorites"
          className="menu__like"
          onClick={() => {
            handleMenuClose();
          }}
        >
          <svg
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              // eslint-disable-next-line max-len
              d="M9.62852 0.631417C10.1584 0.411843 10.7264 0.298828 11.3 0.298828C11.8737 0.298828 12.4416 0.411843 12.9716 0.631417C13.5015 0.850991 13.983 1.17282 14.3885 1.57852C14.7941 1.98398 15.1158 2.46537 15.3353 2.99519C15.5549 3.52511 15.6679 4.0931 15.6679 4.66671C15.6679 5.24032 15.5549 5.80831 15.3353 6.33824C15.1158 6.86811 14.794 7.34953 14.3884 7.75502C14.3883 7.75506 14.3884 7.75498 14.3884 7.75502L8.49502 13.6484C8.22165 13.9217 7.77844 13.9217 7.50507 13.6484L1.61174 7.75502C0.792668 6.93595 0.33252 5.82505 0.33252 4.66671C0.33252 3.50837 0.792668 2.39747 1.61174 1.5784C2.43081 0.759334 3.54171 0.299185 4.70005 0.299185C5.85839 0.299185 6.96928 0.759334 7.78835 1.5784L8.00005 1.7901L8.21162 1.57852C8.21158 1.57856 8.21166 1.57848 8.21162 1.57852C8.61711 1.17288 9.09865 0.85097 9.62852 0.631417ZM13.3983 2.56824C13.1228 2.29261 12.7957 2.07396 12.4357 1.92479C12.0756 1.77561 11.6898 1.69883 11.3 1.69883C10.9103 1.69883 10.5245 1.77561 10.1644 1.92479C9.80441 2.07396 9.4773 2.29261 9.2018 2.56824L8.49502 3.27502C8.22165 3.54839 7.77844 3.54839 7.50507 3.27502L6.7984 2.56835C6.24189 2.01183 5.48708 1.69918 4.70005 1.69918C3.91301 1.69918 3.15821 2.01183 2.60169 2.56835C2.04517 3.12487 1.73252 3.87967 1.73252 4.66671C1.73252 5.45375 2.04517 6.20855 2.60169 6.76507L8.00005 12.1634L13.3984 6.76507C13.674 6.48957 13.8928 6.16235 14.042 5.80233C14.1911 5.4423 14.2679 5.05642 14.2679 4.66671C14.2679 4.27701 14.1911 3.89112 14.042 3.5311C13.8928 3.17107 13.6739 2.84374 13.3983 2.56824Z"
              fill="#F1F2F9"
            />
          </svg>
          {favoritesProducts.length > 0 && (
            <div className="nav__like-notification">
              {favoritesProducts.length}
            </div>
          )}
        </Link>
        <Link
          to="/cart"
          className="menu__shop"
          onClick={() => {
            handleMenuClose();
          }}
        >
          <svg
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              // eslint-disable-next-line max-len
              d="M2.46683 0.933323C2.59273 0.765453 2.79032 0.666656 3.00016 0.666656H11.0002C11.21 0.666656 11.4076 0.765453 11.5335 0.933323L13.5335 3.59999C13.62 3.71539 13.6668 3.85574 13.6668 3.99999V13.3333C13.6668 13.8638 13.4561 14.3725 13.081 14.7475C12.706 15.1226 12.1973 15.3333 11.6668 15.3333H2.3335C1.80306 15.3333 1.29436 15.1226 0.919282 14.7475C0.54421 14.3725 0.333496 13.8638 0.333496 13.3333V3.99999C0.333496 3.85574 0.380281 3.71539 0.466829 3.59999L2.46683 0.933323ZM3.3335 1.99999L1.66683 4.22221V13.3333C1.66683 13.5101 1.73707 13.6797 1.86209 13.8047C1.98712 13.9298 2.15669 14 2.3335 14H11.6668C11.8436 14 12.0132 13.9298 12.1382 13.8047C12.2633 13.6797 12.3335 13.5101 12.3335 13.3333V4.22221L10.6668 1.99999H3.3335Z"
              fill="#F1F2F9"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              // eslint-disable-next-line max-len
              d="M0.333496 4.00001C0.333496 3.63182 0.631973 3.33334 1.00016 3.33334H13.0002C13.3684 3.33334 13.6668 3.63182 13.6668 4.00001C13.6668 4.3682 13.3684 4.66668 13.0002 4.66668H1.00016C0.631973 4.66668 0.333496 4.3682 0.333496 4.00001Z"
              fill="#F1F2F9"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              // eslint-disable-next-line max-len
              d="M4.33341 6C4.7016 6 5.00008 6.29848 5.00008 6.66667C5.00008 7.1971 5.21079 7.70581 5.58587 8.08088C5.96094 8.45595 6.46965 8.66667 7.00008 8.66667C7.53051 8.66667 8.03922 8.45595 8.41429 8.08088C8.78937 7.70581 9.00008 7.1971 9.00008 6.66667C9.00008 6.29848 9.29856 6 9.66675 6C10.0349 6 10.3334 6.29848 10.3334 6.66667C10.3334 7.55072 9.98222 8.39857 9.3571 9.02369C8.73198 9.64881 7.88414 10 7.00008 10C6.11603 10 5.26818 9.64881 4.64306 9.02369C4.01794 8.39857 3.66675 7.55072 3.66675 6.66667C3.66675 6.29848 3.96522 6 4.33341 6Z"
              fill="#F1F2F9"
            />
          </svg>
          {sumOfCounters > 0 && (
            <div className="nav__shop-notification">{sumOfCounters}</div>
          )}
        </Link>
      </div>
    </aside>
  );
};
