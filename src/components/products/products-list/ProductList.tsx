import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { useAppDispatch } from '@hooks/hook';
import { addCart } from '@store/features/cart/cart.slice';

import { HeartIcon } from '@ui/icon/HeartIcon';

import { TProduct } from '@utils/types/product.type';
import { getProductUrl } from '@utils/helpers/getProductUrl';

import styles from './product.module.scss';

interface TProps {
  product: TProduct;
  discount?: boolean;
}

const WHERE_ADD = {
  cart: 'cart',
  favorite: 'favorite',
};

export const ProductList: FC<TProps> = ({ product, discount = false }) => {
  const {
    id,
    name,
    image,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    itemId,
    category,
  } = product;

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

  const URL = getProductUrl(category, itemId);

  return (
    <div className={styles.list} key={id}>
      <Link to={URL} className={styles.product}>
        <div className={styles.image}>
          <img src={image} alt={name} width={208} height={196} />
        </div>

        <div className={styles.title}>
          <h3>{name}</h3>
        </div>
      </Link>

      <div className={styles.prices}>
        <span>${price}</span>
        {discount && <span className={styles.discount}>${fullPrice}</span>}
      </div>

      <hr />

      <div className={styles.specs}>
        <div className={styles.spec}>
          <p>Screen</p>
          <p>{screen}</p>
        </div>
        <div className={styles.spec}>
          <p>Capacity</p>
          <p>{capacity}</p>
        </div>
        <div className={styles.spec}>
          <p>RAM</p>
          <p>{ram}</p>
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
