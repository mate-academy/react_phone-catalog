import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Product } from '../../type/Product';
import './ProductCard.scss';
import { BASE_URL } from '../../api';
import { CartContext } from '../CartContext/CartContext';
import { Message } from '../../type/Message';

type Props = {
  product: Product,
  hasDiscount?: boolean
};

export const ProductCart: React.FC<Props> = ({
  product, hasDiscount = true,
}) => {
  const {
    orderedProducts,
    setOrderedProducts,
    setMessage,
    setFavoriteProducts,
    favoriteProducts,
  } = useContext(CartContext);

  const handleAddProduct = () => {
    const isProductInCart = orderedProducts.some(
      item => item.product === product.name,
    );

    setMessage(isProductInCart ? Message.DeleteProduct : Message.AddProduct);

    setOrderedProducts(items => {
      return items.some(item => item.product === product.name)
        ? items.filter(item => item.product !== product.name)
        : [
          ...items,
          {
            id: items.reduce(
              (max, item) => (item.id > max ? item.id : max), 0,
            ) + 1,
            quantity: 1,
            product: product.name,
          },
        ];
    });
  };

  const handleAddFavoritesProducts = () => {
    const isProductInFavorites = favoriteProducts.some(
      item => item.id === product.id,
    );

    setMessage(isProductInFavorites ? Message.Dislike : Message.Like);

    setFavoriteProducts(items => {
      return items.some(item => item.id === product.id)
        ? items.filter(item => item.id !== product.id)
        : [...items, product];
    });
  };

  return (
    <li
      className="product-card"
      key={product.id}
      data-cy="cardsContainer"
    >
      <div className="product-card__image-block">
        <Link
          to={`../../${product.category}/${product.phoneId}`}
          className="product-card__image-link"
        >
          <img
            className="product-card__image"
            src={BASE_URL + product.image}
            alt={product.name}
          />
        </Link>
      </div>
      <div className="product-card__description">
        <Link
          to={`../../${product.category}/${product.phoneId}`}
          className="product-card__title"
        >
          {product.name}
        </Link>

        {
          hasDiscount ? (
            <div className="product-card__prices">
              <div className="product-card__price product-card__price--sale">
                {`$${product.price}`}
              </div>
              <div className="product-card__price product-card__price--full">
                {`$${product.fullPrice}`}
              </div>
            </div>
          ) : (
            <div className="product-card__prices">
              <div className="product-card__price product-card__price--sale">
                {`${product.fullPrice}`}
              </div>
            </div>
          )
        }
        <div className="product-card__info-block">
          <div className="product-card__info">
            <p className="product-card__info-title">Screen</p>
            <p className="product-card__info-text">{product.screen}</p>
          </div>

          <div className="product-card__info">
            <p className="product-card__info-title">Capacity</p>
            <p className="product-card__info-text">{product.capacity}</p>
          </div>

          <div className="product-card__info">
            <p className="product-card__info-title">RAM</p>
            <p className="product-card__info-text">{product.ram}</p>
          </div>
        </div>

        <div className="product-card__buttons">
          <button
            type="button"
            className={cn('product-card__add-to-cart', {
              'product-card__add-to-cart--selected':
                orderedProducts.some(item => item.product === product.name),
            })}
            onClick={handleAddProduct}
          >
            {orderedProducts.some(item => item.product === product.name)
              ? 'Added to cart'
              : 'Add to cart'}
          </button>
          <button
            type="button"
            className="product-card__favourite"
            onClick={handleAddFavoritesProducts}
          >
            <span
              aria-label="Heart Like"
              className={cn('icon', {
                'icon--favourites': !favoriteProducts.some(
                  item => item.id === product.id,
                ),
                'icon--favourites-filled': favoriteProducts.some(
                  item => item.id === product.id,
                ),
              })}
            />
          </button>
        </div>
      </div>
    </li>
  );
};
