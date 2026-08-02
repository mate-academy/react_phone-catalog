export type NavbarProps = Record<string, never>;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

export const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { favoriteIds, cartIds } = useShopState();

    const handleMenuToggle = () => {
        setIsMenuOpen(prev => !prev);
    };

    const handleMenuClose = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
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
                    />
                    <CartButton
                        onClick={() => {
                            navigate('/cart');
                        }}
                        count={cartIds.length}
                    />
                </div>
            </nav>
            <MobileMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
        </>
    );
};
