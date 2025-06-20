import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../../types/Product';
import './Cart.scss';
import { togglePhoneInStorage } from '../../../utils/togglePhone';

const BASE_URL = '../../../../public/';

export const Cart = () => {
  const navigate = useNavigate();
  const [showProducts, setShowProducts] = useState<Product[]>([]);
  const [cartInfo, setCartInfo] = useState<Record<string, number[]>>({}); // { [productId]: [quantity, price] }

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
      initialQuantities[p.id] = [1, p.priceRegular];
    });

    setCartInfo(initialQuantities);
  }, []);

  return (
    <section className="cart">
      <div className="cart-content">
        <div className="cart-top">
          <div className="cart-top__back">
            <div className="cart-top__back-arrow"></div>

            <button
              onClick={() => {
                navigate(-1);
              }}
              className="cart-top__back-button"
            >
              Back
            </button>
          </div>

          <h1 className="cart-top__h1">Cart</h1>
        </div>

        <ul className="list">
          {showProducts.map(el => {
            const quantityProducts = cartInfo[el.id]?.[0] ?? 0;

            return (
              <li key={el.id} className="list__element">
                <div className="list__element-top">
                  <div
                    className="list__element-top-cross"
                    onClick={() => {
                      const updated = togglePhoneInStorage(el, 'cart');

                      setShowProducts(updated);

                      setCartInfo(prev => {
                        const cartBox = { ...prev };

                        delete cartBox[el.id];

                        return cartBox;
                      });
                    }}
                  ></div>

                  <Link to={`/product/${el.name}`}>
                    <img
                      src={`${BASE_URL}${el.images[0]}`}
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
                          const [quantity, price] = prev[el.id];

                          return {
                            ...prev,
                            [el.id]: [Math.max(1, (quantity || 1) - 1), price],
                          };
                        });
                      }}
                    >
                      -
                    </button>

                    <div className="list__element-down-quantity">
                      {quantityProducts}
                    </div>

                    <button
                      className="list__element-down-add"
                      onClick={() => {
                        setCartInfo(prev => {
                          const [quantity, price] = prev[el.id];

                          return {
                            ...prev,
                            [el.id]: [Math.min(100, quantity + 1), price],
                          };
                        });
                      }}
                    >
                      +
                    </button>
                  </div>

                  <div className="list__element-down-total-price">
                    ${quantityProducts}
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
  );
};
