import { Product } from '@shared/types';
import styles from '../styles/CartItemWidget.module.scss';
import { LoadStatus } from '@shared/api';

const baseConf = {
  name: '',
  nameClass: styles['name-skeleton'],
  disableButtons: true,
  price: '$---',
};

export const getCartWindetParams = (
  item: LoadStatus | Product,
  amount: number,
) => {
  if (typeof item === 'string') {
    return baseConf;
  }

  return {
    name: item.name,
    nameClass: styles.name,
    disableButtons: false,
    price: `$${(item.priceDiscount || item.priceRegular) * amount}`,
  };
};
