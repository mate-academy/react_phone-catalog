import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import chevronLeftIcon from '../../assets/icons/Chevron-Left.svg';
import { CartItem } from '../shared/components/CartItem';
import { useProducts, useShopState } from '../shared/hooks';
import styles from './Cart.module.scss';

export const Cart = () => {
    const navigate = useNavigate();
    const { products, isLoading } = useProducts();
    const { cartItems, removeFromCart, updateCartQuantity, clearCart } =
        useShopState();

    const items = useMemo(
        () =>
            cartItems
                .map(item => {
                    const product = products.find(
                        currentProduct => currentProduct.itemId === item.id,
                    );

                    if (!product) {
                        return null;
                    }

                    return {
                        id: item.id,
                        quantity: item.quantity,
                        product,
                    };
                })
                .filter(
                    (
                        item,
                    ): item is {
                        id: string;
                        quantity: number;
                        product: (typeof products)[number];
                    } => item !== null,
                ),
        [cartItems, products],
    );

    const total = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
    );
    const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const handleCheckout = () => {
        const shouldClearCart = window.confirm(
            'Checkout is not implemented yet. Do you want to clear the Cart?',
        );

        if (shouldClearCart) {
            clearCart();
        }
    };

    return (
        <section className={styles.cart}>
            <button
                type="button"
                className={styles.cart__back}
                onClick={() => navigate(-1)}
            >
                <img
                    src={chevronLeftIcon}
                    alt=""
                    aria-hidden="true"
                    className={styles.cart__backIcon}
                />
                <span>Back</span>
            </button>

            <h1 className={styles.cart__title}>Cart</h1>

            {!isLoading && items.length === 0 ? (
                <p className={styles.cart__emptyText}>Your cart is empty</p>
            ) : (
                <div className={styles.cart__content}>
                    <ul className={styles.cart__list}>
                        {items.map(item => (
                            <CartItem
                                key={item.id}
                                image={`/${item.product.image}`}
                                name={item.product.name}
                                price={item.product.price}
                                quantity={item.quantity}
                                onIncrease={() =>
                                    updateCartQuantity(
                                        item.id,
                                        item.quantity + 1,
                                    )
                                }
                                onDecrease={() =>
                                    updateCartQuantity(
                                        item.id,
                                        item.quantity - 1,
                                    )
                                }
                                onRemove={() => removeFromCart(item.id)}
                            />
                        ))}
                    </ul>

                    <div className={styles.cart__summary}>
                        <p className={styles.cart__summaryTotal}>${total}</p>
                        <p className={styles.cart__summaryCount}>
                            Total for {itemsCount} item
                            {itemsCount === 1 ? '' : 's'}
                        </p>

                        <button
                            type="button"
                            className={styles.cart__checkout}
                            onClick={handleCheckout}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};
