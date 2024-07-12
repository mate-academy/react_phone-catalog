import React, { useContext } from 'react';
import { CartProduct } from '../../../../types/Product';
import { GlobalContext } from '../../../../GlobalContext';
import { Icon } from '../../../../components/Icon';
import { IconList } from '../../../../components/Icon/styles/IconList';
import { AmountButton } from '../AmountButton';
import { Link } from 'react-router-dom';
import classes from './CartItem.module.scss';

type Amount = 'incr' | 'decr';
type Props = {
  product: CartProduct;
};

const MAX_PRODUCTS = 10;

export const CartItem: React.FC<Props> = ({ product }) => {
  const { image, name, price, amount } = product;
  const { dispatch, cart } = useContext(GlobalContext);

  const removeFromCart = () => {
    dispatch({ type: 'DELETE_FROM_CART', payload: product });
  };

  const handleUpdateAmount = (value: Amount) => {
    const newCart = [...cart].map(item => {
      const newItem = { ...item };

      if (item.itemId === product.itemId) {
        if (value === 'incr') {
          newItem.amount++;
        } else {
          newItem.amount--;
        }
      }

      return newItem;
    });

    dispatch({ type: 'UPDATE_AMOUNT', payload: newCart });
  };

  return (
    <article className={classes.CartItem}>
      <div className={classes.CartItem__container}>
        <button
          className={classes.CartItem__remove}
          type="button"
          onClick={removeFromCart}
        >
          <img src="img/icons/Close-grey.svg" alt="Remove" />
        </button>

        <Link
          className={classes.CartItem__link}
          to={`/${product.category}/${product.id}`}
          title="More details"
        >
          <div className={classes['CartItem__img-wrapper']}>
            <img className={classes.CartItem__image} src={image} alt={name} />
          </div>

          <h5 className={classes.CartItem__title}>{name}</h5>
        </Link>
      </div>

      <div className={classes.CartItem__container}>
        <div className={classes['CartItem__quantity-wrapper']}>
          <AmountButton
            active={amount > 1}
            onClick={() => handleUpdateAmount('decr')}
          >
            {amount > 1 ? (
              <Icon icon={IconList.minus} />
            ) : (
              <Icon icon={IconList.minusDisabled} />
            )}
          </AmountButton>

          <span className={classes.CartItem__quantity}>{amount}</span>

          <AmountButton
            active={amount < MAX_PRODUCTS}
            onClick={() => handleUpdateAmount('incr')}
          >
            {amount < MAX_PRODUCTS ? (
              <Icon icon={IconList.plus} />
            ) : (
              <Icon icon={IconList.plusDisabled} />
            )}
          </AmountButton>
        </div>
        <p className={classes.CartItem__price}>{`$${price}`}</p>
      </div>
    </article>
  );
};
