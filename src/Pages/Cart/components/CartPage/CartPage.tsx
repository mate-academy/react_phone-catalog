// CartPage.tsx
import styles from './CartPage.module.scss';
import { CartItem } from '../CartItem';
import { Product } from '../../../../types/Product';

// 1. Описуємо тип одного елемента списку кошика
interface CartItemData {
  product: Product;
  quantity: number;
}

// 2. CartPage чекає МАСИВ (CartItemData[])
interface CartPageProps {
  products: CartItemData[];
}

export const CartPage = ({ products }: CartPageProps) => {
  return (
    <section className={styles.cartPage}>
      {/* 3. Деструктуризуємо product та quantity з кожного елемента */}
      {products.map(({ product, quantity }) => (
        <CartItem key={product.id} product={product} quantity={quantity} />
      ))}
    </section>
  );
};
