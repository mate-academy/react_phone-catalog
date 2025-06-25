import { togglePhoneInStorage } from '../../../utils/togglePhone';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../../types/Product';
import './Cart.scss';

const getKey = (p: Product) => `${p.id}_${p.color}_${p.capacity}`;

export const Cart = () => {
  const navigate = useNavigate();
  const [showProducts, setShowProducts] = useState<Product[]>([]);
  const [cartInfo, setCartInfo] = useState<Record<string, number[]>>({});

  const totalPriceQuantity = useMemo(() => {
    let totalQuantity = 0;
    let totalPrice = 0;

    for (const key in cartInfo) {
      const [quantity, price] = cartInfo[key];

      totalQuantity += quantity;
      totalPrice += price * quantity;
    }

    return { totalQuantity, totalPrice };
  }, [cartInfo]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');

    setShowProducts(stored);

    const initialQuantities: Record<string, number[]> = {};

    stored.forEach((p: Product) => {
      const key = getKey(p);

      initialQuantities[key] = [1, p.priceRegular];
    });

    setCartInfo(initialQuantities);
  }, []);

  return (
    <>
      {showProducts.length === 0 ? (
        <div className="cart-empty">
          <img
            className="cart-empty__img"
            src="/img/empty-cart.png"
            alt="Cart is empty"
          />
        </div>
      ) : (
        <section className="cart">
          <div className="cart-content">
            <div className="cart-top">
              <div className="cart-top__back">
                <div className="cart-top__back-arrow"></div>
                <button
                  onClick={() => navigate(-1)}
                  className="cart-top__back-button"
                >
                  Back
                </button>
              </div>
              <h1 className="cart-top__h1">Cart</h1>
            </div>

            <ul className="list">
              {showProducts.map(el => {
                const key = getKey(el);
                const quantityProducts = cartInfo[key];

                if (!quantityProducts) {
                  return null;
                }

                return (
                  <li key={key} className="list__element">
                    <div className="list__element-top">
                      <div
                        className="list__element-top-cross"
                        onClick={() => {
                          const updated = togglePhoneInStorage(el, 'cart');

                          setShowProducts(updated);

                          setCartInfo(prev => {
                            const newState = { ...prev };

                            delete newState[key];

                            return newState;
                          });
                        }}
                      ></div>

                      <Link state={{ from: 'Cart' }} to={`/product/${el.name}`}>
                        <img
                          src={`/${el.images[0]}`}
                          className="list__element-top-img"
                        />
                      </Link>

                      <p className="list__element-top-name">{el.name}</p>
                    </div>

                    <div className="list__element-down">
                      <div className="list__element-down-buttons">
                        <button
                          className="list__element-down-remove"
                          onClick={() => {
                            setCartInfo(prev => {
                              const [quantity, price] = prev[key];

                              return {
                                ...prev,
                                [key]: [Math.max(1, quantity - 1), price],
                              };
                            });
                          }}
                        >
                          -
                        </button>

                        <div className="list__element-down-quantity">
                          {quantityProducts[0]}
                        </div>

                        <button
                          className="list__element-down-add"
                          onClick={() => {
                            setCartInfo(prev => {
                              const [quantity, price] = prev[key];

                              return {
                                ...prev,
                                [key]: [Math.min(100, quantity + 1), price],
                              };
                            });
                          }}
                        >
                          +
                        </button>
                      </div>

                      <div className="list__element-down-price">
                        ${quantityProducts[1] * quantityProducts[0]}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="cart-bottom">
              <p className="cart-bottom__total-price">
                ${totalPriceQuantity.totalPrice}
              </p>

              <p className="cart-bottom__total-items">
                Total for {totalPriceQuantity.totalQuantity} items.
              </p>

              <button className="cart-bottom__button">Checkout</button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
