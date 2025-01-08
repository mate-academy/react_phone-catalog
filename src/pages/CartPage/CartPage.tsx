import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './CartPage.scss';
import Cross from '../../images/cartImages/Cross.svg';
import Cross_dark from '../../images/cartImages/Cross_dark.svg';
import Minus from '../../images/cartImages/Minus.svg';
import Minus_dark from '../../images/cartImages/Minus_dark.svg';
import Plus from '../../images/cartImages/Plus.svg';
import Plus_dark from '../../images/cartImages/Plus_dark.svg';
import { actions, CardProduct, removeProduct } from '../../features/cartSlice';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { ThemeVars } from '../../types/themeTypes';
import { BackButtonImg } from '../../components/BackButtonImg/backButtonImg';
import { CartWindow } from '../../components/CartWindow/CartWindow';
import { Product } from '../../types/product';
import { fetchAllProducts } from '../../features/allProductsSlice';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const { cartProducts, loading } = useAppSelector(state => state.cartItems);

  const [totalPrice, setTotalPrice] = useState<number>();

  function useProductsInfo(ids: string[]): {
    loading: boolean;
    products: Partial<Record<string, Product>>;
  } {
    const products = useAppSelector(state => state.allProducts.products);

    useEffect(() => {
      if (!products.length) {
        dispatch(fetchAllProducts());
      }
    }, [products]);

    const myProducts = ids.reduce(
      (acc, id) => {
        const productFound = products.find(prod => prod.id === id);

        if (productFound) {
          acc[id] = productFound;
        }

        return acc;
      },
      {} as Record<string, Product>,
    );

    return { loading: !products.length, products: myProducts };
  }

  const loadedProducts = useProductsInfo(
    cartProducts.map(item => item.productId),
  );

  const countTotal = (elements: CardProduct[]) => {
    let totalPrice = 0;

    elements.map(el => {
      const product = loadedProducts.products[el.productId];

      if (product) {
        totalPrice += product.price * el.count;
      }
    });

    return totalPrice;
  };

  useEffect(() => {
    setTotalPrice(countTotal(cartProducts));
  }, [cartProducts]);

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    prod: Product,
  ) => {
    event.preventDefault();

    dispatch(removeProduct(prod.id));
  };

  const handlePlus = (productId: string) => {
    dispatch(actions.addProduct(productId));
  };

  const handleMinus = (productId: string) => {
    dispatch(actions.removeLastProduct(productId));
  };

  const [checkoutClicked, setButtonClicked] = useState(false);

  function goBack() {
    window.history.back();
  }

  const theme = useAppSelector(state => state.themeSwitcher.theme);

  const buttonName = `cartProduct__buttonBack__name theme-${theme}`;
  const buttonClick = `cartProduct__buttonBack__click theme-${theme}`;
  const cartHeader = `cartProduct__header theme-${theme}`;
  const itemCard = `cartProduct__itemCard theme-${theme}`;
  const buttonCross = `cartProduct__buttonCross theme-${theme}`;
  const cartName = `cartProduct__name theme-${theme}`;
  const cartPrice = `cartProduct__price theme-${theme}`;
  const prodQuantity = `cartProduct__count__quantity theme-${theme}`;
  const productCount = `cartProduct__count__box theme-${theme}`;
  const cartCheckout = `cartProduct__checkout theme-${theme}`;
  const cartPay = `cartProduct__toPay  theme-${theme}`;
  const totalItemsPay = `cartProduct__totalItems theme-${theme}`;
  const cartButton = `cartProduct__payButton theme-${theme}`;

  return (
    <>
      <div className="cart__wrap">
        <div className="cartProduct">
          <div className="cartProduct__constrain">
            <div className="cartProduct__breadcrumbs">
              <NavLink to="/" className="cartProduct__home-link">
                <div className="details__buttonBack">
                  <button onClick={goBack} className={buttonClick}>
                    <BackButtonImg classname="details__buttonBack__img" />
                    <div className={buttonName}>Back</div>
                  </button>
                </div>
              </NavLink>
            </div>
            <h1 className={cartHeader}>Cart</h1>
            {!loadedProducts.loading ? (
              <div className="cartProduct__box">
                <div className="cartProduct__container">
                  {loading && <Loader />}
                  {cartProducts.map(({ productId, count }, index) => {
                    const product = loadedProducts.products[productId];

                    if (!product) {
                      return null;
                    }

                    return (
                      <div key={index} className={itemCard}>
                        <div className="cartProduct__containerItem">
                          <div className="cartProduct__item">
                            <NavLink
                              to={`/${product.category}/${product.itemId}`}
                              className="cartProduct__navLink"
                            >
                              <button
                                className={buttonCross}
                                onClick={event => handleDelete(event, product)}
                              >
                                <img
                                  src={ThemeVars.DARK ? Cross_dark : Cross}
                                  alt="Cross"
                                  className="cartProduct__cross"
                                />
                              </button>
                              <div className="cartProduct__image">
                                <img
                                  src={`https://hanna-balabukha.github.io/react_phone-catalog/${product.image}`}
                                  alt={product.category}
                                  className="cartProduct__image__link"
                                />
                              </div>
                              <div className={cartName}>{product.name}</div>
                            </NavLink>
                            <div className="cartProduct__countPrice">
                              <div className="cartProduct__count">
                                <button
                                  disabled={count === 1}
                                  className={productCount}
                                  onClick={() => handleMinus(productId)}
                                >
                                  <img
                                    src={
                                      theme === ThemeVars.DARK
                                        ? Minus_dark
                                        : Minus
                                    }
                                    alt="Minus"
                                    className="cartProduct__count__num"
                                  />
                                </button>
                                <div className={prodQuantity}>{count}</div>
                                <button
                                  className={productCount}
                                  onClick={() => handlePlus(productId)}
                                >
                                  <img
                                    src={
                                      theme === ThemeVars.DARK
                                        ? Plus_dark
                                        : Plus
                                    }
                                    alt="Plus"
                                    className="cartProduct__count__num"
                                  />
                                </button>
                              </div>
                              <div className={cartPrice}>{product.price}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className={cartCheckout}>
                  <div className="cartProduct__checkBlock">
                    <div className={cartPay}>{`$${totalPrice}`}</div>
                    <div className={totalItemsPay}>Total for three items</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setButtonClicked(true);
                    }}
                    className={cartButton}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            ) : (
              <div className="cartProduct__empty">Your cart is empty</div>
            )}
          </div>
        </div>
        {checkoutClicked && (
          <div className="cartProduct__modal">
            <CartWindow setButtonClicked={setButtonClicked} />
          </div>
        )}
      </div>
    </>
  );
};
