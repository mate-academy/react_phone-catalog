import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ItemsContext } from '../../helpers/CartContext';
import './CartPage.scss';

type Props = {};

export const CartPage: React.FC<Props> = () => {
  const {
    items,
    increaseCount,
    decreaseCount,
    removeFromCart,
  } = useContext(ItemsContext);

  const handleSubmit = ((itemId: string) => {
    return removeFromCart(itemId);
  });

  const handleCounterIncrease = ((itemId: string) => {
    return increaseCount(itemId);
  });

  const handleCounterDecrease = ((itemId: string) => {
    return decreaseCount(itemId);
  });

  const totalPrice = items
    .reduce((acc, item) => acc + item.price * (item.count ?? 0), 0);

  const totalItemsCount = items
    .reduce((acc, item) => acc + (item.count ?? 0), 0);

  return (
    <div className="container cart">
      <Link to=".." className="back">
        <img
          src="/icons/buttons-icons/ChevronDef(Left).svg"
          alt="right"
          className="back__img"
        />
        <p className="back__text">Back</p>
      </Link>
      <h1 className="title">Cart</h1>
      <div className="cart__content">
        <div className="cart-list">
          {items.map(item => (
            <div className="cart-item" key={item.id}>
              <button
                type="button"
                onClick={() => handleSubmit(item.id)}
                className="cart-item__button-close"
              >
                <img src="icons/close.svg" alt="close" />
              </button>
              <div className="cart-item__img">
                <img className="cart-item__photo" src={`/_new/${item.image}`} alt={item.name} />
              </div>
              <div className="cart-item__name">{item.name}</div>
              <div className="cart-item__control">
                {item.count === 1 ? (
                  <button
                    className="cart-item__button-control"
                    type="button"
                  >
                    <img src="icons/Minus-dis.svg" alt="close" />
                  </button>
                ) : (
                  <button
                    className="cart-item__button-control
                      cart-item__button-control--active"
                    type="button"
                    onClick={() => handleCounterDecrease(item.id)}
                  >
                    <img src="icons/Minus.svg" alt="close" />
                  </button>
                )}
                <span className="cart-item__count">{item.count}</span>
                <button
                  className="cart-item__button-control
                    cart-item__button-control--active"
                  type="button"
                  onClick={() => handleCounterIncrease(item.id)}
                >
                  <img src="icons/Plus.svg" alt="close" />
                </button>
              </div>
              {item.count && (
                <div className="cart-item__price">{`$${item.count * item.price}`}</div>
              )}
            </div>
          ))}
        </div>
        <div className="cart-quantity">
          <span className="cart-quantity__total-price">{`$${totalPrice}`}</span>
          <p className="cart-quantity__total-items">{`Total for ${totalItemsCount} items`}</p>
          <hr className="cart-quantity__hr" />
          <button
            type="button"
            className="cart-quantity__checkout"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
