import { FC, useState } from 'react';
import cn from 'classnames';

import { HeartIcon } from '@ui/icon/HeartIcon';

import { useAppDispatch } from '@hooks/hook';
import { TProduct } from '@utils/types/product.type';
import { addCart } from '@store/features/cart/cart.slice';
import { addFavorite } from '@store/features/favorite/favorite.slice';

import styles from './ActionsButtons.module.scss';

type TProps = {
  product?: TProduct;
};

const WHERE_ADD = {
  cart: 'cart',
  favorite: 'favorite',
};

export const ActionButtons: FC<TProps> = ({ product }) => {
  // const { items } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const [text, setText] = useState('Added');
  const [isAdded, setIsAdded] = useState({
    cart: false,
    favorite: false,
  });

  // const hasItem = (id: number) => items.find(item => item.product.id === id);

  const onMouseEnter = () => {
    setText('Delete');
  };

  const onMouseLeave = () => {
    setText('Added');
  };

  const handleStatus = (type: string, item?: TProduct) => {
    if (type === WHERE_ADD.cart) dispatch(addCart(item));
    if (type === WHERE_ADD.favorite) dispatch(addFavorite(item));

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
        onClick={() => handleStatus(WHERE_ADD.favorite, product)}
      >
        <HeartIcon isOpen={isAdded.favorite} />
      </button>
    </div>
  );
};
