// eslint-disable-next-line max-len
import { useFavouriteContext } from '../../../../context/ShopContext/FavoutiteContext';
import { Product } from '../../../../types/Producst';
import s from './LikeButton.module.scss';

type Props = {
  size?: 'medium';
  product: Product;
};

export const LikeButton: React.FC<Props> = ({ size, product }) => {
  const { liked, addFavourite, deleteFavourite } = useFavouriteContext();
  const isLiked = liked.find(item => item.id === product.id);

  return (
    <button
      className={`${s['like-button']} ${s[`like-button--${size}`]} `}
      onClick={() => {
        if (isLiked) {
          deleteFavourite(product);
        } else {
          addFavourite(product);
        }
      }}
    >
      <img
        src={isLiked ? '/img/icons/liked.svg' : '/img/icons/Favourites.png'}
        alt="favourite"
      />
    </button>
  );
};
