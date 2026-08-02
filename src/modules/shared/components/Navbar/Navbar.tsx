export type NavbarProps = Record<string, never>;
import { useEffect, useState } from 'react';
import {
    Link,
    useLocation,
    useNavigate,
    useSearchParams,
} from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from './navLinks';
import hamburgerIcon from '../../../../assets/icons/Menu.svg';
import closeIcon from '../../../../assets/icons/Close.svg';
import logo from '../../../../assets/logo.svg';
import styles from './Navbar.module.scss';
import { MobileMenu } from './components/MobileMenu';
import { FavButton } from '../FavButton';
import { CartButton } from '../CartButton';
import { useShopState } from '../../hooks';

const SEARCHABLE_PATHS = ['/phones', '/tablets', '/accessories', '/favorites'];
const SEARCH_DEBOUNCE_DELAY = 300;

export const Navbar = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { pathname } = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchValue, setSearchValue] = useState(
        searchParams.get('query') ?? '',
    );
    const { favoriteIds, cartItemsCount } = useShopState();
    const isFavoritesPage = pathname === '/favorites';
    const isCartPage = pathname === '/cart';
    const isSearchVisible = SEARCHABLE_PATHS.includes(pathname);
    const queryParam = searchParams.get('query') ?? '';

    useEffect(() => {
        setSearchValue(queryParam);
    }, [pathname, queryParam]);

    useEffect(() => {
        if (!isSearchVisible) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            const normalizedQuery = searchValue.trim();

            if (normalizedQuery === queryParam) {
                return;
            }

            const nextParams = new URLSearchParams(searchParams);

            if (normalizedQuery) {
                nextParams.set('query', normalizedQuery);
            } else {
                nextParams.delete('query');
            }

            nextParams.delete('page');
            setSearchParams(nextParams, { replace: true });
        }, SEARCH_DEBOUNCE_DELAY);

        return () => window.clearTimeout(timeoutId);
    }, [
        isSearchVisible,
        queryParam,
        searchParams,
        searchValue,
        setSearchParams,
    ]);

    const handleMenuToggle = () => {
        setIsMenuOpen(prev => !prev);
    };

    const handleMenuClose = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <div
                className={`${styles.navbarWrapper} ${
                    isSearchVisible ? styles['navbarWrapper--withSearch'] : ''
                }`}
            >
                <nav className={styles.navbar}>
                    <Link to="/" className={styles.navbar__logo}>
                        <img
                            src={logo}
                            alt="Logo"
                            className={styles.navbar__logoImage}
                        />
                    </Link>
                    <div className={styles.navLinks}>
                        {NAV_LINKS.map(({ label, to }) => (
                            <NavLink key={to} to={to} className={styles.link}>
                                {label}
                            </NavLink>
                        ))}
                    </div>
                    <button
                        className={styles.navbar__menuButton}
                        onClick={handleMenuToggle}
                        type="button"
                        aria-expanded={isMenuOpen}
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                        <img
                            src={isMenuOpen ? closeIcon : hamburgerIcon}
                            alt="Menu"
                        />
                    </button>
                    <div className={styles.navbar__BtnContainer}>
                        <FavButton
                            onClick={() => {
                                navigate('/favorites');
                            }}
                            count={favoriteIds.length}
                            isActive={isFavoritesPage}
                        />
                        <CartButton
                            onClick={() => {
                                navigate('/cart');
                            }}
                            count={cartItemsCount}
                            isActive={isCartPage}
                        />
                    </div>
                </nav>

                {isSearchVisible && (
                    <div className={styles.navbar__searchRow}>
                        <div className={styles.navbar__searchInner}>
                            <input
                                type="search"
                                className={styles.navbar__searchInput}
                                value={searchValue}
                                onChange={event =>
                                    setSearchValue(event.target.value)
                                }
                                placeholder="Search"
                                aria-label="Search products"
                            />
                        </div>
                    </div>
                )}
            </div>
            <MobileMenu
                isOpen={isMenuOpen}
                onClose={handleMenuClose}
                hasSearch={isSearchVisible}
            />
        </>
    );
};
