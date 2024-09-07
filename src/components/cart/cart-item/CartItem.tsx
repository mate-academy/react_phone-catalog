import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './cartItem.module.scss';

<<<<<<< HEAD
import { ErrorMessage } from '@ui/error/ErrorMessage';
import { CloseIcon } from '@ui/icon/CloseIcon';
import { Counter } from '../counter/Counter';

import { useAppDispatch } from '@hooks/hook';
import { TProduct } from '@utils/types/product.type';
import { deleteCart, toggleCart } from '@store/features/cart/cart.slice';
=======
import { Counter } from '../counter/Counter';
import { CloseIcon } from 'ui/icon/CloseIcon';
import { ErrorMessage } from 'ui/error/ErrorMessage';

import { useAppDispatch } from 'hooks/hook';
import { deleteCart, toggleCart } from 'store/features/cart/cart.slice';

import { TProduct } from 'utils/types/product.type';
>>>>>>> 3d29229bf5a890910a3e7c1d3c6b79a9929789c2

type TProps = {
  item: TProduct;
  quantity: number;
};

export const CartItem: FC<TProps> = ({ item, quantity }) => {
  const { id, image, name, price } = item;

  const [hasError, setHasError] = useState(false);

  const dispatch = useAppDispatch();

  const totalPrice = price * quantity;
  const showError = quantity >= 99;

  const deleteCartItem = (itemId: number) => {
    dispatch(deleteCart(itemId));
  };

  const onAddClick = () => {
    if (!showError) {
      dispatch(toggleCart({ id, actionType: 'add' }));
    } else {
      setHasError(true);
    }
  };

  const onDeleteClick = () => {
    dispatch(toggleCart({ id, actionType: 'delete' }));
  };

  return (
    <div className={styles.item}>
      {hasError && <ErrorMessage />}

      <div className={styles.wrapper}>
        <button className={styles.delete} onClick={() => deleteCartItem(id)}>
          <CloseIcon />
        </button>
        <div className={styles.image}>
          <img src={image} alt={name} width={66} height={66} />
        </div>
        <Link to={'*'}>{name}</Link>
      </div>

      <div className={styles.wrapper}>
        <Counter
          onAddClick={onAddClick}
          onDeleteClick={onDeleteClick}
          showError={showError}
          quantity={quantity}
        />
        <p>${totalPrice}</p>
      </div>
    </div>
  );
};
