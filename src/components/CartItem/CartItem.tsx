import { useEffect, useState } from 'react';
import { useProducts } from '../../Store';
import { Product } from '../../types/Product';

import { Icon } from '../Icon';

import styles from './CartItem.module.scss';
import closeIcon from '../../img/icons/Close.svg';
import plusIcon from '../../img/icons/Plus.svg';
import minusIcon from '../../img/icons/Minus.svg';
import { numberToCurrency } from '../../utils/numberToCurrency';
import { useToggle } from '../../hooks/useToggle';

type Props = {
  product: Product,
  setCartTotalPrice: React.Dispatch<React.SetStateAction<number>>,
};

export const CartItem: React.FC<Props> = ({ product, setCartTotalPrice }) => {
  const setCartProducts = useProducts(state => state.setCartProducts);
  const cartProducts = useProducts(state => state.cartProducts);
  const [productCount, setProductCount] = useState(
    +(localStorage.getItem(product.id) || 1),
  );
  const [, toggleCart] = useToggle(
    'Cart',
    cartProducts,
    setCartProducts,
    product,
  );
  const handleDeleteItem = () => {
    toggleCart();
    setCartTotalPrice(prev => prev - (product.price * productCount));
    localStorage.removeItem(product.id);
  };

  useEffect(() => {
    setCartTotalPrice(prev => prev + (product.price * productCount));
    localStorage.setItem(product.id, productCount.toString());
  }, []);

  useEffect(() => {
    localStorage.setItem(product.id, productCount.toString());
    if (!productCount) {
      handleDeleteItem();
    }
  }, [productCount]);

  return (
    <div className={styles.cartItem}>
      <Icon
        icon={closeIcon}
        stylesName={styles.cartItemClose}
        onClick={handleDeleteItem}
      />
      <img
        className={styles.cartItemImg}
        src={`_new/${product.image}`}
        alt="product"
      />
      <p className="bodyText">{product.name}</p>
      <div className={styles.cartItemCounter}>
        <Icon
          icon={minusIcon}
          onClick={() => {
            setProductCount(prev => prev - 1);
            setCartTotalPrice(prev => prev - product.price);
          }}
        />
        {productCount}
        <Icon
          icon={plusIcon}
          onClick={() => {
            setProductCount(prev => prev + 1);
            setCartTotalPrice(prev => prev + product.price);
          }}
        />
      </div>
      <h2 className={styles.cartItemPrice}>
        {numberToCurrency(product.price)}
      </h2>
    </div>
  );
};
