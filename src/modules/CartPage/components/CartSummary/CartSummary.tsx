import { Button } from '../../../shared/components/Button';
import { useMemo } from 'react';
import { useCart } from '../../../shared/components/Contexts/CartContext';
import { DecorativeLine } from '../../../shared/components/DecorativeLine';
import { ProductInCart } from '../../../shared/types/types';
import classNames from 'classnames';
import styles from './CartSummary.module.scss';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';

type Summary = {
  totalQuantity: number;
  totalPrice: number;
};

type Props = {
  className: string;
};

export const CartSummary: React.FC<Props> = ({ className }) => {
  const { cart, handleCartClear } = useCart();
  const { preTotal, total, totalOne, checkout, checkoutMessage } =
    useLanguage().localeTexts;

  const onCheckoutClick = () => {
    if (confirm(checkoutMessage)) {
      handleCartClear();
    }
  };

  const summary = useMemo(() => {
    const reducer = (
      previousSummary: Summary,
      productInCart: ProductInCart,
    ): Summary => ({
      totalQuantity: previousSummary.totalQuantity + productInCart.quantity,
      totalPrice:
        previousSummary.totalPrice +
        productInCart.product.price * productInCart.quantity,
    });

    const initialValue: Summary = {
      totalQuantity: 0,
      totalPrice: 0,
    };

    return cart.reduce(reducer, initialValue);
  }, [cart]);

  return (
    <section className={classNames(styles.CartSummary, className)}>
      <div className={styles.Frame}>
        <output
          className={styles.TotalPrice}
        >{`$${summary.totalPrice}`}</output>

        <output
          className={styles.TotalQuantity}
        >{`${preTotal} ${summary.totalQuantity} ${summary.totalQuantity === 1 ? totalOne : total}`}</output>

        <DecorativeLine className={styles.Line} />

        <Button
          text={checkout}
          onClick={onCheckoutClick}
          className={styles.Button}
        />
      </div>
    </section>
  );
};
