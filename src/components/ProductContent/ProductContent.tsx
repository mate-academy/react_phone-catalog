import { Card } from '../Card';
import { Product } from '../../types/Product';
import styles from './ProductContent.module.scss';
import { CartActionType } from '../../types/CartActionType';

type ProductContentProps = {
  items: Product[];
  cart?: Product[];
  updateCart?: (product: Product | null, action: CartActionType) => void;
};

export const ProductContent: React.FC<ProductContentProps> = ({ items, cart = [], updateCart }) => {
  const handleToggleCart = (item: Product) => {
    if (!updateCart) return;

    const isInCart = cart.some(cartItem => cartItem.id === item.id);
    if (isInCart) {
      updateCart(item, CartActionType.REMOVE);
    } else {
      updateCart(item, CartActionType.ADD);
    }
  };

  return (
    <div className={styles['product-content']}>
      <ul className={styles['product-content__list']}>
        {items.map(item => (
          <li key={item.id} className={styles['product-content__item']}>
            <Card
              item={item}
              isInCart={cart.some(cartItem => cartItem.id === item.id)}
              updateCart={() => handleToggleCart(item)}
              isFavorite={false}
              toggleFavorite={() => {}}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
