import React, { useEffect, useState } from 'react';
import {
  NavLink,
  useParams,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import styles from './Navbar.module.scss';
import useCartStore from '../../stores/useCartStore';
import useFavoritesStore from '../../stores/useFavoritesStore';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import { Logo } from '../Logo';
import { MobileMenu } from './components/MobileMenu';
// eslint-disable-next-line max-len
import SlidingSearchInput from './components/SlidingSearchInput/SlidingSearchInput';
import useLanguageStore from '../../stores/useLanguageStore';
import ThemeSelect from '../ThemeSelect/ThemeSelect';
import { SearchIcon } from '../icons/SearchIcon';
import { MenuIcon } from '../icons/MenuIcon';
import { CloseIcon, HeartIcon, ShoppingBagIcon } from '../icons';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles['nav-item'], {
    [styles['nav-item-active']]: isActive,
  });

const getIconButtonClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.icon__button, {
    [styles['icon-button-active']]: isActive,
  });

export const Navbar: React.FC = () => {
  const { favorites } = useFavoritesStore();
  const { getTotalItems } = useCartStore();
  const { currentLanguage, loadCommonTranslations, t } = useLanguageStore();
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation(); // Для відстеження зміни маршруту

  // Отримуємо початкове значення пошуку з URL, якщо воно є
  const initialSearchQuery = searchParams.get('query') || '';
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isVisibleSerch =
    (category === 'phones' ||
      category === 'tablets' ||
      category === 'accessories') &&
    !productId;

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const resetSerchInput = () => {
    setSearchQuery(''); // Скидаємо локальний стан пошуку в навбарі
    // Також важливо скинути URLSearchParams, якщо ви хочете, щоб URL був чистим
    setSearchParams(
      prev => {
        prev.delete('query');

        return prev;
      },
      { replace: true },
    );
  };

  // !!! ФУНКЦІЯ ДЛЯ ВІДКРИТТЯ/ЗАКРИТТЯ ПОШУКУ !!!
  const toggleSearch = () => {
    setIsSearchOpen(prev => !prev); // Можна закрити меню, якщо відкривається пошук

    if (isSearchOpen) {
      resetSerchInput();
    }

    if (!isSearchOpen && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleCloseResetSerchInput = () => {
    setIsSearchOpen(false);
    resetSerchInput();
  };

  // Завантажуємо переклади, якщо мова змінилася і вони ще не завантажені
  useEffect(() => {
    loadCommonTranslations(currentLanguage);
  }, [currentLanguage, loadCommonTranslations]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'inherit';
    }
  }, [isMenuOpen]);

  // Очищаємо пошуковий запит при зміні маршруту, якщо це не сторінка категорії
  // Це запобігає збереженню пошукового запиту, якщо користувач перейшов на іншу сторінку
  // (наприклад, з телефонів на планшети, або на домашню сторінку)
  useEffect(() => {
    // Якщо поточний шлях не є сторінкою категорії, скидаємо пошуковий запит в навбарі.
    // Або ви можете дозволити пошуку залишатися, якщо це між категоріями.
    // Це залежить від вашої бізнес-логіки.
    // Приклад: якщо шлях не починається з /phones, /tablets, /accessories
    const isCategoryPage = ['/phones', '/tablets', '/accessories'].some(path =>
      location.pathname.startsWith(path),
    );

    if (!isCategoryPage && searchQuery) {
      setSearchQuery(''); // Скидаємо локальний стан пошуку в навбарі
      // Також важливо скинути URLSearchParams, якщо ви хочете, щоб URL був чистим
      setSearchParams(
        prev => {
          prev.delete('query');

          return prev;
        },
        { replace: true },
      );
    }
  }, [location.pathname, setSearchQuery, setSearchParams, searchQuery]);

  // Функція для оновлення пошукового запиту, яка також оновлює URL
  const handleSearchChange = (query: string) => {
    // 1. Отримуємо поточне значення з URL
    const currentQueryInUrl = searchParams.get('query') || '';

    // 2. Якщо новий запит такий самий, як в URL — зупиняємось!
    if (query === currentQueryInUrl) {
      return;
    }

    setSearchQuery(query); // Оновлюємо внутрішній стан Navbar

    // Оновлюємо URLSearchParams
    setSearchParams(
      prev => {
        if (query) {
          prev.set('query', query);
        } else {
          prev.delete('query');
        }

        // 3. Скидаємо сторінку, ТІЛЬКИ якщо ми реально змінили пошуковий запит
        prev.delete('page'); // Зазвичай при пошуку скидаємо пагінацію на першу сторінку

        return prev;
      },
      { replace: true },
    ); // replace: true, щоб не додавати зайві записи в історію браузера
  };

  return (
    <>
      <nav data-cy="nav" className={styles.nav}>
        {/* лого */}
        <div className={styles.nav__logo}>
          <Logo />
        </div>

        <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        {/* навігація */}
        <div className={styles.nav__list}>
          <NavLink to="/" className={getLinkClass}>
            {t('nav_home')}
          </NavLink>

          <NavLink
            to="/phones"
            className={getLinkClass}
            onClick={handleCloseResetSerchInput}
          >
            {t('nav_phones')}
          </NavLink>

          <NavLink
            to="/tablets"
            className={getLinkClass}
            onClick={handleCloseResetSerchInput}
          >
            {t('nav_tablets')}
          </NavLink>

          <NavLink
            to="/accessories"
            className={getLinkClass}
            onClick={handleCloseResetSerchInput}
          >
            {t('nav_accessories')}
          </NavLink>
        </div>

        <div className={styles['navbar-end']}>
          {isVisibleSerch && (
            <button
              className={classNames(
                styles.search__button,
                styles['search-toggle'],
              )}
              onClick={toggleSearch}
              aria-label={isSearchOpen ? 'Close search' : 'Open search'}
            >
              <SearchIcon />
            </button>
          )}

          <button
            className={styles.nav__burger}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          <div className={styles.navbarControls}>
            <div className={styles.select}>
              <LanguageSelect />
            </div>

            <div className={styles.select}>
              <ThemeSelect />
            </div>

            {/* кнопка улюблене */}
            <NavLink to="/favourites" className={getIconButtonClass}>
              <span className={styles.icon__item}>
                <HeartIcon />
              </span>

              {favorites.length > 0 && (
                <span className={styles['notification-badge']}>
                  {favorites.length}
                </span>
              )}
            </NavLink>

            {/* кнопка корзина */}
            <NavLink to="/cart" className={getIconButtonClass}>
              <span className={styles.icon__item}>
                <ShoppingBagIcon />
              </span>

              {getTotalItems() > 0 && (
                <span className={styles['notification-badge']}>
                  {getTotalItems()}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </nav>

      {isVisibleSerch && (
        <SlidingSearchInput
          isSearchOpen={isSearchOpen}
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          closeSearch={toggleSearch}
          category={category}
        />
      )}
    </>
  );
};
