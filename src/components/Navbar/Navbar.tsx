import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import classNames from 'classnames';
import './Navbar.scss';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { images } from '../../images';
import { ProductCategory, SearchParams } from '../../types/types';
import { ScrollToTop } from '../../utils/scrollWindowTop';
import { CatalogContext } from '../../context/CatalogContext';
import { getSearchWith } from '../../utils/getSearchWith';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('link', { activeLink: isActive });

const getLinkImgClass = ({ isActive }: { isActive: boolean }) =>
  classNames('icon__Imglink', { icon__activeImgLink: isActive });

export const Navbar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get('query') || '';
  const itemsPerPage = searchParams.get('perPage') || 'All';
  const [query, setQuery] = useState(currentQuery);

  const pageSizeRef = useRef<HTMLDivElement>(null);
  const { favouriteProducts, cartProducts } = useContext(CatalogContext);
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);

  const { pathname } = useLocation();
  const pathArray = pathname.split('/').slice(1);

  const validCategories = [
    ProductCategory.Accessories,
    ProductCategory.Phones,
    ProductCategory.Tablets,
  ].map(category => category.toString());

  useEffect(() => {
    if (currentQuery.length === 0) {
      setQuery('');
    }
  }, [currentQuery.length]);

  useEffect(() => {
    const pageSize = pageSizeRef.current;

    const handleResize = () => {
      if (pageSize && pageSize.clientWidth >= 640) {
        setBurgerMenu(false);
      }
    };

    const handleScrollAndOverflow = () => {
      if (burgerMenu) {
        ScrollToTop();
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    };

    handleResize();
    handleScrollAndOverflow();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'auto';
    };
  }, [burgerMenu, setBurgerMenu]);

  const setSearchWith = useCallback(
    (params: SearchParams) => {
      const search = getSearchWith(searchParams, params);

      setSearchParams(search);
    },
    [searchParams, setSearchParams],
  );

  const debounceSearch = debounce((value: string) => {
    if (value.trim() === '') {
      setSearchWith({ query: null });
    } else {
      setSearchWith({
        query: value,
        page: itemsPerPage === 'All' ? null : '1',
      });
    }
  }, 1000);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debounceSearch(event.target.value);
    setQuery(event.target.value);
  };

  const handleQueryClear = () => {
    setSearchWith({ query: null, page: itemsPerPage === 'All' ? null : '1' });
    setQuery('');
  };

  return (
    <nav
      ref={pageSizeRef}
      className={classNames('nav', {
        burger: burgerMenu,
      })}
    >
      <div
        className={classNames('nav__leftBlock', {
          burger__leftBlock: burgerMenu,
        })}
      >
        <NavLink onClick={ScrollToTop} to="/home">
          <div className="icon icon__logo"></div>
        </NavLink>
        <div
          onClick={
            burgerMenu ? () => setBurgerMenu(false) : () => setBurgerMenu(true)
          }
          className={classNames('icon icon__menu icon__menu--none', {
            icon__burger: burgerMenu,
          })}
        ></div>
      </div>

      <div
        className={classNames('nav__rightBlock', {
          burger__rightBlock: burgerMenu,
        })}
      >
        <div
          className={classNames('nav__rightBlock--left', {
            'burger__rightBlock--left': burgerMenu,
          })}
        >
          <NavLink
            onClick={() => setBurgerMenu(false)}
            className={getLinkClass}
            to="home"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setBurgerMenu(false)}
            className={getLinkClass}
            to="phones"
          >
            Phones
          </NavLink>
          <NavLink
            onClick={() => setBurgerMenu(false)}
            className={getLinkClass}
            to="tablets"
          >
            Tablets
          </NavLink>
          <NavLink
            onClick={() => setBurgerMenu(false)}
            className={getLinkClass}
            to="accessories"
          >
            Accessories
          </NavLink>
        </div>

        <div
          className={classNames('nav__rightBlock--right', {
            'burger__rightBlock--right': burgerMenu,
          })}
        >
          {pathArray.length === 1 && validCategories.includes(pathArray[0]) && (
            <div
              className={classNames('nav__search', {
                'nav__search--burger': burgerMenu,
              })}
            >
              <input
                type="text"
                placeholder="Search"
                className="nav__search--text"
                onFocus={() => setActiveSearch(true)}
                onBlur={() => setActiveSearch(false)}
                value={query}
                onChange={event => handleQueryChange(event)}
              />

              <img
                src={
                  activeSearch || query.length !== 0
                    ? images.closeImg
                    : images.searchImg
                }
                alt="searchImage"
                className={classNames('nav__search--img', {
                  'nav__search--img-hover': activeSearch || query.length !== 0,
                })}
                onClick={handleQueryClear}
              />
            </div>
          )}

          <div
            onClick={
              burgerMenu
                ? () => setBurgerMenu(false)
                : () => setBurgerMenu(true)
            }
            className={classNames('icon icon__menu', {
              'icon__burger-none': burgerMenu,
            })}
          ></div>
          <div
            className={classNames('nav__rightBlock--right-images', {
              'burger__rightBlock--right-images': burgerMenu,
            })}
          >
            <NavLink
              onClick={() => setBurgerMenu(false)}
              className={getLinkImgClass}
              to="/favourites"
            >
              <div className="icon icon__favourites">
                {favouriteProducts.length > 0 && (
                  <div className="icon__counter">
                    <span className="icon__counter--text">
                      {favouriteProducts.length}
                    </span>
                  </div>
                )}
              </div>
            </NavLink>
            <NavLink
              onClick={() => setBurgerMenu(false)}
              className={getLinkImgClass}
              to="/cart"
            >
              <div className="icon icon__cart">
                {cartProducts.length > 0 && (
                  <div
                    className="
                    icon__counter
                    icon__counter--cart
                  "
                  >
                    <span className="icon__counter--text">
                      {cartProducts.length}
                    </span>
                  </div>
                )}
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
