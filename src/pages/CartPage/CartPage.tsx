import { BackButton } from '../../components/BackButton';
import { useCart } from '../../shared/context/CartContext';
import { ShortProduct, Product } from '../../shared/models';
import styles from './CartPage.module.scss';
import CloseIcon from '../../assets/icons/сlose.svg?react';
import { Counter } from './Counter';
import { getProductId } from '../../shared/services/products.service';

export const CartPage = () => {
  const { cartItems, getTotalQuantity, removeFromCart, clearCart } = useCart();

  const getDiscountPrice = (product: Product | ShortProduct): number => {
    if ('priceDiscount' in product && 'priceRegular' in product) {
      console.log(product);
      return product.priceDiscount;
    }

    if ('price' in product && 'fullPrice' in product) {
      return product.price;
    }

    return 0;
  };

  const getProductImage = (product?: Product | ShortProduct): string => {
    if (!product) {
      return '';
    }

    if ('images' in product && Array.isArray(product.images)) {
      return product.images[0] || '';
    }

    if ('image' in product) {
      return product.image;
    }

    return '';
  };

  const getTotalCartPrice = (): number => {
    let total = 0;

    cartItems.map(el => {
      total += getDiscountPrice(el.product) * el.quantity;
    });

    return total;
  };

  const removeItem = (item: ShortProduct | Product): void => {
    removeFromCart(getProductId(item));
  };

  const openDialogWindow = (): void => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet.\nDo you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  if (cartItems.length <= 0) {
    return (
      <div className={`${styles.cart__empty} container`}>
        Your cart is empty
      </div>
    );
  }

  return (
    <div className={`${styles.cart} container`}>
      <BackButton />
      <h1>Cart</h1>
      <div className={styles.cart__content}>
        <div className={styles.cart__table}>
          {cartItems.map(item => {
            return (
              <div className={styles.cart__item}>
                <CloseIcon
                  className={styles.cart__image_icon}
                  onClick={() => removeItem(item.product)}
                />
                <div className={styles.cart__image}>
                  <img
                    src={getProductImage(item.product)}
                    alt={item.product.category}
                  />
                </div>
                <div className={styles.cart__name}>{item.product.name}</div>
                <div className={styles.cart__counter}>
                  <Counter quantity={item.quantity} product={item.product} />
                </div>
                <h3>${getDiscountPrice(item.product) * item.quantity}</h3>
              </div>
            );
          })}
        </div>
        <div className={styles.cart__total}>
          <div className={styles.cart__price}>
            <h2>${getTotalCartPrice()}</h2>
            <div>
              Total for{' '}
              {`${getTotalQuantity()} item${getTotalQuantity() > 1 && 's'}`}
            </div>
          </div>
          <button
            className={styles.cart__btn}
            disabled={getTotalQuantity() === 0}
            onClick={openDialogWindow}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
