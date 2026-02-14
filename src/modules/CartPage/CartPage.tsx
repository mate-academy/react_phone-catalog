import styles from './CartPage.module.scss';
import { FiChevronLeft } from 'react-icons/fi';
import { IconTextButton } from 'components/IconTextButton';
import { CartItem } from './components/CartItem';
import { CheckoutItem } from './components/CheckoutItem';
import { useContext } from 'react';
import { ProductsContext } from 'store/ProductsContext';
import { EmptyContent } from 'components/EmptyContent';

export const CartPage = () => {
  const { cartProducts } = useContext(ProductsContext);

  if (cartProducts.length === 0) {
    return <EmptyContent title={'Your cart is empty.'} />;
  }

  return (
    <div className={styles.container}>
      <IconTextButton
        icon={<FiChevronLeft />}
        label={'Back'}
        onClick={() => {}}
      />
      <span className={styles.container__title}>Cart</span>
      <div className={styles.container__content}>
        <div className={styles.container__content__list}>
          {cartProducts.map(product => (
            <CartItem key={product.id} product={product} />
          ))}
        </div>
        <CheckoutItem />
      </div>
    </div>
  );
};
