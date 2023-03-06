import classNames from 'classnames';
import { useCallback, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  addQuantity,
  ProductForCart,
  removeItem,
  subQuantity,
} from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';
import { SearchContext } from '../../variables/contexts';
import './Cart.scss';

export const Cart = () => {
  const { setSearchVisible } = useContext(SearchContext);
  const [notifyActive, setNotifyActive] = useState<boolean>(false);

  setSearchVisible(false);

  const items = useSelector((state: RootState) => state.cart.items);
  const totalSum = items
    .reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = items
    .reduce((acc, item) => acc + item.quantity, 0);

  const dispatch = useDispatch();
  const location = useLocation();

  const handleClick = useCallback((
    e: React.MouseEvent<HTMLButtonElement>,
    type: string,
    selectedItem: ProductForCart,
  ) => {
    e.stopPropagation();

    switch (type) {
      case 'delete':
        dispatch(removeItem(selectedItem.id));
        break;

      case 'subtract':
        dispatch(subQuantity(selectedItem));
        break;

      case 'add':
        dispatch(addQuantity(selectedItem));
        break;

      default:
        break;
    }
  }, [items]);

  return (
    <main className="main page__main">
      <div className="container">
        <div className="cart__root-box">
          <Link to="/">
            <img
              src="img/Icons/home.svg"
              alt="toHome"
              className="cart__home-img"
            />
          </Link>
          <img
            src="img/Icons/arr-right-hover.svg"
            alt="arr-right"
            className="cart__arr-right"
          />
          <Link to="../" className="cart__root-name">Back</Link>
        </div>
        <h1 className="cart__title">Cart</h1>
        {items.length ? (
          <div className="cart__grid">
            <div className="cart__cataloge">
              {items.map(item => {
                const {
                  name,
                  price,
                  image,
                  id,
                  quantity,
                  itemId,
                  category,
                } = item;

                const IsQuantityEven = quantity === 1;
                const IsQuantityMore = quantity >= 99;

                return (
                  <div className="cart__item" key={id}>
                    <div className="cart__left-box">
                      <button
                        className="cart__button-cross"
                        type="button"
                        onClick={(e) => handleClick(e, 'delete', item)}
                      >
                        <img
                          src="img/Icons/cross.svg"
                          alt="delete from cart"
                          className="cart__button-cross--img"
                        />
                      </button>
                      <div className="cart__chosen-item">
                        <Link
                          to={{
                            pathname: `/${category}/${itemId}`,
                            search: location.search,
                          }}
                        >
                          <img
                            src={image}
                            className="cart__chosen-img"
                            alt="chosen-item"
                          />
                        </Link>
                      </div>
                      <Link
                        to={{
                          pathname: `/${category}/${itemId}`,
                          search: location.search,
                        }}
                        className="cart__choosen-item-title"
                      >
                        {name}
                      </Link>
                    </div>
                    <div className="cart__right-box">
                      <div className="cart__quantity-box">
                        <button
                          className={classNames(
                            'cart__button-cataloge',
                            {
                              'cart__button-disabled': IsQuantityEven,
                            },
                          )}
                          type="button"
                          onClick={(e) => handleClick(e, 'subtract', item)}
                        >
                          <img
                            src="img/Icons/minus.svg"
                            alt="remove-one"
                            className="cart__button-cataloge--img"
                          />
                        </button>
                        <p className="cart__count">
                          {quantity}
                        </p>
                        <button
                          className={classNames(
                            'cart__button-cataloge',
                            {
                              'cart__button-disabled': IsQuantityMore,
                            },
                          )}
                          type="button"
                          onClick={(e) => handleClick(e, 'add', item)}
                        >
                          <img src="img/Icons/Plus.svg" alt="add-one" />
                        </button>
                      </div>
                      <p className="cart__price-cataloge">
                        {`$${price}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="cart__checkout">
              <h1 className="cart__priceTotal">{`$${totalSum}`}</h1>
              <p className="cart__totalLength">
                {`Total for ${totalItems} items`}
              </p>
              <button
                className="cart__checkout-button"
                type="button"
                onClick={() => setNotifyActive(true)}
              >
                Checkout
              </button>
              {notifyActive && (
                <div className="cart__notification">
                  <p className="cart__notification-text">
                    this feature is not implemented yet
                    <hr />
                  </p>
                  <button
                    className="cart__checkout-button"
                    type="button"
                    onClick={() => {
                      setNotifyActive(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="cart__wrap-empty">
            <p
              className="cart__text-empty"
            >
              Your cart is empty,
              come back here when you add some items
            </p>
            <div className="cart__img-empty" />
          </div>
        )}
      </div>
    </main>
  );
};
