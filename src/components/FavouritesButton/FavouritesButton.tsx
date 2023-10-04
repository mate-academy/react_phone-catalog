import classNames from 'classnames';
import { Phone } from '../../types/Phone';

type Props = {
  phone?: Phone,
  setLikedProducts: React.Dispatch<React.SetStateAction<Phone[]>>,
  likedProducts: Phone[],
};

export const FavouritesButton: React.FC<Props> = ({
  phone,
  likedProducts,
  setLikedProducts,
}) => {
  const isLiked = phone ? likedProducts.some(
    (likedProduct) => likedProduct.id === phone.id,
  ) : false;

  const handleToggleFavorite = () => {
    if (phone) {
      if (isLiked) {
        const updatedLikedProducts = likedProducts.filter(
          (likedProduct) => likedProduct.id !== phone.id,
        );

        setLikedProducts(updatedLikedProducts);
      } else {
        const updatedLikedProducts = [...likedProducts, phone];

        setLikedProducts(updatedLikedProducts);
      }
    }
  };

  if (!phone) {
    return null;
  }

  return (
    <div className="favourites-button">
      <button
        type="button"
        onClick={handleToggleFavorite}
        className={classNames('phone__favourites', {
          'phone__favourites--clicked': isLiked,
        })}
        data-cy="addToFavorite"
      >
        <p hidden>
          favourites
        </p>
      </button>
    </div>
  );
};
