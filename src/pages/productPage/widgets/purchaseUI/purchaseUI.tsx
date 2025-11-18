import { UILoadStatus, useProdCard } from '@features/index';
import { PurchaseBlockProps } from '../../model';
import styles from './purchaseUI.module.scss';
import { CardButtons } from '@entities/prodCard/ui/cardButtons';
import classNames from 'classnames';

type Props = {
  data: PurchaseBlockProps | UILoadStatus;
};

const defaultButtonProps = {
  isInFav: false,
  isInCart: false,
  handleCart: (e: React.MouseEvent) => e.preventDefault(),
  handleFav: (e: React.MouseEvent) => e.preventDefault(),
};

export const PurchaseUI = ({ data }: Props) => {
  const { isIn, stateHandlers } = useProdCard();
  const { fav, cart } = isIn;
  const { toggleCart, toggleFav } = stateHandlers;

  const getButtonConf = () => {
    if (typeof data === 'string') {
      return defaultButtonProps;
    }

    return {
      isInFav: fav(data.id),
      isInCart: cart(data.id),
      handleCart: (e: React.MouseEvent) => toggleCart(e, { id: data.id }),
      handleFav: (e: React.MouseEvent) => toggleFav(e, { id: data.id }),
    };
  };

  const mainPrice =
    typeof data === 'string'
      ? '----'
      : !data.priceDiscount || data.priceDiscount === data.priceRegular
        ? data.priceRegular
        : data.priceDiscount;

  const secondaryPrice =
    typeof data !== 'string' &&
    data.priceDiscount &&
    data.priceDiscount !== data.priceRegular
      ? data.priceRegular
      : null;

  return (
    <div className={styles['ui-purchase-container']}>
      <span className={styles.price}>
        ${mainPrice}
        <span
          className={classNames(styles['full-price'], {
            [styles.hidden]: secondaryPrice === null,
          })}
        >
          ${secondaryPrice}
        </span>
      </span>

      <CardButtons {...getButtonConf()} />
    </div>
  );
};
