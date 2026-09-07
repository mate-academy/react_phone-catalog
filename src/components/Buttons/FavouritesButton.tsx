import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ProductContext } from '../Contexts/ProductsContext';
import { FavouritesContext } from '../Contexts/FavouritesContext';

type Props = {
  itemId: string;
};

export const FavouritesButton: React.FC<Props> = ({ itemId }) => {
  const { favProducts, addFavouriteProduct } = useContext(FavouritesContext);
  const { checkProduct } = useContext(ProductContext);

  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(checkProduct(itemId, favProducts));
  }, [itemId, favProducts]);

  return (
    <button
      className="button favBtn"
      onClick={() => addFavouriteProduct(itemId)}
    >
      <span
        className={classNames('icon favourites', {
          'fav-active': active,
        })}
      />
    </button>
  );
};
