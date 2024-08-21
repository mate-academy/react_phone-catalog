import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';
import { CartActionType } from '../../types/CartActionType';
import { Product } from '../../types/Product';
import { isItemInArray } from '../../utils/isItemInArray';
import { Card } from '../Card';
import styles from './ProductContent.module.scss';

type ProductContentProps = {
  items: Product[];
};

export const ProductContent: React.FC<ProductContentProps> = ({ items }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const { cart, updateCart } = useCart();

  return (
    <div className={styles['product-content']}>
      <ul className={styles['product-content__list']}>
        {items &&
          items.map(item => (
            <li key={item.id} className={styles['product-content__item']}>
              <Card
                item={item}
                isInCart={isItemInArray(cart, item.id)}
                isFavorite={isItemInArray(favorites, item.id)}
                toggleFavorite={() => toggleFavorite(item)}
                updateCart={() => updateCart(item, CartActionType.ADD)}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};
