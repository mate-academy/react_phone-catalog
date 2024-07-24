import classNames from 'classnames';
import { Product } from '../../shared/components/types/Product';
import './CartItem.scss';
import { useContext, useState } from 'react';
import { DispatchContext, StateContext } from '../../utils/GlobalStateProvider';
import { Link } from 'react-router-dom';

import Loader from 'react-spinners/PuffLoader';

type Props = {
  item: Product;
  countItems: { id: number; count: number }[];
  setCountItems: (value: { id: number; count: number }[]) => void;
};

export const CartItem: React.FC<Props> = ({
  item,
  countItems,
  setCountItems,
}) => {
  const { cartItems, isDarkThemeOn } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [isLoading, setIsLoading] = useState(false);
  const currentItem = countItems.find(e => e.id === item.id) || countItems[0];

  const handleRemoveItem = () => {
    setIsLoading(true);
    const filteredItems = cartItems.filter(tempItem => tempItem.id !== item.id);

    setTimeout(() => {
      dispatch({ type: 'setCartItems', payload: filteredItems });

      setIsLoading(false);
    }, 300);
  };

  const handleChangeCount = (newCount: number) => {
    if (newCount > 0) {
      const newCountItems = countItems.map(tempItem => {
        if (tempItem.id !== currentItem.id) {
          return tempItem;
        }

        return { ...tempItem, count: newCount };
      });

      setCountItems(newCountItems);
    }
  };

  return (
    <div
      className={classNames('cart-item cart-item--loading', {
        'cart-item-light': !isDarkThemeOn,
      })}
    >
      <div className="cart-item__top">
        <button className="cart-item__cancel" onClick={handleRemoveItem}>
          {isDarkThemeOn ? (
            <img src="img/icons/plus.svg" alt="cancel" />
          ) : (
            <img src="img/icons/plus-dark.svg" alt="cancel" />
          )}
        </button>
        <div className="cart-item__img-wrapper">
          <Link to={`/${item.category}/${item.itemId}`}>
            <img
              src={item.image}
              alt="product img"
              className="cart-item__img"
            />
          </Link>
        </div>
        <Link to={`/${item.category}/${item.itemId}`}>
          <p className="cart-item__name">{item.name}</p>
        </Link>
      </div>
      <div className="cart-item__bottom">
        <div className="cart-item__btns">
          <button
            className="cart-item__btn"
            onClick={() => handleChangeCount(currentItem.count - 1)}
          >
            -
          </button>
          <p>{currentItem.count}</p>
          <button
            onClick={() => handleChangeCount(currentItem.count + 1)}
            className={classNames('cart-item__btn', 'cart-item__btn--active')}
          >
            +
          </button>
        </div>
        <h3 className="cart-item__price">${item.price}</h3>
      </div>

      {isLoading && (
        <div className="cart-item__loader">
          <Loader size={70} />
        </div>
      )}
    </div>
  );
};
