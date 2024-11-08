import { FC, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Icons } from '@ui/index';

import { useAction } from '@hooks/index';

import { getProductUrl } from '@utils/helpers/productUtils';
import { TProduct } from '@utils/types/product.type';

import { CartCounter } from '../index';
import styles from './CartItem.module.scss';

type TProps = {
  item: TProduct;
  quantity: number;
  showAlert: boolean;
  setHideAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
};
const MAX_QUANTITY = 99;

export const CartItem: FC<TProps> = memo(
  ({ item, quantity, showAlert, setHideAlert, setShowAlert }) => {
    const { id, image, name, price, category, itemId } = item;
    const { deleteCart, toggleCart } = useAction();
    const { t } = useTranslation();

    const totalPrice = price * quantity;
    const localMain = t('price.main', { val: price });
    const localDelete = t('cart.product.delete');
    const localView = t('cart.product.view', { name: name });
    const localAltImg = t('cart.product.imageAlt', { name: name });

    const onAddClick = () => {
      if (quantity < MAX_QUANTITY) {
        toggleCart({ id, actionType: 'add' });
      } else {
        setShowAlert(true);
      }
    };

    const onDeleteClick = () => {
      toggleCart({ id, actionType: 'delete' });
    };

    useEffect(() => {
      let timer: NodeJS.Timeout;

      if (showAlert) {
        timer = setTimeout(() => {
          setHideAlert(true);
          setTimeout(() => setShowAlert(false), 500);
        }, 2000);
      }

      return () => {
        setHideAlert(false);
        clearTimeout(timer);
      };
    }, [showAlert]);

    const URL = getProductUrl(category, itemId);

    return (
      <article className={styles.item}>
        <div className={styles.wrapper} title={name}>
          <button
            type="button"
            className={styles.delete}
            onClick={() => deleteCart(id)}
            title={localDelete}
            aria-label={localDelete}
          >
            <Icons.CloseIcon />
          </button>

          <Link to={URL} aria-label={localView}>
            <div className={styles.image}>
              <img
                src={image}
                alt={localAltImg}
                width={66}
                height={66}
                loading="lazy"
              />
            </div>
          </Link>

          <Link to={URL} className={styles.title}>
            {name}
          </Link>
        </div>

        <div className={styles.wrapper}>
          <CartCounter
            onAddClick={onAddClick}
            onDeleteClick={onDeleteClick}
            showError={showAlert}
            quantity={quantity}
          />
          <p aria-live="polite" aria-label={localMain}>
            ${totalPrice}
          </p>
        </div>
      </article>
    );
  },
);
