import classNames from 'classnames';
import styles from './CartButton.module.scss';
import CartIcon from '../../../../assets/icons/Cart.svg';
export type CartButtonProps = {
    onClick?: () => void;
    disabled?: boolean;
    count?: number;
    isActive?: boolean;
};

export const CartButton = ({
    onClick,
    disabled = false,
    count = 0,
    isActive = false,
}: CartButtonProps) => {
    return (
        <button
            className={classNames(styles.cartButton, {
                [styles['cartButton--active']]: isActive,
            })}
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label="Add to cart"
            aria-current={isActive ? 'page' : undefined}
        >
            <img src={CartIcon} alt="Cart" className={styles.cartButtonIcon} />
            {count > 0 && (
                <span className={styles.cartButton__count}>{count}</span>
            )}
        </button>
    );
};
