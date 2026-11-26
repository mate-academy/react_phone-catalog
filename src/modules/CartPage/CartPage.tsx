import { BackButton } from '../shared/components/BackButton';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { CartItemComponent } from './components/CartItem';
import { CartSummary } from './components/CartSummary';
import { EmptyCart } from './components/EmptyCart';
import { useCart } from '../shared/context/CartContext';
import type { CartItem } from '../shared/types/Product';
import styles from './CartPage.module.scss';

export function CartPage(): JSX.Element {
  const { items, totalQuantity } = useCart();
  const cartItems = items as CartItem[];

  const breadcrumbItems = [{ label: 'Cart' }];

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <BackButton />
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className={styles.title}>Cart</h1>
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <BackButton />
      <Breadcrumbs items={breadcrumbItems} />
      <h1 className={styles.title}>Cart</h1>

      <div className={styles.content}>
        <section className={styles.itemsList} aria-label="Cart items">
          {cartItems.map(
            (item): JSX.Element => (
              <CartItemComponent key={item.id} item={item} />
            ),
          )}
        </section>

        {totalQuantity > 0 && <CartSummary />}
      </div>
    </div>
  );
}
