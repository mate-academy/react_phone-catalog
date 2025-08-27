import { useContext } from 'react';
import { LocalStorageContext } from '../../context/LocaleStorageContext';
import cn from 'classnames';

import './ActionButtons.scss';

interface Props {
  id: string;
  price: number;
}

export const ActionButtons: React.FC<Props> = ({ id, price }) => {
  const { favs, toggleFavorite, carts, addToCart, removeFromCart } =
    useContext(LocalStorageContext);

  const handleShow = () => {
    toggleFavorite(id);
  };

  const find = carts.find(cart => cart.id === id);

  const handleAddCart = () => {
    if (find) {
      removeFromCart(id);
    } else {
      addToCart(id, 1, price);
    }
  };

  return (
    <div className="action-buttons">
      <button
        onClick={handleAddCart}
        className={cn('action-buttons__add', {
          'action-buttons__add--selected': find,
        })}
      >
        Add to cart
      </button>
      <button
        onClick={handleShow}
        className={cn('action-buttons__favourites', {
          'action-buttons__favourites--added': favs.includes(id),
        })}
      ></button>
    </div>
  );
};
