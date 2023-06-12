import classNames from 'classnames';
import { Phone } from '../../types/Phone';

type Props = {
  phone: Phone,
  setLikedProducts: React.Dispatch<React.SetStateAction<Phone[]>>,
  likedProducts: Phone[],
};

export const FavouritesButton: React.FC<Props> = ({
  phone,
  likedProducts,
  setLikedProducts,
}) => {
  const isLiked = likedProducts.some(
    (likedProduct) => likedProduct.id === phone.id,
  );

  const handleToggleFavorite = () => {
    if (isLiked) {
      const updatedLikedProducts = likedProducts.filter(
        (likedProduct) => likedProduct.id !== phone.id,
      );

      setLikedProducts(updatedLikedProducts);
      localStorage.setItem(
        'likedProducts', JSON.stringify(updatedLikedProducts),
      );
    } else {
      const updatedLikedProducts = [...likedProducts, phone];

      setLikedProducts(updatedLikedProducts);
      localStorage.setItem(
        'likedProducts', JSON.stringify(updatedLikedProducts),
      );
    }
  };

  return (
    <div className="favourites-button">
      <button
        type="button"
        onClick={handleToggleFavorite}
        className={classNames('phone__favourites', {
          'phone__favourites--clicked': isLiked,
        })}
      >
        <p hidden>
          favourites
        </p>
      </button>
    </div>
  );
};
