/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import cn from 'classnames';
import { IconAddedToFavourites, IconFavourites } from '../../IconsSVG';
import { ShoppingCartContext } from '../../../../store/ShoppingCartContext';
import { FavoutitesContext } from '../../../../store/FavouritesContext';
import { getNewCartItemId } from '../../../../services/getNewCartItemId';
import { Product } from '../../../../types/Product';
import { FavItem } from '../../../../types/FavItem';
import { CartItem } from '../../../../types/CartItem';

type Props = {
  product: Product;
  discount: boolean;
};

export const AddBlock: React.FC<Props> = React.memo(({ product, discount }) => {
  const { setShoppingList, shoppingList } = useContext(ShoppingCartContext);
  const { setFavouritesList, favouritesList } = useContext(FavoutitesContext);

  const favItem: FavItem = { ...product, discount };
  const cartItem: CartItem = {
    id: product.id,
    itemId: product.itemId,
    name: product.name,
    currentPrice: discount ? product.price : product.fullPrice,
    image: product.image,
  };

  const addedToCart = shoppingList.some(item => item.itemId === product.itemId);

  const addedToFavourites = favouritesList.some(
    item => item.itemId === product.itemId,
  );

  const handleShoppingList = () => {
    if (!addedToCart) {
      const newCartItem = {
        ...cartItem,
        id: getNewCartItemId(shoppingList),
      };

      setShoppingList([...shoppingList, newCartItem]);

      return;
    }

    if (addedToCart && shoppingList.length > 1) {
      const updatedShoppingList = shoppingList.filter(
        device => device.itemId !== cartItem.itemId,
      );

      setShoppingList(updatedShoppingList);
    } else {
      setShoppingList([]);
      localStorage.removeItem('cartItem');
    }
  };

  const handleFavourites = () => {
    if (!addedToFavourites) {
      setFavouritesList([...favouritesList, favItem]);

      return;
    }

    if (addedToFavourites && favouritesList.length > 1) {
      const updatedFavouritesList = favouritesList.filter(
        fav => fav.itemId !== favItem.itemId,
      );

      setFavouritesList(updatedFavouritesList);
    } else {
      setFavouritesList([]);
      localStorage.removeItem('favItem');
    }
  };

  return (
    <div className="add-block">
      <button
        type="button"
        className={cn('add-block__add-to-cart', { added: addedToCart })}
        onClick={handleShoppingList}
      >
        {addedToCart ? 'Added to cart' : 'Add to cart'}
      </button>

      <button
        type="button"
        className={cn('add-block__fav', { added: addedToFavourites })}
        onClick={handleFavourites}
      >
        {addedToFavourites ? <IconAddedToFavourites /> : <IconFavourites />}
      </button>
    </div>
  );
});
