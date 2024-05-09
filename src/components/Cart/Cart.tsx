import React, { useEffect, useState } from 'react';
import styles from './Cart.module.scss';
import 'bulma/css/bulma.min.css';
// import { ProductCard } from '../ProductCard/ProductCard';
import { NavLink } from 'react-router-dom';
import { Header } from '../Header/header';
import { Footer } from '../Footer/footer';
// import Loader from '../loader/spiner';
import { ProductType } from '../../services/enums';
// import { useLocalStorage } from '../../local/localStorege';
import { Product } from '../../services/productType';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { removeFromCart } from '../../feachers/detailSlice';
import cartIsEmptyImage from './pictures/cart-is-empty.png';

type Props = {
  type: ProductType[];
  title: string;
};

export const Cart: React.FC<Props> = ({ title }) => {
  // const [data] = useLocalStorage<Product[]>('cart', []);
  const [cartProduct, setCartProduct] = useState<Product[]>([]);
  // const [counter, setCounter] = useState(1);
  const data = useAppSelector(state => state.cartAndFavorits.cart);
  // const [cart, setCart] = useLocalStorage<Product[]>('cart', []);
  const dispatch = useAppDispatch();

  const initialCartProduct: Product[] = data.map(item => ({
    ...item,
    counter: 1,
  }));

  useEffect(() => {
    setCartProduct(initialCartProduct);
  }, [data]);

  const handleCountMinus = (id: number) => {
    setCartProduct(prevProducts => {
      return prevProducts.map(product => {
        if (product.id === id) {
          return { ...product, counter: Math.max(product.counter - 1, 1) };
        }

        return product;
      });
    });
  };

  const handleCountPlus = (id: number) => {
    setCartProduct(prevProducts => {
      return prevProducts.map(product => {
        if (product.id === id) {
          return { ...product, counter: product.counter + 1 };
        }

        return product;
      });
    });
  };

  // eslint-disable-next-line no-console
  console.log(cartProduct);

  // useEffect(() => {
  //   setCartProduct(data);
  // }, [data, cartProduct]);

  // const handleCountMinus = () => {
  //   if (counter > 1) {
  //     setCounter(prev => prev - 1);
  //   }
  // };

  // const handleCountPlus = () => {
  //   setCounter(prev => prev + 1);
  // };

  return (
    <>
      <Header />
      <div className={styles.cartWrapper}>
        <section className={styles.cart}>
          <div className={styles.homeLinkContainer}>
            <div className={styles.linkBack}>
              <svg
                className={styles.arrowBack}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  // eslint-disable-next-line max-len
                  d="M5.52876 3.52851C5.78911 3.26816 6.21122 3.26816 6.47157 3.52851L10.4716 7.52851C10.7319 7.78886 10.7319 8.21097 10.4716 8.47132L6.47157 12.4713C6.21122 12.7317 5.78911 12.7317 5.52876 12.4713C5.26841 12.211 5.26841 11.7889 5.52876 11.5285L9.05735 7.99992L5.52876 4.47132C5.26841 4.21097 5.26841 3.78886 5.52876 3.52851Z"
                  fill="#0F0F11"
                />
              </svg>
              <NavLink to={'/'}>
                <span className={styles.back}>Back</span>
              </NavLink>
            </div>
          </div>
          <div className={styles.titleAndItems}>
            <h1 className={styles.cartTitle}>{title}</h1>
          </div>
          <div className={styles.productCartContainer}>
            {!cartProduct.length ? (
              <picture>
                <img
                  src={cartIsEmptyImage}
                  alt="Empty Cart"
                  className={styles.empyCartImg}
                />
              </picture>
            ) : (
              <div className={styles.productCartProducts}>
                {cartProduct.map(item => (
                  <div className={styles.products} key={item.id}>
                    {/* <div className={styles.loaderContainer}>{<Loader />}</div> */}
                    <div className={styles.productsCart}>
                      <div className={styles.productNameImgDelete}>
                        <svg
                          onClick={() => dispatch(removeFromCart(item))}
                          className={styles.buttonDelete}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            // eslint-disable-next-line max-len
                            d="M12.4711 4.47132C12.7314 4.21097 12.7314 3.78886 12.4711 3.52851C12.2107 3.26816 11.7886 3.26816 11.5283 3.52851L7.99967 7.05711L4.47108 3.52851C4.21073 3.26816 3.78862 3.26816 3.52827 3.52851C3.26792 3.78886 3.26792 4.21097 3.52827 4.47132L7.05687 7.99992L3.52827 11.5285C3.26792 11.7889 3.26792 12.211 3.52827 12.4713C3.78862 12.7317 4.21073 12.7317 4.47108 12.4713L7.99967 8.94273L11.5283 12.4713C11.7886 12.7317 12.2107 12.7317 12.4711 12.4713C12.7314 12.211 12.7314 11.7889 12.4711 11.5285L8.94248 7.99992L12.4711 4.47132Z"
                            fill="#B4BDC4"
                          />
                        </svg>
                        {/* <button className={styles.buttonDelete}></button> */}
                        <img
                          className={styles.productImg}
                          alt="product"
                          src={item.image}
                        ></img>
                        <p className={styles.productName}>{item.name}</p>
                      </div>
                      <div className={styles.counterAndPriceContainer}>
                        <div className={styles.productCounterContainer}>
                          <button
                            className={styles.counterButton}
                            onClick={() => handleCountMinus(item.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                // eslint-disable-next-line max-len
                                d="M2.66699 7.99992C2.66699 7.63173 2.96547 7.33325 3.33366 7.33325H12.667C13.0352 7.33325 13.3337 7.63173 13.3337 7.99992C13.3337 8.36811 13.0352 8.66659 12.667 8.66659H3.33366C2.96547 8.66659 2.66699 8.36811 2.66699 7.99992Z"
                                fill="#0F0F11"
                              />
                            </svg>
                          </button>
                          <span className={styles.counterItems}>
                            {item.counter}
                          </span>
                          <button
                            className={styles.counterButton}
                            onClick={() => handleCountPlus(item.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                // eslint-disable-next-line max-len
                                d="M8.66699 3.33341C8.66699 2.96522 8.36852 2.66675 8.00033 2.66675C7.63214 2.66675 7.33366 2.96522 7.33366 3.33341V7.33342H3.33366C2.96547 7.33342 2.66699 7.63189 2.66699 8.00008C2.66699 8.36827 2.96547 8.66675 3.33366 8.66675H7.33366V12.6667C7.33366 13.0349 7.63214 13.3334 8.00033 13.3334C8.36852 13.3334 8.66699 13.0349 8.66699 12.6667V8.66675H12.667C13.0352 8.66675 13.3337 8.36827 13.3337 8.00008C13.3337 7.63189 13.0352 7.33342 12.667 7.33342H8.66699V3.33341Z"
                                fill="#0F0F11"
                              />
                            </svg>
                          </button>
                        </div>

                        <span
                          className={styles.productPrice}
                        >{`$${item.price}`}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cartProduct.length > 0 && (
              <div className={styles.productPrices}>
                <span className={styles.allPrice}>
                  {`$${cartProduct.reduce((totalPrice, item) => totalPrice + item.price * item.counter, 0)}`}
                </span>
                <p className={styles.totalItems}>
                  Total for {cartProduct.length} items
                </p>
                <span className={styles.line}></span>
                <button className={styles.buttonCheckout}>Checkout</button>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};
