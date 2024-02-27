/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import { useCallback } from 'react';

import { ICartItem, IProduct } from '../../types';
import { getCategoryName } from '../../utils';
import * as cartActions from '../../slices/cartSlice';
import * as favouritesActions from '../../slices/favouritesSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { TechSpecs } from '../TechSpecs/TechSpecs';
import { BuyButtons } from '../BuyButtons/BuyButtons';
import { Price } from '../Price';

import './ProductCard.scss';

type Props = {
  product: IProduct,
};

export const ProductCard: React.FC<Props> = ({
  product,
}) => {
  const {
    id,
    name,
    type,
    imageUrl,
    price,
    discount,
    ram,
    capacity,
    screen,
  } = product;
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector(state => state.cartItems);
  const { favouritesItems } = useAppSelector(state => state.favouritesItems);
  const categoryName = getCategoryName(type);
  const link = `/${categoryName}/${id}`;

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
      dispatch(favouritesActions.deleteItem(product.id));
    } else {
      dispatch(favouritesActions.addItem(product));
    }
  }, [dispatch, hasInFavourites, product]);

  return (
    <div className="product-card">
      <Link
        to={link}
        className="product-card__photo-link"
      >
        <img
          src={`${imageUrl}`}
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
        discount={discount}
        price={price}
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
