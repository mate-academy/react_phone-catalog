/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';

import { ICartItem, IProduct } from '../../types';
import { getCategoryName } from '../../utils';
import * as cartActions from '../../slices/cartSlice';
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
  const { items } = useAppSelector(state => state.cartItems);
  const categoryName = getCategoryName(type);
  const link = `/${categoryName}/${id}`;

  const hasInCart = !!items.find(item => item.product.id === id);

  const handleAddToCart = () => {
    const cartItem: ICartItem = {
      id: String(new Date().valueOf()),
      quantity: 1,
      product,
    };

    dispatch(cartActions.addItem(cartItem));
  };

  // const handleAdd = handleAddToCart(product, dispatch, cartActions.addItem);

  const handleAddToFavorites = () => {
    // dispatch(cartActions.addItem(cartItem))
  };

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
      />
    </div>
  );
};
