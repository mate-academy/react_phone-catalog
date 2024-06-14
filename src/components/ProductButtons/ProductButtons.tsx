import { useContext, useMemo } from 'react';
import { productItem } from '../../utils/utils';
import { ProductContext } from '../../store/ProductContext';
import classNames from 'classnames';
import { Heart } from '../UIKit/Heart';
import styles from './ProductButtons.module.scss';
import { useWidth } from '../../hooks/useWidth';
type Props = {
  productId: string;
};

export const ProductButtons: React.FC<Props> = ({ productId }) => {
  const { likedItems, setLikedItems, addedItems, setAddedItems } =
    useContext(ProductContext);
  const width = useWidth();

  const getButtonText = width < 640 ? 'Added' : 'Added to cart';

  const isLiked = useMemo(() => {
    return productItem.isLiked(likedItems, productId);
  }, [likedItems, productId]);
  const isAdded = useMemo(() => {
    return productItem.isLiked(addedItems, productId);
  }, [addedItems, productId]);

  const handleLikeClick = () => {
    productItem.updateSelectedProducts(setLikedItems, productId);
  };

  const handleAddClick = () => {
    productItem.updateSelectedProducts(setAddedItems, productId);
  };

  return (
    <div className={`${styles.productButtons}`}>
      <button
        className={classNames('button button--black button--big', {
          'button--black--selected': isAdded,
        })}
        onClick={handleAddClick}
      >
        {!isAdded ? 'Add to cart' : getButtonText}
      </button>
      <button
        className={classNames('button button--medium', {
          'button--like': !isLiked,
          'button--like--selected': isLiked,
        })}
        onClick={handleLikeClick}
      >
        <Heart isSelected={Boolean(isLiked)} />
      </button>
    </div>
  );
};
