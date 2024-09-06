import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './product.module.scss';

import { HeartIcon } from 'ui/icon/HeartIcon';

import { addCart } from 'store/features/cart/cart.slice';
import { useAppDispatch } from 'hooks/hook';

import { TProduct } from 'utils/types/product.type';

interface TProps {
  product: TProduct;
  discount?: boolean;
}

const WHERE_ADD = {
  cart: 'cart',
  favorite: 'favorite',
};

export const ProductList: FC<TProps> = ({ product, discount = false }) => {
  const dispatch = useAppDispatch();

  const [text, setText] = useState('Added');
  const [isAdded, setIsAdded] = useState({
    cart: false,
    favorite: false,
  });

  const onMouseEnter = () => {
    setText('Delete');
  };

  const onMouseLeave = () => {
    setText('Added');
  };

  const handleStatus = (type: string, item?: TProduct) => {
    if (type === WHERE_ADD.cart) dispatch(addCart(item));

    setIsAdded(state => {
      if (type === WHERE_ADD.cart) {
        return {
          ...state,
          cart: !state.cart,
        };
      }

      if (type === WHERE_ADD.favorite) {
        return {
          ...state,
          favorite: !state.favorite,
        };
      }

      return state;
    });
  };

  return (
    <div className={styles.list} key={product.id}>
      <Link to={`/products/${product.itemId}`} className={styles.product}>
        <div className={styles.image}>
          <img
            src={product.image}
            alt={product.name}
            width={208}
            height={196}
          />
        </div>

        <div className={styles.title}>
          <h3>{product.name}</h3>
        </div>
      </Link>

      <div className={styles.prices}>
        <span>${product.price}</span>
        {discount && (
          <span className={styles.discount}>${product.fullPrice}</span>
        )}
      </div>

      <hr />

      <div className={styles.specs}>
        <div className={styles.spec}>
          <p>Screen</p>
          <p>{product.screen}</p>
        </div>
        <div className={styles.spec}>
          <p>Capacity</p>
          <p>{product.capacity}</p>
        </div>
        <div className={styles.spec}>
          <p>RAM</p>
          <p>{product.ram}</p>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          className={cn(!isAdded.cart ? styles.add : styles.added)}
          onClick={() => handleStatus(WHERE_ADD.cart, product)}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {!isAdded.cart ? 'Add to cart' : text}
        </button>
        <button
          className={styles.favorite}
          onClick={() => handleStatus(WHERE_ADD.favorite)}
        >
          <HeartIcon isFavorite={isAdded.favorite} />
        </button>
      </div>
    </div>
  );
};
