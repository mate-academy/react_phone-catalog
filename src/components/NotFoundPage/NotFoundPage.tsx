import { Link, NavLink } from 'react-router-dom';
import { CardPhone } from '../../cardPhone';
import './NotFoundPage.scss';

interface Props {
  likeItems: CardPhone[];
  cartItems: CardPhone[];
  totalItems: number;
}

export const NotFoundPage = ({ likeItems, cartItems, totalItems }: Props) => {
  return (
    <>
      <header className="header">
        <div className="header__navlist">
          <div className="header--logo"></div>
          <ul className="header__list">
            <li className="header__item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'header__active' : 'header__href'
                }
              >
                home
              </NavLink>
            </li>
            <li className="header__item">
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  isActive ? 'header__active' : 'header__href'
                }
              >
                phones
              </NavLink>
            </li>
            <li className="header__item">
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  isActive ? 'header__active' : 'header__href'
                }
              >
                tablets
              </NavLink>
            </li>
            <li className="header__item">
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  isActive ? 'header__active' : 'header__href'
                }
              >
                accessories
              </NavLink>
            </li>
          </ul>
        </div>

        <Link to="/menu">
          <div className="header--menu"></div>
        </Link>

        <div className="header__navigation">
          <NavLink
            to="/favourites"
            className={({ isActive }) => (isActive ? 'header__activenav' : '')}
          >
            <div className="header__navigation--like">
              {likeItems.length !== 0 && (
                <div className="header__navigation--count">
                  <p className="header__navigation--count--style">
                    {likeItems.length}
                  </p>
                </div>
              )}
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? 'header__activenav' : '')}
          >
            <div className="header__navigation--bag">
              {cartItems.length !== 0 && (
                <div className="header__navigation--count">
                  <p className="header__navigation--count--style">
                    {totalItems}
                  </p>
                </div>
              )}
            </div>
          </NavLink>
        </div>
      </header>

      <p className="found">Page not found &#128546;</p>
    </>
  );
};
