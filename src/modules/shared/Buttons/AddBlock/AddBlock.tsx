import React, { useContext } from 'react';
import cn from 'classnames';
import { IconFavourites } from '../../IconsSVG';
import { ShoppingCartContext } from '../../../../store/ShoppingCartContext';
import { CartItem } from '../../../../types/CartItem';

type Props = {
  cartItem: CartItem;
};

export const AddBlock: React.FC<Props> = React.memo(({ cartItem }) => {
  const { setShoppingList, shoppingList } = useContext(ShoppingCartContext);

  const added = shoppingList.some(item => item.itemId === cartItem.itemId);

  const handleAddToCart = () => {
    if (!added) {
      setShoppingList([...shoppingList, cartItem]);
    }
  };

  return (
    <div className="add-block">
      <button
        type="button"
        className={cn('add-block__add-to-cart', { added })}
        onClick={handleAddToCart}
      >
        {added ? 'Added to cart' : 'Add to cart'}
      </button>
      <div className="add-block__add-to-fav">
        <IconFavourites />
      </div>
    </div>
  );
});
