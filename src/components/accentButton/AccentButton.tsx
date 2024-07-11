// AccentButton component
import styles from './AccentButton.module.scss';
import { ProductWithQuantity } from '../../types/ProductWithQuantity';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addProductToBasket, deleteProduct } from '../../features/basket';

type Props = {
  text: string;
  onClick?: () => void;
  product?: ProductWithQuantity;
};

export const AccentButton: React.FC<Props> = ({ text, product, onClick }) => {
  const dispatch = useAppDispatch();
  const { selectedProducts } = useAppSelector(state => state.basket);

  const productId = product?.id;
  const hasCart = selectedProducts.some(item => item.id === product?.id);

  const handleButtonFavorite = () => {
    if (!product || !productId) {
      return;
    }

    if (hasCart) {
      dispatch(deleteProduct(productId));
    } else {
      dispatch(addProductToBasket(product));
    }
  };

  return (
    <button
      className={`${styles.accentButton} ${hasCart ? styles.accentButton_pressed : ''}`}
      onClick={onClick ? onClick : handleButtonFavorite}
    >
      {!hasCart ? text : 'Added to cart'}
    </button>
  );
};
