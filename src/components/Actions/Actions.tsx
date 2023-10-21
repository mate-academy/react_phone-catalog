import './Actions.scss';

import classNames from 'classnames';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { Product } from '../../types/Product';

type Props = {
  product: Product | undefined,
};

export const Actions: React.FC<Props> = ({ product }) => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const isItemInCart = cartItems
    .findIndex(item => item.itemId === product?.itemId) > -1;

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();

    if (!product) {
      return;
    }

    const { itemId } = product;
    const newCartItems = [...cartItems, { itemId, quantity: 1, product }];

    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const handleAddToFavourites = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <div className="Actions">
      <button
        type="button"
        className={classNames('Actions__add-to-cart', 'button', {
          'Actions__add-to-cart--added': isItemInCart,
        })}
        onClick={handleAddToCart}
        disabled={isItemInCart}
      >
        {`${isItemInCart ? 'Added' : 'Add'} to cart`}
      </button>

      <button
        type="button"
        aria-label="Add to favourites"
        className="Actions__add-to-favourites"
        onClick={handleAddToFavourites}
      />
    </div>
  );
};
