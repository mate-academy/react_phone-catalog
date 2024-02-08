import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import './CartProductItem.scss';
import { CartProduct } from '../../../definitions/types/Product';
import Placeholder from '../../UI/Placeholder';
import Counter from '../../UI/Counter';
import { BASE_URL } from './../../../utils/fetchHelper';
import { useDirection } from '../../../enhancers/hooks/direction';
import { Link } from 'react-router-dom';

interface Props {
  product: CartProduct | null,
  onRemove: () => void,
  onAmountDecrease?: (newAmount: number) => void,
  onAmountIncrease?: (newAmount: number) => void,
}

export const CartProductItem: React.FC<Props> = memo(({
  product,
  onRemove,
  onAmountDecrease = () => { },
  onAmountIncrease,
}) => {
  const direction = useDirection();
  const [animate, setAnimate] = useState(false);
  const itemRef = useRef<HTMLElement>(null)

  if (product === null) {
    return <Placeholder height='128px' />
  }

  useEffect(() => {
    if (animate) {
      itemRef.current?.classList.add('cart-product-item--unmount');
    } else {
      itemRef.current?.classList.remove('cart-product-item--unmount');
    }
  }, [animate]);

  const removeProduct = () => {
    setAnimate(true);

    setTimeout(() => {
      onRemove();
      setAnimate(false);
    }, 300);
  };

  const decreaseAmount = useCallback((newAmount: number) => {
    if (newAmount <= 0) {
      removeProduct();
    } else {
      onAmountDecrease(newAmount);
    }
  }, [onAmountDecrease]);

  const { name, amount, price, image, id, category } = product;

  return (
    <article className='cart-product-item' ref={itemRef}>
      <div className="cart-product-item__left">
        <button
          onClick={removeProduct}
          className='cart-product-item__close-button'
        >
          <img
            className='cart-product-item__close-icon'
            src="/img/icons/close-icon.svg"
            alt=""
          />
        </button>

        <Link to={direction(`/${category}/${id}`)} className="cart-product-item__image-block">
          <img
            src={`${BASE_URL}/${image}`}
            alt={`product ${name} photo`}
            className='cart-product-item__image'
          />
        </Link>

        <Link to={direction(`/${category}/${id}`)} className='cart-product-item__name'>{
          name}
        </Link>
      </div>

      <div className="cart-product-item__right">
        <Counter
          initialCount={amount}
          onIncrease={onAmountIncrease}
          onDecrease={decreaseAmount}
          min={0}
          max={100}
        />

        <div className="cart-product-item__price-block">
          <p className='cart-product-item__summary-price'>
            ${amount * price}
          </p>

          <p className='cart-product-item__price'>
            <span>Item:</span> ${price}
          </p>
        </div>
      </div>
    </article>
  );
});
