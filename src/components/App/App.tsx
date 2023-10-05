import './App.scss';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import {
  NavLink,
  Route,
  Routes,
  Navigate,
  Link,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
  useDebounceValue,
  useLocaleStorage,
} from '../../app/hooks';
import { basketItems, favoriteItems } from '../../app/store';
import { addAllFavorite } from '../../feature/favorite';
import { addAllBasket } from '../../feature/basket';
import { Product } from '../../type/Product';
import PageHome from '../PageHome';
import ProductsList from '../ProductList';
import ProductPage from '../ProductPage';
import PageCart from '../PageCart';

const BackToTop = () => {
  window.scrollTo(0, 0);
};

const pageArr = ['phones', 'tablets', 'accessories', 'favorites'];

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [menu, setMenu] = useState(false);
  const [searchValue, setSearchValue]
    = useState(searchParams.get('query') || '');
  const debouncedValue = useDebounceValue(searchValue, 1000);

  const query = searchParams.get('query') || '';

  const refMenu = useRef<HTMLElement>(null);
  const refBtnMenu = useRef<HTMLButtonElement>(null);
  const favoriteProduct = useAppSelector(favoriteItems);
  const basketProduct = useAppSelector(basketItems);

  const [favorite] = useLocaleStorage<Product[]>('prodFavorite', []);
  const [basketBuy] = useLocaleStorage<Product[]>('prodBuy', []);

  let countCart = 0;

  basketProduct.basketItem.forEach((el: Product) => {
    if (Object.hasOwnProperty.call(el, 'quantity')) {
      countCart += el.quantity;
    } else {
      countCart += 1;
    }
  });

  const locationName = location.pathname.split('/')[1];
  const checkPageForSearch:boolean = pageArr.includes(locationName);

  const checkedBasketPage:boolean = 'cart'
    .includes(locationName) && locationName !== '';

  const querySearch = (text: string) => {
    if (!text) {
      searchParams.delete('query');
    } else {
      searchParams.set('query', text);
    }

    setSearchParams(searchParams);
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onClickDeteleSearchValue = () => {
    setSearchValue('');
    searchParams.delete('query');
    setSearchParams(searchParams);
  };

  useEffect(() => {
    setSearchValue('');
  }, [location.pathname]);

  useEffect(() => {
    querySearch(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    dispatch(addAllFavorite(favorite));
    dispatch(addAllBasket(basketBuy));
  }, []);

  useEffect(() => {
    const handleOutClickMenu = (e: MouseEvent) => {
      if (refMenu.current && !refMenu.current.contains(e.target as Node)
      && refBtnMenu.current && !refBtnMenu.current.contains(e.target as Node)) {
        setMenu(false);
      }
    };

    document.addEventListener('mousedown', handleOutClickMenu);

    return () => document.removeEventListener('mousedown', handleOutClickMenu);
  }, []);

  useEffect(() => {
    setMenu(false);
  }, [window.location.hash]);

  return (
    <div className="page">
      <header className="header">
        <div className="header__content">
          <Link to="/" className="logo" />

          <nav className="navigation">
            <ul className="navigation__list">

              <li className="navigation__item">
                <NavLink
                  to="/"
                  className={({ isActive }) => classNames(
                    'navigation__link',
                    { active: isActive },
                  )}
                  data-cy="categoryLinksContainer"
                >
                  Home
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink
                  to="/phones"
                  className={({ isActive }) => classNames(
                    'navigation__link',
                    { active: isActive },
                  )}
                  data-cy="categoryLinksContainer"
                >
                  Phones
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink
                  to="/tablets"
                  className={({ isActive }) => classNames(
                    'navigation__link',
                    { active: isActive },
                  )}
                  data-cy="categoryLinksContainer"
                >
                  tablets
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink
                  to="/accessories"
                  className={({ isActive }) => classNames(
                    'navigation__link',
                    { active: isActive },
                  )}
                  data-cy="categoryLinksContainer"
                >
                  accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header__buy">
          {checkPageForSearch && (
            <div className="header__search">

              <input
                className={classNames(
                  'field__search--input',
                  { close: query.length > 0 },
                )}
                placeholder={`Search in ${locationName}...`}
                value={searchValue}
                onChange={onChangeSearch}
              />

              <button
                className={classNames(
                  'field__search--input',
                  'field__search--btn',
                  { close: query.length > 0 },
                )}
                onClick={onClickDeteleSearchValue}
                type="button"
                aria-label="btn"
                data-cy="searchDelete"
              />
            </div>
          )}

          {!checkedBasketPage && (
            <div className="header__btn header__btn--like">
              {favoriteProduct.favoriteItem.length > 0 && (
                <>
                  <span className="count">
                    {favoriteProduct.favoriteItem.length}
                  </span>

                  <Link
                    to="favorites"
                    data-cy="addToFavorite"
                    className="header__link"
                  />
                </>
              )}
            </div>
          )}

          <div className="header__btn header__btn--cart">
            {basketProduct.basketItem.length > 0 && (
              <>
                <span className="count">{countCart}</span>

                <Link
                  to="/cart"
                  data-cy="productQauntity"
                  className="header__link"
                />
              </>
            )}

          </div>
          <button
            className={classNames(
              'header__btn',
              'header__btn--menu',
              { active: menu },
            )}
            onClick={() => setMenu(!menu)}
            type="button"
            aria-label="btn"
            ref={refBtnMenu}
          />
        </div>
      </header>

      <nav
        className={classNames('navigation--mobiel', { active: menu })}
        id="menu"
        ref={refMenu}
      >
        <ul className="navigation--mobiel__list">
          <li className="navigation--mobiel__item">
            <NavLink
              to="/home"
              className="navigation--mobiel__link"
            >
              home
            </NavLink>
          </li>

          <li className="navigation--mobiel__item">
            <NavLink
              to="/phones"
              className="navigation--mobiel__link"
            >
              Phones
            </NavLink>
          </li>

          <li className="navigation--mobiel__item">
            <NavLink
              to="/tablets"
              className="navigation--mobiel__link"
            >
              tablets
            </NavLink>
          </li>

          <li className="navigation--mobiel__item">
            <NavLink
              to="/accessories"
              className="navigation--mobiel__link"
            >
              accessories
            </NavLink>
          </li>

          <li className="navigation--mobiel__item">
            <NavLink
              to="/phones"
              className="navigation--mobiel__link"
            >
              Github
            </NavLink>
          </li>

          <li className="navigation--mobiel__item">
            <NavLink
              to="/tablets"
              className="navigation--mobiel__link"
            >
              Contacts
            </NavLink>
          </li>

          <li className="navigation--mobiel__item">
            <NavLink
              to="/accessories"
              className="navigation--mobiel__link"
            >
              rights
            </NavLink>
          </li>
        </ul>
      </nav>

      <main className="main">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={(
                <PageHome />
              )}
            />
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="/phones">
              <Route
                index
                element={(
                  <ProductsList
                    query={query}
                  />
                )}
              />
              <Route
                path=":id"
                element={(
                  <ProductPage />
                )}
              />
            </Route>

            <Route path="/tablets">
              <Route
                index
                element={(
                  <ProductsList
                    query={query}
                  />
                )}
              />
              <Route
                path=":id"
                element={(
                  <ProductPage />
                )}
              />
            </Route>

            <Route path="/accessories">
              <Route
                index
                element={(
                  <ProductsList
                    query={query}
                  />
                )}
              />
              <Route
                path=":id"
                element={(
                  <ProductPage />
                )}
              />
            </Route>

            <Route
              path="/favorites"
              element={
                <ProductsList query={query} />
              }
            />

            <Route path="/cart" element={<PageCart />} />
          </Routes>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer__content">
            <Link to="/" className="logo" />

            <nav className="footer__nav">
              <ul className="footer__list">
                <li className="footer__item">
                  <a href="/" className="footer__link">
                    Github
                  </a>
                </li>

                <li className="footer__item">
                  <a href="/" className="footer__link">
                    Contacts
                  </a>
                </li>

                <li className="footer__item">
                  <a href="/" className="footer__link">
                    rights
                  </a>
                </li>
              </ul>
            </nav>

            <div className="footer__back-block">
              <span className="footer__back">Back to top</span>
              <button
                onClick={BackToTop}
                className="btn btn--back"
                type="button"
                aria-label="btn"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
