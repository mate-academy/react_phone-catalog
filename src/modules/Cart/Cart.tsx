import { useEffect, useMemo, useState } from 'react';
import { useCart } from '../CartFavContext/CartContext';
import PageHeader from '../shared/components/PageHeader/PageHeader';
import { BackButton } from '../shared/components/BackButton/BackButton';
import CartItemComponent from './CartItemComponent';
import { CustomModal } from '../shared/components/CustomModal/CustomModal';
import styles from './Cart.module.scss';
import { Product } from '@/types';
import { getProducts } from '@/api/api';

export type CartProduct = Product & { quantity: number };
//TODO: add loader
export const Cart: React.FC = () => {
  const { cart, totalCount } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);
  const cartProducts = useMemo(() => {
    return cart
      .map(cartItem => {
        const product = products.find(p => p.itemId === cartItem.itemId);
        return product ? { ...product, quantity: cartItem.quantity } : null;
      })
      .filter((item): item is CartProduct => item !== null);
  }, [cart, products]);

  const totalAmount = useMemo(
    () =>
      cartProducts.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartProducts],
  );

  const handleCheckout = () => {
    setIsModalOpen(prev => !prev);
  };

  return cart.length > 0 ? (
    <div className={styles.cartPage__container}>
      <PageHeader
        title="Cart"
        showBreadCrumbs={false}
        extraContent={<BackButton label="Back" />}
        variant="cartPage"
      />
      <div className={styles.cartPage__layout}>
        <div className={styles.cartItemsList}>
          {cartProducts.map(item => (
            <CartItemComponent key={item.itemId} item={item as CartProduct} />
          ))}
        </div>
        <div className={styles.cartPage__checkoutBlock}>
          <div className={styles.cartPage__checkoutBlockPriceWrapper}>
            <span className={styles.cartPage__checkoutBlockPrice}>
              ${totalAmount}
            </span>
            <span
              className={styles.cartPage__checkoutBlockAmount}
            >{`Total for ${totalCount} items`}</span>
          </div>
          <button
            className={styles.cartPage__checkoutBlockButton}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
      {isModalOpen && <CustomModal onClose={handleCheckout} />}
    </div>
  ) : (
    <div className={styles.cartPage__empty}>Your cart is empty</div>
  );
};
