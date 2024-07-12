import './Header.scss';
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ProductContext } from '../../store/ProductContext';
import { NavItems } from '../Navigation/Navigation';
import { getSearchWith } from '../../utils/getSearchWith';
import { debounce } from '../../utils/debounce';
import { ToggleButton } from '../ToggleButton';
import { ProductGeneral } from '../../types/ProductGeneral';

const windowSize = window.innerWidth > 640;

type Props = {
  onDark: () => void;
  isDark: boolean;
};

export const Header = ({ onDark, isDark }: Props) => {
  const { menuOpened, onMenuOpened, inFavourites, inCart } =
    useContext(ProductContext);
  const [isDesktop, setIsDesktop] = useState(windowSize);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 640);
      if (window.innerWidth > 640) {
        onMenuOpened(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [onMenuOpened]);

  const toggleMenu = () => {
    if (windowSize) {
      onMenuOpened(false);
    }

    onMenuOpened(!menuOpened);
  };

  const handleLikeButton = () => {
    if (menuOpened) {
      onMenuOpened(false);
    }

    navigate('favorites', {
      state: { search: searchParams.toString(), pathname },
    });
  };

  const handleCartButton = () => {
    if (menuOpened) {
      onMenuOpened(false);
    }

    navigate('cart', { state: { search: searchParams.toString(), pathname } });
  };

  const includesPathname = pathname.split('/').filter(path => path);

  const result =
    includesPathname[0] === 'phones' ||
    includesPathname[0] === 'tablets' ||
    includesPathname[0] === 'accessories';

  function setSearchWith(params: any) {
    const queryParam = getSearchWith(params, searchParams.toString());

    setSearchParams(queryParam);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      const currentParams = Object.fromEntries(searchParams.entries());

      setSearchWith({
        ...currentParams,
        query: newQuery === '' ? null : newQuery,
      });
    }, 500),
    [searchParams, setSearchWith],
  );

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = event.target.value;

    setQuery(newQuery);

    if (newQuery === '') {
      setSearchWith({ query: null });
    } else {
      applyQuery(newQuery);
    }
  }

  useEffect(() => {
    setQuery('');
  }, [pathname]);

  const inCartQuantity = (inCart as ProductGeneral[]).reduce(
    (acc: number, item: ProductGeneral) => acc + item.quantity,
    0,
  );

  const handleClearInput = () => {
    setQuery('');
    setSearchWith({ query: null });
  };

  return (
    <>
      <header className="header" ref={headerRef}>
        <div className="header__wrapper">
          <Link to="/" className="header__logo"></Link>
          {<NavItems />}
        </div>

        <div className="wrapper">
          <div className="header__buttons">
            {includesPathname.length === 1 && result && (
              <div className="header__search">
                <input
                  type="text"
                  value={query}
                  className="header__search--input"
                  onChange={handleInputChange}
                />
                <div
                  className="header__search__close icon"
                  onClick={handleClearInput}
                ></div>
              </div>
            )}
            <ToggleButton isDark={isDark} onDark={onDark} />
            <div
              className={classNames('header__buttons__container', {
                'is-active': pathname.includes('favorites'),
              })}
              onClick={handleLikeButton}
            >
              <NavLink
                to="/favorites"
                state={{ search: searchParams.toString(), pathname }}
                className="icon icon--favourites"
              ></NavLink>
              {!!inFavourites.length && (
                <div className="icon--favourites__number">
                  <p className="icon--favourites__text">
                    {inFavourites.length}
                  </p>
                </div>
              )}
            </div>

            <div
              className={classNames('header__buttons__container', {
                'is-active': pathname.includes('cart'),
              })}
              onClick={handleCartButton}
            >
              <NavLink
                to="/cart"
                state={{ search: searchParams.toString(), pathname }}
                className="icon icon--cart"
              ></NavLink>
              {!!inCart.length && (
                <div className="icon--favourites__number">
                  <p className="icon--favourites__text">{inCartQuantity}</p>
                </div>
              )}
            </div>
          </div>

          <div className="menu__button" onClick={toggleMenu}>
            <div className="menu__button__container">
              <a
                className={classNames(
                  `icon ${menuOpened ? 'icon--close' : 'icon--menu'}`,
                )}
              ></a>
            </div>
          </div>
        </div>
      </header>

      {menuOpened && !isDesktop && (
        <div className="overlay">
          <div className="overlay__content">
            <nav className="mobile-menu__nav">
              <NavItems />
            </nav>

            <div className="mobile-menu__footer">
              <div className="icon__container" onClick={handleLikeButton}>
                <a className="icon icon--favourites"></a>
                {!!inFavourites.length && (
                  <div className="icon--favourites__number">
                    <p className="icon--favourites__text">
                      {inFavourites.length}
                    </p>
                  </div>
                )}
              </div>
              <div className="icon__container" onClick={handleCartButton}>
                <a className="icon icon--cart"></a>
                {!!inCart.length && (
                  <div className="icon--cart__number">
                    <p className="icon--cart__text">{inCart.length}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
