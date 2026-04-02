import type { Product } from '../../types';
import { CartItemCard } from './CartItemCard';
import type { CartItem } from '../../types';
import styles from './CartPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../shared/components/Container';
import { Breadcrumbs } from '../../shared/components/Breadcrums';

type Props = {
  cart: CartItem[];
  onCheckout: () => void;
  onIncrease: (product: Product) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
};

export const CartPage: React.FC<Props> = ({
  cart,
  onCheckout,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const navigate = useNavigate();

  return (
    <Container>
      <Breadcrumbs />
      <div className={styles.cart}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={styles.back}
        >
          <span className={styles.arrow}>{'<'}</span>
          Back
        </button>
        <h1>Cart</h1>
        <div className={styles.content}>
          <div className={styles.items}>
            {cart.map(item => (
              <CartItemCard
                key={item.product.itemId}
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onRemove={onRemove}
              />
            ))}
          </div>
          <div className={styles.summary}>
            <h2 className={styles.total}>${total}</h2>
            <p className={styles.total__sum}>Total for {cart.length} items</p>
            <button
              className={styles.checkout}
              onClick={() => {
                onCheckout();
                alert('Thank you for your order');
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};
