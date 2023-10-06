import cn from 'classnames';
import { useMemo, useContext } from 'react';
import './FavButton.scss';

import { FavoritesContext } from '../../contexts/FavoritesContext';
import { Product } from '../../types/Product';

type Props = {
  product: Product;
};

const FavButton: React.FC<Props> = ({ product: { name }, product }) => {
  const {
    favorites,
    setFavorite,
    delFavorite,
  } = useContext(FavoritesContext);
  const isFavorite = useMemo(() => {
    return favorites.find(currCard => currCard.product.name === name);
  }, [favorites, name]);
  const onToggleHandle = () => {
    if (isFavorite) {
      delFavorite(name);
    } else {
      setFavorite(product);
    }
  };

  return (
    <button
      type="button"
      className={cn(
        'button-block fav-button',
        { active: isFavorite },
      )}
      onClick={onToggleHandle}
      data-cy="addToFavorite"
    >
      {isFavorite
        ? <img src="./icons/isFavorite.svg" alt="icon" />
        : <img src="./icons/favorite.svg" alt="icon" />}
    </button>
  );
};

export default FavButton;
