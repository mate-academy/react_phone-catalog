/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useCallback } from 'react';

import { ICartItem, IProduct } from '../../types';
import * as cartActions from '../../slices/cartSlice';
import * as favouritesActions from '../../slices/favouritesSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { TechSpecs } from '../TechSpecs/TechSpecs';
import { BuyButtons } from '../BuyButtons/BuyButtons';
import { Price } from '../Price';

import './ProductCard.scss';

type Props = {
  classNames?: string,
  product: IProduct,
};

export const ProductCard: React.FC<Props> = ({
  product,
  classNames,
}) => {
  const {
    capacity,
    category,
    fullPrice,
    id,
    image,
    itemId,
    name,
    price,
    ram,
    screen,
  } = product;
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector(state => state.cartItems);
  const { favouritesItems } = useAppSelector(state => state.favouritesItems);
  const link = `/${category}/${id}`;

  const currentCartItem = cartItems.find(item => item.product.id === id);
  const hasInCart = !!currentCartItem;
  const hasInFavourites = !!favouritesItems.find(item => item.id === id);

  const handleAddToCart = useCallback(() => {
    if (hasInCart) {
      dispatch(cartActions.deleteItem(currentCartItem.id));
    } else {
      const cartItem: ICartItem = {
        id: String(new Date().valueOf()),
        quantity: 1,
        product,
      };

      dispatch(cartActions.addItem(cartItem));
    }
  }, [dispatch, product, hasInCart, currentCartItem]);

  const handleAddToFavorites = useCallback(() => {
    if (hasInFavourites) {
      dispatch(favouritesActions.deleteItem(itemId));
    } else {
      dispatch(favouritesActions.addItem(product));
    }
  }, [dispatch, hasInFavourites, product, itemId]);

  return (
    <div
      className={cn('product-card', classNames)}
    >
      <Link
        to={link}
        className="product-card__photo-link"
      >
        <img
          src={`${image}`}
          alt={name}
          className="product-card__photo"
        />
      </Link>

      <Link
        to={link}
        className="product-card__title"
      >
        {name}
      </Link>

      <Price
        discountPrice={price}
        fullPrice={fullPrice}
        classNames="product-card__price"
      />
      <TechSpecs
        classNames="product-card__details"
        hasBorder
        specs={
          {
            screen,
            capacity,
            ram,
          }
        }
      />
      <BuyButtons
        classNames="product-card__buttons"
        add={handleAddToCart}
        isAddButtonSelected={hasInCart}
        like={handleAddToFavorites}
        isFavoriteButtonSelected={hasInFavourites}
      />
    </div>
  );
};
