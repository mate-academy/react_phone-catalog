import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';
import { Product } from '../../types/Product';
import { Card } from '../Card';
import styles from './ProductContent.module.scss';

type ProductContentProps = {
  items: Product[];
};

export const ProductContent: React.FC<ProductContentProps> = ({ items }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const { updateCart } = useCart();

  return (
    <div className={styles['product-content']}>
      <ul className={styles['product-content__list']}>
        {items &&
          items.map(item => (
            <li key={item.id} className={styles['product-content__item']}>
              <Card
                item={item}
                isFavorite={favorites.some(f => f.id === item.id)}
                toggleFavorite={() => toggleFavorite(item)}
                updateCart={() => updateCart(item)}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};
