import { useContext, useMemo } from 'react';
import { ProductContext } from '../../store/ProductContext';
import classNames from 'classnames';
import { Heart } from '../ProductCard/components/Heart';
import styles from './ProductButtons.module.scss';
import { useWidth } from '../../hooks/useWidth';
import { productItem } from '../../utils/productItem';
import { getButtonClass } from '../../utils/getButtonClass';
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
    return productItem.isAdded(addedItems, productId);
  }, [addedItems, productId]);

  const handleLikeClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    productItem.updateLikedProducts(setLikedItems, productId);
  };

  const handleAddClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    productItem.updateAddedProducts(setAddedItems, productId);
  };

  return (
    <div className={`${styles.productButtons}`}>
      <button
        className={classNames(`${getButtonClass.main(darkTheme)} button--big`, {
          'button--main--selected': isAdded && !darkTheme,
          'button--main--selected-darkTheme': isAdded && darkTheme,
        })}
        onClick={handleAddClick}
      >
        {!isAdded ? 'Add to cart' : getButtonText}
      </button>
      <button
        className={classNames(
          `button ${styles.likeButton} button--medium ${getButtonClass.secondary(darkTheme)}`,
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
