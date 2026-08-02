import classNames from 'classnames';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from './MobileMenu.module.scss';
import { CartButton } from '../../../CartButton';
import { FavButton } from '../../../FavButton';
import { NAV_LINKS } from '../../navLinks';
import { useShopState } from '../../../../hooks';

export type MobileMenuProps = {
    isOpen: boolean;
    onClose: () => void;
    hasSearch?: boolean;
};

export const MobileMenu = ({
    isOpen,
    onClose,
    hasSearch = false,
}: MobileMenuProps) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { favoriteIds, cartItemsCount } = useShopState();
    const isFavoritesPage = pathname === '/favorites';
    const isCartPage = pathname === '/cart';

    const mobileMenuClassName = classNames(styles.mobileMenu, {
        [styles['mobileMenu--open']]: isOpen,
        [styles['mobileMenu--withSearch']]: hasSearch,
    });

    return (
        <aside className={mobileMenuClassName}>
            <nav className={styles.mobileMenu__navLinks}>
                {NAV_LINKS.map(({ label, to }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={styles.link}
                        onClick={onClose}
                    >
                        {label}
                    </NavLink>
                ))}
            </nav>
            <footer className={styles.mobileMenu__footer}>
                <FavButton
                    onClick={() => {
                        navigate('/favorites');
                        onClose();
                    }}
                    count={favoriteIds.length}
                    isActive={isFavoritesPage}
                />
                <CartButton
                    onClick={() => {
                        navigate('/cart');
                        onClose();
                    }}
                    count={cartItemsCount}
                    isActive={isCartPage}
                />
            </footer>
        </aside>
    );
};
