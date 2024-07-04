import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import './ProductCard.scss';
import { NavLink, useOutletContext } from 'react-router-dom';
import { Product } from '../../types/Product';
import { scrollToTop } from '../../api/fetchClient';
import { ItemsContext } from '../../ItemsContext';

type Props = {
  product: Product;
  discount: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, discount }) => {
  const {
    name,
    category,
    itemId,
    image,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = product;

  const {
    favoriteProducts,
    setFavoriteProducts,
    setItems,
    setAllPrices,
    items,
  } = useContext(ItemsContext);

  const [isFavorite, setIsFavorite] = useState(false);

  const [isSelected, setIsSelected] = useState(false);

  const darkTheme = useOutletContext<boolean>();

  const currentProductFavorite = favoriteProducts.find(
    item => item.id === product.id,
  );

  const currentProductInCart = items.find(item => item.id === product.id);

  useEffect(() => {
    if (currentProductFavorite?.id === product.id) {
      setIsFavorite(true);
    }
  }, [currentProductFavorite, product.id]);

  useEffect(() => {
    if (currentProductInCart?.id === product.id) {
      setIsSelected(true);
    }
  }, [currentProductInCart, product.id]);

  const handleAddToCart = (
    newSelectedProduct: Product,
    isProductSelected: boolean,
  ) => {
    if (!isProductSelected) {
      setIsSelected(true);
      setItems(currentItems => [
        ...currentItems,
        { product: newSelectedProduct, id: newSelectedProduct.id, quantity: 1 },
      ]);

      setAllPrices(currentPrices => [
        ...currentPrices,
        {
          id: newSelectedProduct.id,
          sum: newSelectedProduct.price,
        },
      ]);

      setIsSelected(true);
    }
  };

  const handleAddToFavorites = (
    newFavoriteProduct: Product,
    isProductFavorite: boolean,
  ) => {
    setIsFavorite(!isProductFavorite);

    if (isProductFavorite) {
      setFavoriteProducts(currentFavoriteProducts =>
        currentFavoriteProducts.filter(
          currentProduct => currentProduct.id !== newFavoriteProduct.id,
        ),
      );
    } else {
      setFavoriteProducts(currentFavoriteProducts => [
        ...currentFavoriteProducts,
        newFavoriteProduct,
      ]);
    }
  };

  return (
    <div
      className={cn('product-card', {
        'product-card--dark-theme': darkTheme,
      })}
    >
      <NavLink
        to={`/${category}/${itemId}`}
        className="product-card__image"
        onClick={scrollToTop}
      >
        <img src={image} alt="Image" />
      </NavLink>

      <NavLink
        to={`/${category}/${itemId}`}
        className="product-card__name"
        onClick={scrollToTop}
      >
        {name}
      </NavLink>

      <div className="product-card__price">
        {discount && price ? (
          <>
            <p className="product-card__discount-price">{`$${price}`}</p>
            <p className="product-card__full-price">{`$${fullPrice}`}</p>
          </>
        ) : (
          <p>{`$${fullPrice}`}</p>
        )}
      </div>

      <div className="product-card__divider"></div>

      <div
        className="product-card__product-info
        product-info product-info--short"
      >
        <div className="product-info__item">
          <p className="product-info__text">Screen</p>
          <p className="product-info__value">{screen}</p>
        </div>
        <div className="product-info__item">
          <p className="product-info__text">Capacity</p>
          <p className="product-info__value">{capacity}</p>
        </div>
        <div className="product-info__item">
          <p className="product-info__text">Ram</p>
          <p className="product-info__value">{ram}</p>
        </div>
      </div>

      <div className="product-card__actions actions">
        {isSelected ? (
          <button
            type="button"
            className={cn('actions__add-to-cart-button add-to-cart-button', {
              'add-to-cart-button--selected': isSelected,
            })}
          >
            Added
          </button>
        ) : (
          <button
            type="button"
            className={cn('actions__add-to-cart-button add-to-cart-button', {
              'add-to-cart-button--selected': isSelected,
            })}
            onClick={() => handleAddToCart(product, isSelected)}
          >
            Add to cart
          </button>
        )}

        <button
          type="button"
          className={cn('actions__button button icon-favorites', {
            'icon-favorites-filled button--selected': isFavorite,
            'icon-favorites--dark-theme': darkTheme,
          })}
          onClick={() => handleAddToFavorites(product, isFavorite)}
        ></button>
      </div>
    </div>
  );
};
