import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import {
  addQuantity,
  removeFromCard,
  subtractQuantity,
} from '../../features/cartSlice';
import { useAppDispatch } from '../../app/hooks';
import { Button } from '../Button/Button';
import { Product } from '../../types/Product';

import './CartItem.scss';

type Props = {
  product: Product;
};

export const CartItem: FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  const {
    id,
    itemId,
    category,
    quantity,
    image,
    name,
    price,
  } = product;

  const isQuantityOne = useMemo(() => quantity === 1, [quantity]);

  return (
    <div className="cartItem">
      <Button
        dataCy="cartDeleteButton"
        className="delete"
        iconType="remove"
        onClick={() => dispatch(removeFromCard(product))}
      />

      <Link
        to={`/${category}/${itemId}`}
        className="cartItem__link"
      >
        <img
          src={`new/${image}`}
          alt={name}
          className="cartItem__img"
        />
        {name}
      </Link>

      <div className="cartItem__container">
        <div className="cartItem__count">
          <Button
            className={classNames('subtract-quantity', {
              'button--subtract-quantity--disabled': isQuantityOne,
            })}
            iconType={isQuantityOne ? 'minus-disabled' : 'minus'}
            disabled={isQuantityOne}
            onClick={() => dispatch(subtractQuantity(id))}
          />
          <p className="cartItem__quantity">{quantity}</p>
          <Button
            className="add-quantity"
            iconType="plus"
            onClick={() => dispatch(addQuantity(id))}
          />
        </div>

        <p className="cartItem__price-regular">{`$${price * quantity}`}</p>
      </div>
    </div>
  );
};
