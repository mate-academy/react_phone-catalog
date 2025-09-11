import { Item } from '../../types/Item';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductsList.module.scss';

type Props = {
  currentItems: Item[];
  isFavorites: boolean;
  isWideCard: boolean;
};

// eslint-disable-next-line max-len
export const ProductsList: React.FC<Props> = ({
  currentItems,
  isFavorites = false,
  isWideCard = false,
}) => {
  return (
    <div
      className={`${styles.productsList} ${isFavorites ? styles['productsList--favorites'] : ''}`}
    >
      {currentItems.map(product => (
        <ProductCard
          product={product}
          key={product.id}
          isWideCard={isWideCard}
          isWithoutDescount={false}
          isYouMayLike={false}
        />
      ))}
    </div>
  );
};
