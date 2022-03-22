import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../components/CartItem';
import { NoResult } from '../components/NoResult';
import { Phone } from '../components/ProductCard';

type Props = {
  gadgetsList: Phone[],
  handleCart: (id: string) => void,
  handleFavorite: (id: string) => void,
  favorite: string[],
  cart: string[],
};

export const Cart: React.FC<Props> = ({
  handleCart,
  gadgetsList,
  cart,
}) => {
  const [sum, setSum] = useState(0);
  const [message, setMessage] = useState(false);
  const gadgetsInCart = gadgetsList.filter(gadget => cart.includes(gadget.id));
  const navigate = useNavigate();

  const summingUp = () => {
    let count = 0;

    gadgetsList.forEach((item: Phone) => {
      if (cart.includes(item.id)) {
        const totalPrice: number = item.discount !== 0
          ? Math.floor(item.price - (item.price * (item.discount / 100)))
          : item.price;

        count += totalPrice;
      }
    });

    return count;
  };

  useEffect(() => {
    const totalCount = summingUp();

    setSum(totalCount);
  }, []);

  const changeQuantity = (type: string, price: number) => {
    if (type === '-') {
      setSum(prev => prev - price);
    } else {
      setSum(prev => prev + price);
    }
  };

  return (
    <>
      {
        cart.length > 0 ? (
          <>
            <div className="product-page__link-container">
              <div className="product-page__arrow product-details__arrow--back" />
              <button
                type="button"
                className="product-details__title"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Back
              </button>
            </div>
            <h2 className="section__title cart__title">Cart</h2>

            <div className="cart">
              <div className="cart__cells">
                <ul>
                  {gadgetsInCart.map(item => (
                    <li key={item.id}>
                      <CartItem
                        item={item}
                        changeQuantity={changeQuantity}
                        handleCart={handleCart}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="cart__total-container">
                <div className="cart-item__price cart-item__price-total">
                  {`$${sum}`}
                </div>
                <div className="cart__total-text">{`Total for ${cart.length} items`}</div>
                <div className="cart__total-line" />
                <button
                  className="cart__total-checkout"
                  type="button"
                  onClick={() => {
                    setMessage(true);
                    setTimeout(() => {
                      setMessage(false);
                    }, 3000);
                  }}
                >
                  Checkout
                </button>
                <div
                  className={classNames('message', { 'message--active': message })}
                >
                  We are still working at this functionality...
                </div>
              </div>
            </div>
          </>
        ) : (
          <NoResult />
        )
      }
    </>
  );
};
