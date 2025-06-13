import React from 'react';
import { useCart } from '../UseCart/UseCart';
import styles from './Cart.module.scss';
import { useNavigate } from 'react-router-dom';
import phones from '../../public/api/phones.json';
import tablets from '../../public/api/tablets.json';
import accessories from '../../public/api/accessories.json';

type AllProduct = {
  id: string;
  name: string;
  priceRegular: number;
  priceDiscount?: number;
  images: string[];
  quantity: number;
  screen?: string;
  capacity?: string;
  ram?: string;
};

export const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  const findSameProduct = (productId: string): AllProduct | undefined => {
    const allProducts = [...phones, ...tablets, ...accessories];
    const foundProduct = allProducts.find(product => product.id === productId);

    return foundProduct ? { ...foundProduct, quantity: 1 } : undefined;
  };

  const totalItems = state.cart.reduce(
    (total, product) => total + (product.quantity || 1),
    0,
  );

  const totalPrice = state.cart.reduce((total, product) => {
    const price = Number(product.priceDiscount || product.priceRegular) || 0;

    return total + price * (product.quantity || 1);
  }, 0);

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCheckOut = () => {
    dispatch({ type: 'CLEAR_CART' });
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <button className={styles.button_back} onClick={handleBackClick}>
          <img src="img/Arrow-left.svg" alt="" className={styles.arrow_img} />
          Back
        </button>
      </div>
      <h1 className={styles.navigation_title}>Cart</h1>
      <div className={styles.cart_container}>
        {state.cart.length === 0 ? (
          <p className={styles.empty}>Your cart is empty</p>
        ) : (
          <>
            <div className={styles.cart_grid}>
              {state.cart.map(product => {
                const fullProduct = findSameProduct(product.id) || product;

                return (
                  <div key={product.id} className={styles.cart_item}>
                    <div className={styles.cart_item__top}>
                      <button
                        className={styles.remove_button}
                        onClick={() =>
                          dispatch({
                            type: 'REMOVE_FROM_CART',
                            productId: product.id,
                          })
                        }
                      >
                        ✕
                      </button>
                      <img
                        src={fullProduct.images?.[0] ?? 'img/default-image.png'}
                        alt={fullProduct.name}
                        className={styles.product_image}
                      />
                      <h2 className={styles.product_name}>
                        {fullProduct.name}
                      </h2>
                    </div>
                    <div className={styles.cart_bottom}>
                      <div className={styles.quantity_control}>
                        <button
                          className={styles.quantity_button}
                          onClick={() =>
                            dispatch({
                              type: 'DECREASE_QUANTITY',
                              productId: product.id,
                            })
                          }
                        >
                          -
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          className={styles.quantity_button}
                          onClick={() =>
                            dispatch({
                              type: 'INCREASE_QUANTITY',
                              productId: product.id,
                            })
                          }
                        >
                          +
                        </button>
                      </div>
                      <div className={styles.price}>
                        {fullProduct.priceDiscount ? (
                          <>
                            <span className={styles.discount_price}>
                              ${fullProduct.priceDiscount}
                            </span>
                            <span className={styles.original_price}>
                              ${fullProduct.priceRegular}
                            </span>
                          </>
                        ) : (
                          <span className={styles.price}>
                            ${fullProduct.priceRegular}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.checkout}>
              <div className={styles.total_price}>
                <span className={styles.total_price_span}>${totalPrice}</span>
              </div>
              <div className={styles.total_items}>
                <span className={styles.total_items_span}>
                  Total for {totalItems} items
                </span>
              </div>
              <button
                className={styles.checkout_button}
                onClick={handleCheckOut}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
