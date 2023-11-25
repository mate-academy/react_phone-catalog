import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import classNames from 'classnames';
import { Product } from '../../Types/Product';
import { getDiscountPrice } from '../../helpers/getDiscountPrice';
import './ProductCard.scss';
import favorites from '../../icons/Favourites.svg';
import favorites_red from '../../icons/Favourites_red.svg';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { addItems } from '../../features/cart/cartSlice';
import {
  addToFavorites,
} from '../../features/favourites/favourites';
import { useGetProductDetailsQuery } from '../../features/product/productSlice';

type Props = {
  product: Product;
};

const ProductCard:React.FC<Props> = ({ product }) => {
  const newPrice = getDiscountPrice(product);
  const dispatch = useAppDispatch();
  const favorite = useAppSelector(state => state.favorites.items);
  const cart = useAppSelector(state => state.cart.items);
  const [isInCart, setIsInCart] = useState(false);
  const [isInFavorites, setisinFavorites] = useState(false);

  const { data: productSingle } = useGetProductDetailsQuery(product.id);

  const findFavorite = useMemo(() => favorite.some(
    item => item.id === product.id,
  ), [favorite]);

  const findInCart = useMemo(() => cart.some(
    item => item.id === product.id,
  ), [cart]);

  const onAddToCard = () => {
    setIsInCart(true);
    const item = {
      id: product?.id,
      title: product?.name,
      imageUrl: product?.imageUrl,
      price: newPrice,
      color: 'Biege',
      capasity: 64,
    };

    dispatch(addItems(item));
  };

  const onAddToFavorites = () => {
    setisinFavorites(true);
    dispatch(addToFavorites(product));
    setisinFavorites(false);
  };

  return (
    <div
      data-cy="cardContainer"
      className="productCard"
    >
      <div className="productCard__link-container">
        <div className="productCard__img-container">
          <Link
            to={`/${product.type}s/${product.id}`}
          >
            <img
              src={product.imageUrl}
              alt="img"
              className="productCard__img"
            />
            <img
              className="second-img"
              alt="img"
              src={productSingle?.images[1]}
            />
          </Link>
        </div>
        <Link
          to={`/${product.type}s/${product.id}`}
        >
          <span className="productCard__name">
            {product.name}
          </span>
        </Link>
      </div>
      <div className="productCard__price-container">
        {product.discount ? (
          <>
            <div className="productCard__price">{`$${newPrice}`}</div>
            <div className="productCard__price productCard__price-crossed">{`$${product.price}`}</div>
          </>
        ) : (
          <div className="productCard__price">{`$${product.price}`}</div>
        )}
      </div>
      <div className="productCard__line" />
      <div className="productCard__options">
        <div className="productCard__options-list">
          <span className="productCard__options-name">Screen</span>
          <span className="productCard__options-name">Capacity</span>
          <span className="productCard__options-name">Ram</span>
        </div>
        <div className="productCard__options-list">
          <span className="productCard__options-value">{product.screen}</span>
          <span className="productCard__options-value">{product.capacity}</span>
          <span className="productCard__options-value">{product.ram}</span>
        </div>
      </div>
      <div className="productCard__buttons">
        <button
          type="button"
          className={classNames('productCard__button-add', {
            'productCard__button-add--active': findInCart,
          })}
          onClick={onAddToCard}
        >
          {!isInCart && !findInCart ? ('Add to cart') : ('Added to cart')}
        </button>
        <button
          type="button"
          data-cy="addToFavorite"
          className="productCard__button-favorite"
          onClick={onAddToFavorites}
        >
          {!isInFavorites && !findFavorite ? (
            <img src={favorites} alt="" className="icon" />
          ) : (
            <img src={favorites_red} alt="" className="icon" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
