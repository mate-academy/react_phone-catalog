import classNames from 'classnames';

import heartIcon from '@assets/svg/heart.svg';
import heartRedIcon from '@assets/svg/heart_red.svg';
import { useFav } from '@contexts/favContext';
import { Product } from '@typings/product';
import { ProductDetails } from '@typings/productDetails';
import './FavButton.scss';

type FavButtonProps = {
  size: number;
  productId: string;
  product: Product | ProductDetails;
};

export const FavButton = ({ size, product, productId }: FavButtonProps) => {
  const { addFavItem, deleteFavItem, favItems } = useFav();

  const isFav = favItems.some(item => item.itemId === productId);

  return (
    <button
      onClick={() => (isFav ? deleteFavItem(productId) : addFavItem(product))}
      style={{ width: size, height: size }}
      type="button"
      className="fav-button"
      data-cy={!isFav && 'addToFavorite'}
    >
      <img
        className={classNames('fav-button__icon', {
          'fav-button__icon--liked': isFav,
        })}
        src={isFav ? heartRedIcon : heartIcon}
        alt={isFav ? 'Delete from favorites' : 'Add to favorites'}
      />
    </button>
  );
};
