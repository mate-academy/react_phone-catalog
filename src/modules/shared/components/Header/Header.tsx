import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import debounce from 'lodash.debounce';
import { Navbar } from './components/Navbar';
import { useCart } from '../../../../context/CartContext';
import { useFavorites } from '../../../../context/FavoritesContext';
import {
  HeartIcon,
  CartIcon,
  MenuIcon,
  CloseIcon,
  SearchIcon,
} from '../../ui/Icons/Icons';
import styles from './Header.module.scss';
import logo from '../../../../../public/img/Logo.svg';

const SEARCHABLE_PATHS = new Set([
  '/phones',
  '/tablets',
  '/accessories',
  '/favorites',
]);

interface ActionButtonsProps {
  buttonClass: string;
  activeClass: string;
  favoritesCount: number;
  cartCount: number;
  currentPath: string;
}

const ActionButtons = ({
  buttonClass,
  activeClass,
  favoritesCount,
  cartCount,
  currentPath,
}: ActionButtonsProps) => (
  <>
    <Link
      to="/favorites"
      className={cn(buttonClass, {
        [activeClass]: currentPath === '/favorites',
      })}
      aria-label={`Favorites (${favoritesCount})`}
    >
      <span className={styles.iconWrapper}>
        <HeartIcon />
        {favoritesCount > 0 && (
          <span className={styles.badge}>{favoritesCount}</span>
        )}
      </span>
    </Link>

    <Link
      to="/cart"
      className={cn(buttonClass, {
        [activeClass]: currentPath === '/cart',
      })}
      aria-label={`Cart (${cartCount})`}
    >
      <span className={styles.iconWrapper}>
        <CartIcon />
        {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
      </span>
    </Link>
  </>
);

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { cartItems } = useCart();
  const { favorites } = useFavorites();
  const location = useLocation();
  const query = searchParams.get('query') || '';
  const [localQuery, setLocalQuery] = useState(query);
  const cartItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const showSearch = SEARCHABLE_PATHS.has(location.pathname);

  const searchPlaceholder = 'Search';

  const updateQuery = useMemo(
    () =>
      debounce((value: string) => {
        setSearchParams(params => {
          const newParams = new URLSearchParams(params);

          if (value.trim()) {
            newParams.set('query', value.trim());
          } else {
            newParams.delete('query');
          }

          newParams.delete('page');

          return newParams;
        });
      }, 500),
    [setSearchParams],
  );

  const renderSearchField = () => (
    <label className={styles.searchField}>
      <SearchIcon className={styles.searchIcon} />

      <input
        type="search"
        className={styles.searchInput}
        placeholder={searchPlaceholder}
        value={localQuery}
        onChange={event => {
          setLocalQuery(event.target.value);
          updateQuery(event.target.value);
        }}
      />

      {localQuery && (
        <button
          type="button"
          className={styles.clearButton}
          aria-label="Clear search"
          onClick={() => {
            setLocalQuery('');
            updateQuery('');
          }}
        >
          <CloseIcon />
        </button>
      )}
    </label>
  );

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    return () => {
      updateQuery.cancel();
    };
  }, [updateQuery]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const sharedProps = {
    favoritesCount: favorites.length,
    cartCount: cartItemsCount,
    currentPath: location.pathname,
  };

  return (
    <header className={styles.header} data-cy="header">
      <div className={styles.row}>
        <div className={styles.left}>
          <Link
            to="/"
            className={styles.logo}
            aria-label="Nice Gadgets — home page"
          >
            <img src={logo} alt="" className={styles.logoImg} />
          </Link>

          <Navbar isOpen={isMenuOpen} />
        </div>

        {showSearch && renderSearchField()}

        <div className={styles.actions}>
          <div className={styles.desktopActions}>
            <ActionButtons
              buttonClass={styles.iconButton}
              activeClass={styles.iconButtonActive}
              {...sharedProps}
            />
          </div>

          <button
            type="button"
            className={styles.burger}
            onClick={() => setIsMenuOpen(open => !open)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-action-bar"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {showSearch && (
        <div className={styles.mobileSearch}>{renderSearchField()}</div>
      )}

      <div
        id="mobile-action-bar"
        className={cn(styles.mobileActions, {
          [styles.mobileActionsOpen]: isMenuOpen,
        })}
      >
        <ActionButtons
          buttonClass={styles.mobileActionButton}
          activeClass={styles.mobileActionButtonActive}
          {...sharedProps}
        />
      </div>
    </header>
  );
};
