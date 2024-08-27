import { Icon } from '../ui/Icon';
import styles from './CartItem.module.scss';
import { CardButton } from '../ui/CardButton';
import classNames from 'classnames';

import { Product } from '../../types/Product';
import { CartActionType } from '../../types/CartActionType';
import { Link, useSearchParams } from 'react-router-dom';

type CartItemProps = {
  item: Product;
  updateCart: (item: Product, action: CartActionType) => void;
};

export const CartItem: React.FC<CartItemProps> = ({ item, updateCart }) => {
  const { image, name, price, count = 1, totalPrice = price } = item;
  const [searchParams] = useSearchParams();

  const handleCalcItem = (type: 'increase' | 'decrease') => {
    const newCount = type === 'increase' ? count + 1 : count - 1;

    if (newCount >= 1 && newCount < 11) {
      updateCart(
        {
          ...item,
          count: newCount,
          totalPrice: newCount * price,
        },
        CartActionType.UPDATE,
      );
    }
  };

  return (
    <div className={styles['cart-item']}>
      <div
        className={classNames(
          styles['cart-item__block'],
          styles['cart-item__block--justify-start'],
        )}
      >
        <CardButton
          variant="control"
          modificator="borderNone"
          onClick={() => updateCart(item, CartActionType.DELETE)}
        >
          <Icon iconName="close" />
        </CardButton>

        <Link
          to={`/${item.category}/:${item.itemId}`}
          state={{ search: searchParams.toString() }}
          className={styles['cart-item__img-link']}
        >
          <img src={image} className={styles['cart-item__img']} alt={name} />
        </Link>

        <Link
          to={`/${item.category}/:${item.itemId}`}
          state={{ search: searchParams.toString() }}
          className={styles['cart-item__title-link']}
        >
          <p className={classNames('body-text', styles['cart-item__title'])}>
            {name}
          </p>
        </Link>
      </div>

      <div className={styles['cart-item__block']}>
        <div className={styles['cart-item__control-buttons']}>
          <CardButton
            variant="control"
            modificator={count === 1 ? 'disabled' : undefined}
            onClick={() => handleCalcItem('decrease')}
          >
            <Icon iconName="minus" />
          </CardButton>
          <p className="body-text">{count}</p>
          <CardButton
            variant="control"
            onClick={() => handleCalcItem('increase')}
          >
            <Icon iconName="plus" />
          </CardButton>
        </div>

        <h4 className={styles['cart-item__price']}>${totalPrice}</h4>
      </div>
    </div>
  );
};
