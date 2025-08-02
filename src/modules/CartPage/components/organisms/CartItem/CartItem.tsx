import React from 'react';
import styles from './CartItem.module.scss';
import { CloseIcon } from '../../../../../assets/icons/close-icon';
import { Icon } from '../../../../shared/atoms/Icon';
import { MinusIcon } from '../../../../../assets/icons/minus-icon';
import { PlusIcon } from '../../../../../assets/icons/plus-icon';
import { remove, increase, decrease } from '../../../../../features/cartSlice';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { Product } from '../../../../../types/Product';
import { IconButton } from '../../../../shared/atoms/IconButton';
import { Typography } from '../../../../shared/atoms/Typography';
import { useTranslation } from 'react-i18next';
import { toast } from '../../../../NotificationToast';

type Props = {
  product: Product;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector(state => state.cart);
  const { t } = useTranslation();

  const cartItem = cartItems.find(item => item.itemId === product.itemId);
  const quantity = cartItem?.quantity || 1;

  const removeFromCart = () => {
    dispatch(remove(product));
    toast({
      description: t('notification.remove.cart', {
        name: product.name,
      }),
    });
  };
  const increaseQuantity = () => dispatch(increase(product));
  const decreaseQuantity = () => dispatch(decrease(product));

  return (
    <>
      <div className={styles.cart_item}>
        <div className={styles.cart_item__body}>
          <IconButton
            className={styles.cart_item__close_btn}
            onClick={removeFromCart}
          >
            <Icon
              color="secondary"
              className={styles.cart_item__close_btn__icon}
            >
              <CloseIcon />
            </Icon>
          </IconButton>
          <div className={styles.cart_item__image}>
            <img
              className={styles.cart_item__image_el}
              src={product.image}
              alt={product.name}
            ></img>
          </div>

          <Typography variant="body" className={styles.cart_item__name}>
            {product.name}
          </Typography>
        </div>

        <div className={styles.cart_item__footer}>
          <div className={styles.cart_item__controls}>
            <IconButton
              disabled={quantity === 1}
              onClick={decreaseQuantity}
              className={styles.cart_item__button}
              size="small"
            >
              <Icon>
                <MinusIcon />
              </Icon>
            </IconButton>
            <IconButton
              size="small"
              className={styles.cart_item__count}
              tabIndex={-1}
            >
              <Typography variant="body">{quantity}</Typography>
            </IconButton>
            <IconButton
              onClick={increaseQuantity}
              className={styles.cart_item__button}
              size="small"
            >
              <Icon>
                <PlusIcon />
              </Icon>
            </IconButton>
          </div>

          <Typography variant="h3" tag="h3" className={styles.cart_item__price}>
            {product.price * quantity}
          </Typography>
        </div>
      </div>
    </>
  );
};
