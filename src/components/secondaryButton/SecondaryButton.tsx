import { useState, useEffect } from 'react';
import styles from './SecondaryButton.module.scss';
import { ProductInfo } from '../../types/ProductInfo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { addProductToLiked } from '../../features/favourite';

type Props = {
  product: ProductInfo;
};

export const SecondaryButton: React.FC<Props> = ({ product }) => {
  const [imgButton, setImgButton] = useState('');

  const dispatch = useAppDispatch();
  const { likedProducts } = useAppSelector(
    (state: RootState) => state.favourite,
  );

  const hasLiked = likedProducts.some(item => item.id === product?.id);

  useEffect(() => {
    setImgButton(
      hasLiked ? 'img/icons/fillHeart.svg' : 'img/icons/favourite.svg',
    );
  }, [likedProducts, product?.id]);

  const handleButtonFavorite = () => {
    dispatch(addProductToLiked(product));

    setImgButton(
      hasLiked ? 'img/icons/favourite.svg' : 'img/icons/fillHeart.svg',
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
