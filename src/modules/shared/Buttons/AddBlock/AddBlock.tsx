import React, { useContext } from 'react';
import { IconFavourites } from '../../IconsSVG';
import { ShoppingCartContext } from '../../../../store/ShoppingCartContext';

type Props = {
  itemId: string;
};

export const AddBlock: React.FC<Props> = React.memo(({ itemId }) => {
  const { setShoppingList, shoppingList } = useContext(ShoppingCartContext);

  const handleAddToCart = () => {
    setShoppingList([...shoppingList, itemId]);
  };

  return (
    <div className="add-block">
      <button
        type="button"
        className="add-block__add-to-cart"
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
      <div className="add-block__add-to-fav">
        <IconFavourites />
      </div>
    </div>
  );
});
