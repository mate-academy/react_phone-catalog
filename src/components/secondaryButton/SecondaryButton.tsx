import { useContext, useState, useEffect } from 'react';
import styles from './SecondaryButton.module.scss';
import { AppContext } from '../../store/context';
import { ProductInfo } from '../../types/ProductInfo';

type Props = {
  product: ProductInfo;
};

export const SecondaryButton: React.FC<Props> = ({ product }) => {
  const { likedProducts, setLikedProducts } = useContext(AppContext);
  const [imgButton, setImgButton] = useState('');

  useEffect(() => {
    const productId = product?.id;
    const isLiked = likedProducts.some(
      likedProduct => likedProduct.id === productId,
    );

    setImgButton(
      isLiked ? 'img/icons/fillHeart.svg' : 'img/icons/favourite.svg',
    );
  }, [likedProducts, product?.id]);

  const handleButtonFavorite = () => {
    const productId = product?.id;
    const isLiked = likedProducts.some(
      currentProduct => currentProduct.id === productId,
    );

    let updatedLikedProducts: ProductInfo[];

    if (isLiked) {
      updatedLikedProducts = likedProducts.filter(
        currentProduct => currentProduct.id !== productId,
      );
    } else {
      updatedLikedProducts = [...likedProducts, product];
    }

    localStorage.setItem('likedProducts', JSON.stringify(updatedLikedProducts));
    setLikedProducts(updatedLikedProducts);

    setImgButton(
      isLiked ? 'img/icons/favourite.svg' : 'img/icons/fillHeart.svg',
    );
  };

  return (
    <button
      type="button"
      className={styles.secondaryButton}
      onClick={handleButtonFavorite}
    >
      <img src={imgButton} alt="Favorite" />
    </button>
  );
};
