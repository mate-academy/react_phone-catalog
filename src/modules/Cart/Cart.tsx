import { useState } from 'react';
import { CartItem } from '../shared/components/CartItem';
import styles from './Cart.module.scss';

type CartItemData = {
    id: string;
    image: string;
    name: string;
    price: number;
    quantity: number;
};

const INITIAL_CART_ITEMS: CartItemData[] = [
    {
        id: 'apple-iphone-11-pro-max-64gb-silver',
        image: '/img/phones/apple-iphone-11-pro-max/silver/00.webp',
        name: 'Apple iPhone 11 Pro Max 64GB Silver',
        price: 1099,
        quantity: 1,
    },
    {
        id: 'apple-iphone-11-pro-max-64gb-gold',
        image: '/img/phones/apple-iphone-11-pro-max/gold/00.webp',
        name: 'Apple iPhone 11 Pro Max 64GB Gold',
        price: 1099,
        quantity: 2,
    },
];

export const Cart = () => {
    const [items, setItems] = useState<CartItemData[]>(INITIAL_CART_ITEMS);

    const handleQuantityChange = (id: string, diff: number) => {
        setItems(current =>
            current.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + diff) }
                    : item,
            ),
        );
    };

    const handleRemove = (id: string) => {
        setItems(current => current.filter(item => item.id !== id));
    };

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );
    const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <section className={styles.cart}>
            <h1 className={styles.cart__title}>Cart</h1>

            {items.length === 0 ? (
                <div className={styles.cart__empty}>
                    <img
                        src="/img/cart-is-empty.png"
                        alt="Cart is empty"
                        className={styles.cart__emptyImage}
                    />
                    <p className={styles.cart__emptyText}>Your cart is empty</p>
                </div>
            ) : (
                <>
                    <ul className={styles.cart__list}>
                        {items.map(item => (
                            <CartItem
                                key={item.id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                onIncrease={() =>
                                    handleQuantityChange(item.id, 1)
                                }
                                onDecrease={() =>
                                    handleQuantityChange(item.id, -1)
                                }
                                onRemove={() => handleRemove(item.id)}
                            />
                        ))}
                    </ul>

                    <div className={styles.cart__summary}>
                        <p className={styles.cart__summaryTotal}>${total}</p>
                        <p className={styles.cart__summaryCount}>
                            Total for {itemsCount} item
                            {itemsCount === 1 ? '' : 's'}
                        </p>
                    </div>
                </>
            )}
        </section>
    );
};
