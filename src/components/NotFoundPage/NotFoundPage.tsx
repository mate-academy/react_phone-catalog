import { Link, NavLink } from 'react-router-dom';
import { CardPhone } from '../../cardPhone';
import './NotFoundPage.scss';

interface Props {
  likeItems: CardPhone[];
  cartItems: CardPhone[];
}

export const NotFoundPage = ({ likeItems, cartItems }: Props) => {
  return (
    <>
      <header className="header">
        <div className="header__navlist">
          <a href="#">
            <div className="header--logo"></div>
          </a>
          <ul className="header__list">
            <Link to="/" className="header__href">
              <li className="header__item">home</li>
            </Link>
            <Link to="/phones" className="header__href">
              <li className="header__item">phones</li>
            </Link>
            <Link to="/tablets" className="header__href">
              <li className="header__item">tablets</li>
            </Link>
            <Link to="/accessories" className="header__href">
              <li className="header__item">accessories</li>
            </Link>
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
                    {cartItems.length}
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
