import { useContext, useState } from 'react';
import classNames from 'classnames';
import { FavouritesContext } from '../../context/FavsContext';
import { useProducts } from '../../context/ProductContext';

type Props = {
  prodId: string;
};

export const AddToFav: React.FC<Props> = ({ prodId }) => {
  const { toggleFav, checkFav } = useContext(FavouritesContext);
  const [isFavourite, setIsFavourite] = useState(checkFav(prodId));
  const { products } = useProducts();

  const handleAddToFavs = () => {
    const product = products.find(p => p.itemId === prodId);

    if (product) {
      const isFav = toggleFav({
        id: prodId,
        product,
      });

      setIsFavourite(isFav);
    }
  };

  return (
    <button
      type="button"
      data-cy="addToFavorite"
      className={classNames('addFav', {
        'addFav--selected': isFavourite,
      })}
      onClick={handleAddToFavs}
    >
      {isFavourite ? (
        <div className="addFav--heart_selected" />
      ) : (
        <div className="addFav--heart" />
      )}
    </button>
  );
};
