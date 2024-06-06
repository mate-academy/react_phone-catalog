/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import {
  IconAddedToFavourites,
  IconClose,
  IconFavourites,
} from '../../IconsSVG';
import { ShoppingCartContext } from '../../../../store/ShoppingCartContext';
import { CartItem } from '../../../../types/CartItem';
import { FavoutitesContext } from '../../../../store/FavouritesContext';
import { FavItem } from '../../../../types/FavItem';

type Props = {
  cartItem: CartItem;
};

export const AddBlock: React.FC<Props> = React.memo(({ cartItem }) => {
  const { setShoppingList, shoppingList } = useContext(ShoppingCartContext);
  const { setFavouritesList, favouritesList, setProducts, products } =
    useContext(FavoutitesContext);
  const { pathname } = useLocation();

  const isFavourites = pathname.includes('favourites');

  const { itemId, discount } = cartItem;
  const favItem: FavItem = { itemId, discount };

  const addedToCart = shoppingList.some(item => item.itemId === itemId);

  const addedToFavourites = favouritesList.some(item => item.itemId === itemId);

  const handleAddToCart = () => {
    if (!addedToCart) {
      setShoppingList([...shoppingList, cartItem]);
    }
  };

  const handleAddToFavourites = () => {
    if (!addedToFavourites) {
      setFavouritesList([...favouritesList, favItem]);
    }
  };

  const removeFromFavoutites = () => {
    const updatedFavouritesList = favouritesList.filter(
      fav => fav.itemId !== cartItem.itemId,
    );

    const updatedProducts = products.filter(
      product => product.itemId !== cartItem.itemId,
    );

    setProducts(updatedProducts);
    setFavouritesList(updatedFavouritesList);
  };

  return (
    <div className="add-block">
      <button
        type="button"
        className={cn('add-block__add-to-cart', { added: addedToCart })}
        onClick={handleAddToCart}
      >
        {addedToCart ? 'Added to cart' : 'Add to cart'}
      </button>

      {!isFavourites && (
        <button
          type="button"
          className={cn('add-block__fav', { added: addedToFavourites })}
          onClick={handleAddToFavourites}
        >
          {addedToFavourites ? <IconAddedToFavourites /> : <IconFavourites />}
        </button>
      )}

      {isFavourites && (
        <button
          type="button"
          className="add-block__remove"
          onClick={removeFromFavoutites}
        >
          <IconClose />
        </button>
      )}
    </div>
  );
});
