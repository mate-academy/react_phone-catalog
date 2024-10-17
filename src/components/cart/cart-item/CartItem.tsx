import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { Counter } from '../counter/Counter';
import { ErrorMessage } from '@ui/error/ErrorMessage';
import { CloseIcon } from '@ui/icon/CloseIcon';

import { useAction } from '@hooks/useActions';

import { TProduct } from '@utils/types/product.type';
import { getProductUrl } from '@utils/helpers/getProductUrl';

import styles from './cartItem.module.scss';

type TProps = {
  item: TProduct;
  quantity: number;
};

export const CartItem: FC<TProps> = ({ item, quantity }) => {
  const { id, image, name, price, category, itemId } = item;
  const { deleteCart, toggleCart } = useAction();
  const [showAlert, setShowAlert] = useState(false);

  const totalPrice = price * quantity;
  const showError = quantity === 99;

  const deleteCartItem = (itemId: number) => {
    deleteCart(itemId);
  };

  const onAddClick = () => {
    if (!showError) {
      toggleCart({ id, actionType: 'add' });
    } else {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const onDeleteClick = () => {
    toggleCart({ id, actionType: 'delete' });
  };

  const URL = getProductUrl(category, itemId);

  return (
    <article className={styles.item}>
      {showAlert && <ErrorMessage />}

      <div className={styles.wrapper} title={name}>
        <button
          className={styles.delete}
          onClick={() => deleteCartItem(id)}
          title="Delete product"
        >
          <CloseIcon />
        </button>

        <Link to={URL} state={{ itemId: itemId }}>
          <div className={styles.image}>
            <img src={image} alt={name} width={66} height={66} loading="lazy" />
          </div>
        </Link>

        <Link className={styles.title} to={URL} state={{ itemId: itemId }}>
          {name}
        </Link>
      </div>

      <div className={styles.wrapper}>
        <Counter
          onAddClick={onAddClick}
          onDeleteClick={onDeleteClick}
          showError={showAlert}
          quantity={quantity}
        />
        <p>${totalPrice}</p>
      </div>
    </article>
  );
};
