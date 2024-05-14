import React, { useEffect, useState } from 'react';
import styles from './Cart.module.scss';
import 'bulma/css/bulma.min.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { ProductType } from '../../Helpers/enumProductType';
// import { Product } from '../../types/productType';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import {
  CartProduct,
  addProductCount,
  removeFromCart,
} from '../../Reducers/fauvoritsAndCartSlice';
import cartIsEmptyImage from './pictures/cart-is-empty.png';
import deleteButton from './pictures/Close.png';
import deleteButtonDark from './pictures/closeDark.png';
import { Theme } from '../../Helpers/theme';
import Loader from '../Loader/Spiner';

type Props = {
  type: ProductType[];
  title: string;
};

export const Cart: React.FC<Props> = ({ title }) => {
  const [cartProduct, setCartProduct] = useState<CartProduct[]>([]);
  const data = useAppSelector(state => state.cartAndFavorits.cart);
  const theme = useAppSelector(state => state.theme.theme);
  const load = useAppSelector(state => state.phones.isLoading);

  // console.log(cartProduct);
  // console.log(cartProduct);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const initialCartProduct: Product[] = data.map(item => ({
  //   ...item,
  //   counter: 1,
  // }));

  useEffect(() => {
    setCartProduct(data);
  }, [data]);

  // const handleCountMinus = (id: number) => {
  //   setCartProduct(prevProducts => {
  //     return prevProducts.map(product => {
  //       if (product.id === id) {
  //         return { ...product, counter: Math.max(product.counter - 1, 1) };
  //       }

  //       return product;
  //     });
  //   });
  // };

  // const handleCountPlus = (id: number) => {
  //   setCartProduct(prevProducts => {
  //     return prevProducts.map(product => {
  //       if (product.id === id) {
  //         return { ...product, counter: product.counter + 1 };
  //       }

  //       return product;
  //     });
  //   });
  // };

  const handleCountMinus = (id: number) => {
    dispatch(addProductCount({ id, increment: -1 }));
  };

  const handleCountPlus = (id: number) => {
    dispatch(addProductCount({ id, increment: +1 }));
  };

  return (
    <>
      <div
        className={
          theme === Theme.light
            ? styles.cartContainer
            : styles.cartContainerDark
        }
      >
        <div className={styles.headerAndMain}>
          <Header />
          <div
            className={
              theme === Theme.light ? styles.background : styles.backgroundDark
            }
          >
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
                        fill={theme === Theme.light ? '#0F0F11' : '#F1F2F9'}
                      />
                    </svg>
                    <span
                      className={
                        theme === Theme.light ? styles.back : styles.backDark
                      }
                      onClick={() => navigate(-1)}
                    >
                      Back
                    </span>
                  </div>
                </div>
                <div className={styles.titleAndItems}>
                  <h1
                    className={
                      theme === Theme.light
                        ? styles.cartTitle
                        : styles.cartTitleDark
                    }
                  >
                    {title}
                  </h1>
                </div>
                <div className={styles.productCartContainer}>
                  {load && <Loader />}
                  {!cartProduct.length && !load ? (
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
                        <div className={styles.products} key={item.product.id}>
                          <div
                            className={
                              theme === Theme.light
                                ? styles.productsCart
                                : styles.productsCartDark
                            }
                          >
                            <div className={styles.productNameImgDelete}>
                              <img
                                src={
                                  theme === Theme.light
                                    ? deleteButton
                                    : deleteButtonDark
                                }
                                className={styles.buttonDelete}
                                onClick={() =>
                                  dispatch(removeFromCart(item.product))
                                }
                              ></img>
                              <NavLink
                                to={`/${item.product.category}/${item.product.itemId}`}
                              >
                                <img
                                  className={styles.productImg}
                                  alt="product"
                                  src={item.product.image}
                                ></img>
                              </NavLink>
                              <NavLink
                                to={`/${item.product.category}/${item.product.itemId}`}
                              >
                                <p
                                  className={
                                    theme === Theme.light
                                      ? styles.productName
                                      : styles.productNameDark
                                  }
                                >
                                  {item.product.name}
                                </p>
                              </NavLink>
                            </div>
                            <div className={styles.counterAndPriceContainer}>
                              <div className={styles.productCounterContainer}>
                                <button
                                  disabled={item.counter === 1}
                                  className={
                                    theme === Theme.light
                                      ? styles.counterButton
                                      : styles.counterButtonDark
                                  }
                                  onClick={() =>
                                    handleCountMinus(item.product.id)
                                  }
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
                                      fill={
                                        theme === Theme.light
                                          ? '#0F0F11'
                                          : '#E2E6E9'
                                      }
                                    />
                                  </svg>
                                </button>
                                <span
                                  className={
                                    theme === Theme.light
                                      ? styles.counterItems
                                      : styles.counterItemsDark
                                  }
                                >
                                  {item.counter}
                                </span>
                                <button
                                  className={
                                    theme === Theme.light
                                      ? styles.counterButton
                                      : styles.counterButtonDark
                                  }
                                  onClick={() =>
                                    handleCountPlus(item.product.id)
                                  }
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
                                      fill={
                                        theme === Theme.light
                                          ? '#0F0F11'
                                          : '#E2E6E9'
                                      }
                                    />
                                  </svg>
                                </button>
                              </div>

                              <span
                                className={
                                  theme === Theme.light
                                    ? styles.productPrice
                                    : styles.productPriceDark
                                }
                              >{`$${item.product.price * item.counter}`}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {cartProduct.length > 0 && (
                    <div
                      className={
                        theme === Theme.light
                          ? styles.productPrices
                          : styles.productPricesDark
                      }
                    >
                      <span
                        className={
                          theme === Theme.light
                            ? styles.allPrice
                            : styles.allPriceDark
                        }
                      >
                        {`$${cartProduct.reduce((totalPrice, item) => totalPrice + item.product.price * item.counter, 0)}`}
                      </span>
                      <p className={styles.totalItems}>
                        Total for{' '}
                        {cartProduct.reduce(
                          (totalItems, item) => totalItems + item.counter,
                          0,
                        )}{' '}
                        items
                      </p>
                      <span className={styles.line}></span>
                      <button
                        className={
                          theme === Theme.light
                            ? styles.buttonCheckout
                            : styles.buttonCheckoutDark
                        }
                      >
                        Checkout
                      </button>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};
