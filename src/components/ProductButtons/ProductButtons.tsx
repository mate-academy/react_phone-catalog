import { useContext, useMemo } from 'react';
import { getButtonMainClass, getButtonSecondaryClass } from '../../utils/utils';
import { ProductContext } from '../../store/ProductContext';
import classNames from 'classnames';
import { Heart } from '../ProductCard/components/Heart';
import styles from './ProductButtons.module.scss';
import { useWidth } from '../../hooks/useWidth';
import { productItem } from '../../utils/productItem';
type Props = {
  productId: string;
};

export const ProductButtons: React.FC<Props> = ({ productId }) => {
  const { darkTheme, likedItems, setLikedItems, addedItems, setAddedItems } =
    useContext(ProductContext);
  const width = useWidth();

  const getButtonText = width < 640 ? 'Added' : 'Added to cart';

  const isLiked = useMemo(() => {
    return productItem.isLiked(likedItems, productId);
  }, [likedItems, productId]);
  const isAdded = useMemo(() => {
    return productItem.isLiked(addedItems, productId);
  }, [addedItems, productId]);

  const handleLikeClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    productItem.updateSelectedProducts(setLikedItems, productId);
  };

  const handleAddClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    productItem.updateSelectedProducts(setAddedItems, productId);
  };

  return (
    <div className={`${styles.productButtons}`}>
      <button
        className={classNames(`${getButtonMainClass(darkTheme)} button--big`, {
          'button--main--selected': isAdded && !darkTheme,
          'button--main--selected-darkTheme': isAdded && darkTheme,
        })}
        onClick={handleAddClick}
      >
        {!isAdded ? 'Add to cart' : getButtonText}
      </button>
      <button
        className={classNames(
          `button ${styles.likeButton} button--medium ${getButtonSecondaryClass(darkTheme)}`,
          {
            'button--secondary--selected': isLiked,
          },
        )}
        onClick={handleLikeClick}
      >
        <Heart isSelected={Boolean(isLiked)} />
      </button>
    </div>
  );
};
