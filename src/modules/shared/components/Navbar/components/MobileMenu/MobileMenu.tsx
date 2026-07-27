import classNames from 'classnames';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './MobileMenu.module.scss';
import { CartButton } from '../../../CartButton';
import { FavButton } from '../../../FavButton';
import { NAV_LINKS } from '../../navLinks';
import { useShopState } from '../../../../hooks';

export type MobileMenuProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    const navigate = useNavigate();
    const { favoriteIds, cartIds } = useShopState();

    const mobileMenuClassName = classNames(styles.mobileMenu, {
        [styles['mobileMenu--open']]: isOpen,
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
                />
                <CartButton
                    onClick={() => {
                        navigate('/cart');
                        onClose();
                    }}
                    count={cartIds.length}
                />
            </footer>
        </aside>
    );
};
