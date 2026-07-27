import styles from './CartButton.module.scss';
import CartIcon from '../../../../assets/icons/Cart.svg';
export type CartButtonProps = {
    onClick?: () => void;
    disabled?: boolean;
    count?: number;
};

export const CartButton = ({
    onClick,
    disabled = false,
    count = 0,
}: CartButtonProps) => {
    return (
        <button
            className={styles.cartButton}
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label="Add to cart"
        >
            <img src={CartIcon} alt="Cart" className={styles.cartButtonIcon} />
            {count > 0 && (
                <span className={styles.cartButton__count}>{count}</span>
            )}
        </button>
    );
};
