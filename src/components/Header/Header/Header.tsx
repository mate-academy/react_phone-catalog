import './Header.scss';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import { ChangeEvent, useContext } from 'react';
import { Logo } from '../../../common/Logo/Logo';
import { CartAndFavContext } from '../../../context/CartAndFavContext';
import { Product } from '../../../types/types';

type Props = {
  setVisibleIPhones: any,
  IPhones: Product[],
  setSearchInput: any,
  searchInput: string,
};

export const Header:React.FC<Props> = ({
  setVisibleIPhones,
  IPhones,
  setSearchInput,
  searchInput,
}) => {
  const { pathname } = useLocation();
  // const pathname = '/';
  const navLinksList = ['home', 'phones', 'tablets', 'accessories'];
  const {
    cartProducts, favProducts, setVisibleFavProducts,
  } = useContext<any>(CartAndFavContext);
  // const [visbleFavProducts, setVisbleFavProducts] = useState(favProducts)

  const searchOnPage = (event: ChangeEvent<HTMLInputElement>) => {
    switch (pathname) {
      case '/phones':
        setVisibleIPhones(IPhones.filter((one: any) => {
          return (
            one.name.toLowerCase().includes(
              event.target.value.toLowerCase(),
            ));
        }));
        break;
      case '/favourites':
        setVisibleFavProducts(favProducts.filter((one: any) => {
          return (
            one.name.toLowerCase().includes(
              event.target.value.toLowerCase(),
            ));
        }));
        break;
      default:
    }
  };

  return (
    <header className="header">
      <div className="header__block">
        <div className="header__navigation">
          <Logo />
          <ul className="header__navigation-list">
            {
              navLinksList.map((item) => {
                return (
                  <li key={item} className="header__navigation-item">
                    <NavLink
                      to={item}
                      activeClassName="active"
                      className="header__navigation-link"
                    >
                      {item}
                    </NavLink>
                  </li>
                );
              })
            }
          </ul>
        </div>
        <div className="header__buttons">
          {
            (pathname === '/favourites' || pathname === '/phones') && (
              <label className="products-search">
                <input
                  type="text"
                  placeholder={`Search in ${pathname.slice(1)}...`}
                  className="search-input"
                  value={searchInput}
                  onChange={(event) => {
                    setSearchInput(event.target.value);
                    searchOnPage(event);
                  }}
                />
                <img
                  src="/icons/Search.svg"
                  alt="Search"
                  className="small no-border"
                />
              </label>
            )
          }
          <NavLink to="/favourites">
            <div className="header-button">
              <img
                className="header-button__image"
                src="/icons/Favourites.svg"
                alt="favourites"
              />
              {
                favProducts.length > 0
              && <span className="favourite-amount">{favProducts.length}</span>
              }
            </div>
          </NavLink>
          <NavLink to="/cart">
            <div className="header-button">
              <img
                className="header-button__image"
                src="/icons/Cart.svg"
                alt="cart"
              />

              {cartProducts.length > 0
              && <span className="cart-amount">{cartProducts.length}</span>}
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
