import React from 'react';
import { Product } from '../../types/Product';
import './ProductCard.module.scss';
import { actions as cartActions } from '../../utils/cart';
import { actions as favActions } from '../../utils/favourites';
import { Loader } from '../Loader';
import { UseAppDispatch, useAppSelector } from '../../utils/store';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
  key: string;
  isLoading?: boolean;
  slider?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  isLoading,
  slider = false,
}) => {
  const dispatch = UseAppDispatch();

  const cart = useAppSelector(state => state.cart);
  const addToCart = () => dispatch(cartActions.addItem(product));
  const takeFromCart = () => dispatch(cartActions.takeItems(product));

  const favourites = useAppSelector(state => state.favourites);
  const addToFav = () => dispatch(favActions.addItem(product));
  const takeFromFav = () => dispatch(favActions.takeItem(product));

  const category = product.category;

  return isLoading ? (
    <Loader />
  ) : (
    <div
      className="product__card"
      key={product.id}
      style={{ gridRow: slider ? '1 / -1' : 'unset' }}
    >
      <Link to={`../../${category}/${product.itemId}`} state={product}>
        <img src={product.image} alt="image" className="product__card__image" />
      </Link>
      <Link
        to={`../../${category}/${product.itemId}`}
        className="product__card__title"
        state={product}
      >
        {product.name}
      </Link>
      <div className="product__card__price">
        <h2 className="product__card__price__discount price">
          ${product.price}
        </h2>
        <h2 className="product__card__price__regular price">
          ${product.fullPrice}
        </h2>
      </div>
      <div className="product__card__description">
        <div className="product__card__chars">
          <h3 className="product__card__chars__title">Screen</h3>
          <p className="product__card__chars__value">{product.screen}</p>
        </div>

        <div className="product__card__chars">
          <h3 className="product__card__chars__title">Capacity</h3>
          <p className="product__card__chars__value">{product.capacity}</p>
        </div>

        <div className="product__card__chars">
          <h3 className="product__card__chars__title">RAM</h3>
          <p className="product__card__chars__value">{product.ram}</p>
        </div>
        <div className="product__card__chars">
          <h3 className="year">{product.year}</h3>
        </div>
      </div>
      <div className="card__buttons">
        {cart.some(el => el.id === product.id) === true ? (
          <button className="add__button added" onClick={takeFromCart}>
            Added
          </button>
        ) : (
          <button className="add__button" onClick={addToCart}>
            Add to cart
          </button>
        )}

        {favourites.some(el => el.id === product.id) === true ? (
          <button className="fav__button selected" onClick={takeFromFav}>
            <div className="favourites__icon is-filled"></div>
          </button>
        ) : (
          <button className="fav__button" onClick={addToFav}>
            <div className="favourites__icon"></div>
          </button>
        )}
      </div>
    </div>
  );
};
