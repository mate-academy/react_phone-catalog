import React, { useMemo } from 'react';
import './Card.scss';
import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames/bind';

import { setCart, removeFromCart } from '../../store/cart';
import { getItems } from '../../store/index';
import ButtonFavor from '../ButtonFavor/ButtonFavor';


type Props = {
  product: Product;
};

export const Card: React.FC<Props> = ({ product }) => {
  const {
    imageUrl,
    name,
    price,
    discount,
    screen,
    capacity,
    ram,
    id,
  } = product;

  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const itemsCart = useSelector(getItems);

  const isInCart = useMemo(() => (
    itemsCart.some(itemCart => itemCart.product.id === product.id)
  ), [itemsCart, product]);


  const addToCart = (productCart: Product) => {
    if (!isInCart) {
      dispatch(setCart(productCart));
    } else {
      dispatch(removeFromCart(productCart));
    }
  };

  return (
    <div className="Wrap">
      <article className="Card">
        <Link to={`${path}/${id}`}>
          <img alt="card" src={imageUrl} className="Card__Img" />
        </Link>
        <div className="Card__ContainerInner">
          <Link to={`${path}/${id}`}>
            <h3 className="Card__Title">{name}</h3>
          </Link>
          <span className="Card__Prise">
            $
            {(price - price * (discount / 100))}
          </span>
          {' '}
          {discount !== 0
            && (
              <span className="Card__OldPrise">
                $
                {price}
              </span>
            )}
          <div className="Card__Info">
            <div className="Card__InfoScreen Card__Item">
              <p className="Card__InfoScreen_Name">Screen</p>
              <p className="Card__InfoScreen_Value">{screen}</p>
            </div>
            <div className="Card__InfoScreen Card__Item">
              <p className="Card__InfoScreen_Name">Capacity</p>
              <p className="Card__InfoScreen_Value">{capacity}</p>
            </div>
            <div className="Card__InfoScreen Card__Item">
              <p className="Card__InfoScreen_Name">RAM</p>
              <p className="Card__InfoScreen_Value">{ram}</p>
            </div>
          </div>
          <div className="Card__ButtonWrap">
            <button
              type="button"
              className={cn('Card__ButtonCart', {
                'Card__ButtonCart--isInCart': isInCart,
              })}
              onClick={() => addToCart(product)}

            >
              {!isInCart ? 'Add to cart' : 'Remove from cart'}
            </button>
            <ButtonFavor product={product} />
          </div>
        </div>
      </article>
    </div>
  );
};
