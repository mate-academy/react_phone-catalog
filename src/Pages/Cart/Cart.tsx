// Cart.tsx
import { Breadcrumbs } from '../../components/Breadcrumbs';
import styles from './Cart.module.scss';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types/Product';
import { BackBtn } from '../../components/BackBtn';
import { CartPage } from './components/CartPage/CartPage';
import { CartTotal } from './components/CartTotal';

interface CartProps {
  category: string;
  products: Product[];
}

export const Cart = ({ category, products }: CartProps) => {
  const { cartItems } = useCart();

  // Об'єднуємо актуальні дані товару (ціна, назва, фото) з кількістю з кошика
  const cartProductsData = cartItems
    .map(item => {
      const product = products.find(p => p.itemId === item.id);

      if (!product) {
        return null;
      }

      return {
        product,
        quantity: item.quantity,
      };
    })
    .filter(
      (item): item is { product: Product; quantity: number } => item !== null,
    );

  // 1. Загальна вартість усіх товарів (сума: ціна товару * кількість)
  const totalAmount = cartProductsData.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  // 2. Загальна кількість усіх одиниць товару (сума всіх quantities)
  const totalCount = cartProductsData.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <section className={styles.cart}>
      <div className="cart__container">
        <Breadcrumbs category={category} />
        <BackBtn className={styles.backBtnMargin} />
        <h1 className={`section-title-h1 ${styles.title}`}>Cart</h1>

        <div className={styles.blockCarts}>
          <CartPage products={cartProductsData} />

          {/* Правий блок для підсумку CartTotal */}
          <CartTotal totalAmount={totalAmount} totalCount={totalCount} />
        </div>
      </div>
    </section>
  );
};
