import './Actions.scss';

import classNames from 'classnames';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { Product } from '../../types/Product';
import { FavouritesContext } from '../../contexts/FavouritesContext';

type Props = {
  product: Product | undefined,
};

export const Actions: React.FC<Props> = ({ product }) => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { favourites, setFavourites } = useContext(FavouritesContext);
  const isItemInCart = cartItems
    .findIndex(item => item.itemId === product?.itemId) > -1;
  const isItemInFavourites = favourites
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

    if (!product) {
      return;
    }

    const newFavourites = !isItemInFavourites
      ? [...favourites, product]
      : favourites.filter(item => item.itemId !== product.itemId);

    setFavourites(newFavourites);
    localStorage.setItem('favourites', JSON.stringify(newFavourites));
  };

  return (
    <div className="Actions">
      <button
        type="button"
        className={classNames('Actions__add-to-cart', 'button', {
          'button--added-to-cart': isItemInCart,
        })}
        onClick={handleAddToCart}
        disabled={isItemInCart}
      >
        {`${isItemInCart ? 'Added' : 'Add'} to cart`}
      </button>

      <button
        type="button"
        aria-label="Add to favourites"
        className={classNames('Actions__add-to-favourites', {
          'Actions__add-to-favourites--added': isItemInFavourites,
        })}
        onClick={handleAddToFavourites}
      />
    </div>
  );
};
