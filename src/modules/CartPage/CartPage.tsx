import styles from './CartPage.module.scss';
import { BackBreadcrumb } from '../../components/BackBreadcrumb';
import { useAppSelector } from '../../app/hooks';
import { Product } from '../../types/products';
import notFound from '../../assets/img/cart-is-empty.png';
import classNames from 'classnames';
import { CartList } from './components/CartList';
import { Checkout } from './components/Checkout';
import { useState } from 'react';
import { ModalCheckout } from './components/ModalCheckout';

const getProductById = (ids: string[], products: Product[]): Product[] => {
  return products.filter(product => ids.includes(product.itemId));
};

const CartPage = () => {
  const products = useAppSelector(state => state.store.products);
  const cart = useAppSelector(state => state.cart.cart);
  const filtredProducts = getProductById(
    cart.map(el => el.id),
    products,
  );
  const [isCheckout, setIsCheckout] = useState(false);

  const handleCheckout = () => {
    setIsCheckout(prev => !prev);
  };

  return (
    <main
      className={classNames(styles.CartPage, {
        empty: filtredProducts.length === 0,
      })}
    >
      <BackBreadcrumb />

      {filtredProducts.length === 0 && (
        <img className={styles.CartPage__img} src={notFound} alt="Not Found" />
      )}

      <div className={classNames('main__content', styles.CartPage__content)}>
        <CartList products={filtredProducts} />
        <Checkout onClick={handleCheckout} />
      </div>

      {isCheckout && <ModalCheckout onClick={handleCheckout} />}
    </main>
  );
};

export default CartPage;
