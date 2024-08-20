import { Icon } from '../ui/Icon';
import styles from './CartItem.module.scss';
import { CardButton } from '../ui/CardButton';
import classNames from 'classnames';

// import img from '../../assets/img/phones/apple-iphone-11/black/00.webp';
import { Product } from '../../types/Product';
import { useEffect, useState } from 'react';
// import { useCart } from '../../hooks/useCart';

type CartItemProps = {
  item: Product;
  updateCart: (item: Product) => void;
  onItemPrice: (
    price: number,
    count: number,
    type: 'increase' | 'decrease',
  ) => void;
  onItemCount: (count: number, type: 'increase' | 'decrease') => void;
};

export const CartItem: React.FC<CartItemProps> = ({
  item,
  updateCart,
  onItemPrice,
  onItemCount,
}) => {
  // const { cart, updateCart } = useCart();
  const { image, name, price } = item;
  const [countItem, setCountItem] = useState(1);

  useEffect(() => {
    if (countItem > 1) {
      onItemPrice(price, countItem - 1, 'increase'); // Subtract previous count
      onItemCount(countItem - 1, 'increase'); // Subtract previous count
    }
    // eslint-disable-next-line
  }, []);

  const handleCountItem = (type: 'increase' | 'decrease') => {
    setCountItem(prevCount => {
      const newCount = type === 'increase' ? prevCount + 1 : prevCount - 1;

      if (newCount >= 1) {
        // Update the cart with new count
        onItemPrice(price, 1, type);
        onItemCount(1, type);

        return newCount;
      }

      return prevCount;
    });
  };

  return (
    <div className={styles['cart-item']}>
      <div className={styles['cart-item__block']}>
        <CardButton
          variant="control"
          style={{ border: 'none' }}
          onClick={() => updateCart(item)}
        >
          <Icon iconName="close" />
        </CardButton>

        <a href="#" className={styles['cart-item__img-link']}>
          <img src={image} className={styles['cart-item__img']} alt={name} />
        </a>

        <a href="#" className={styles['cart-item__title-link']}>
          <p className={classNames('body-text', styles['cart-item__title'])}>
            {name}
          </p>
        </a>
      </div>

      <div className={styles['cart-item__block']}>
        <div className={styles['cart-item__control-buttons']}>
          <CardButton
            variant="control"
            onClick={() => handleCountItem('decrease')}
          >
            <Icon iconName="minus" />
          </CardButton>
          <p className="body-text">{countItem}</p>
          <CardButton
            variant="control"
            onClick={() => handleCountItem('increase')}
          >
            <Icon iconName="plus" />
          </CardButton>
        </div>

        <h4 className={styles['cart-item__price']}>${countItem * price}</h4>
      </div>
    </div>
  );
};
