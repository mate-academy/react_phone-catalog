import { Category } from '@shared/api';
import styles from '../../../styles/uiSection/purchaseBlock.module.scss';
import { CardButtons } from '@entities/prodCard/ui/buttons';
import { useProdCard } from '@features/index';
type Props = {
  priceRegular: number;
  priceDiscount?: number;
  id: string;
  category: Category;
};

export const PurchaseBlock = ({
  priceRegular,
  priceDiscount,
  id,
  category,
}: Props) => {
  const { isIn, stateHandlers } = useProdCard();
  const { fav, cart } = isIn;
  const { toggleCart, toggleFav } = stateHandlers;

  return (
    <div className={styles['ui-purchase-container']}>
      {priceDiscount === priceRegular || !priceDiscount ? (
        <span className={styles.price}>{`$${priceRegular}`}</span>
      ) : (
        <span className={styles.price}>
          {`$${priceDiscount}`}
          <span className={styles['full-price']}>{`$${priceRegular}`}</span>
        </span>
      )}
      <CardButtons
        item={{ id: id, category: category }}
        isInFav={fav(id)}
        isInCart={cart(id)}
        handleCart={toggleCart}
        handleFav={toggleFav}
      />
    </div>
  );
};
