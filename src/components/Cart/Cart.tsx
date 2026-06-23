import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ProductType } from 'types/ProductType';
import styles from './Cart.module.scss';
import { CartItem } from 'types/CartItem';
import { Loader } from '../Loader';

type Props = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  handleIncreaseQuantity: (item: number) => void;
  handleDecreaseQuantity: (item: number) => void;
  handleRemoveFromCart: (item: number) => void;
};

export const Cart: React.FC<Props> = ({
  cart,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  handleRemoveFromCart,
  setCart,
}) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const cartProducts = products.filter(p =>
    cart.some(item => item.id === p.id),
  );

  const total = cartProducts.reduce(
    (acc, product) =>
      acc +
      product.price * (cart.find(pr => pr.id === product.id)?.quantity ?? 0),
    0,
  );

  const itemsCount = cartProducts.reduce(
    (acc, product) =>
      acc + (cart.find(pr => pr.id === product.id)?.quantity ?? 0),
    0,
  );

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCheckout = () => {
    const userConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (userConfirmed) {
      handleClearCart();
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 500));

        const [productsRes] = await Promise.all([fetch('api/products.json')]);

        const [productsData] = await Promise.all([productsRes.json()]);

        setProducts(productsData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.home}>
        <NavLink to="/" className={styles.home_button}>
          <img src="img/slider/arrow_left.svg" alt="Back" />
        </NavLink>
        <p className={styles.home_text}>Back</p>
      </div>

      <h1 className={styles.home_title}>Cart</h1>

      <div className={styles.main_block}>
        {cartProducts.length === 0 ? (
          <div className={styles.empty}>
            <img src="img/cart-is-empty.png" alt="Cart is empty" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div>
              {cartProducts.map(product => (
                <div key={product.id} className={styles.product}>
                  <div className={styles.product_block1}>
                    <div
                      onClick={() => handleRemoveFromCart(product.id)}
                      className={styles.product_block1_close}
                    >
                      <img src="img/buttons/Close.svg" alt="Remove" />
                    </div>

                    <NavLink
                      className={styles.product_block1_image}
                      to={`/${product.category}/${product.itemId}`}
                    >
                      <img src={product.image} alt={product.name} />
                    </NavLink>

                    <NavLink
                      className={styles.product_block1_text}
                      to={`/${product.category}/${product.itemId}`}
                    >
                      {product.name}
                    </NavLink>
                  </div>

                  <div className={styles.product_block2}>
                    <div className={styles.product_block2_counter}>
                      <button
                        disabled={
                          cart.find(pr => pr.id === product.id)?.quantity === 1
                        }
                        onClick={() => handleDecreaseQuantity(product.id)}
                        className={styles.product_block2_counter_button}
                      >
                        <img src="img/cart/Minus.svg" alt="Decrease" />
                      </button>

                      <p className={styles.product_block2_counter_number}>
                        {cart.find(pr => pr.id === product.id)?.quantity || 0}
                      </p>

                      <button
                        onClick={() => handleIncreaseQuantity(product.id)}
                        className={styles.product_block2_counter_button}
                      >
                        <img src="img/cart/Plus.svg" alt="Increase" />
                      </button>
                    </div>

                    <p className={styles.product_block2_price}>
                      $
                      {product.price *
                        (cart.find(pr => pr.id === product.id)?.quantity ?? 0)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.full}>
              <h1 className={styles.full_price}>${total}</h1>
              <p className={styles.full_items}>Total for {itemsCount} items</p>
              <div className={styles.full_line}></div>
              <button className={styles.full_button} onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
