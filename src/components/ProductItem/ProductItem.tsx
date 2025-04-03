import React, { useEffect, useState } from 'react';
import { Product } from '../../types/ProductTypes';
import { useNavigate } from 'react-router-dom';
import like from '../../../image/heart.svg';
import liked from '../../../image/liked.svg';

import './ProductItem.scss';
import { useFavourites } from '../Favourites/FacouritesContext';
import { useCart } from '../BuyCard/CartContext';

interface Props {
  product: Product;
  WithAdditionalPrice?: boolean;
  onClick?: () => void;
}

export const ProductItem: React.FC<Props> = ({
  product,
  WithAdditionalPrice = false,
}) => {
  const { favorites, toggleFavorite } = useFavourites();
  const isFavorite = favorites.some(fav => fav.itemId === product.itemId);
  const productPath = `/${product.category}/${product.itemId}`;
  const navigate = useNavigate();
  const { toggleCart } = useCart();

  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const isProductInCart = savedCart.some(
      (item: Product) => item.id === product.id,
    );

    setIsAdded(isProductInCart);
  }, [product.id]);

  const handleToggleCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const isProductInCart = savedCart.some(
      (item: Product) => item.id === product.id,
    );

    let updatedCart;

    if (isProductInCart) {
      updatedCart = savedCart.filter((item: Product) => item.id !== product.id);
    } else {
      updatedCart = [...savedCart, product];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toggleCart(product);
    setIsAdded(!isProductInCart);
  };

  return (
    <div className="product__elements" onClick={() => navigate(productPath)}>
      <div className="product__img-container">
        <img
          src={product.image}
          alt={`${product.category} image`}
          className="product__image"
        />
      </div>

      <h3 className="product__name">{product.name}</h3>
      <div className="product__discount">
        <h3 className="product__price">{`$ ${product.price}`}</h3>
        {WithAdditionalPrice && (
          <h3 className="product__fullprice">{`$ ${product.fullPrice}`}</h3>
        )}
      </div>

      <div className="product__line"></div>
      <div className="product__information">
        <div className="product__informationAll">
          <h3 className="product__screenTitle">Screen</h3>
          <h3 className="product__screenDescription">{product.screen}</h3>
        </div>

        <div className="product__informationAll">
          <h3 className="product__screenTitle">Capacity</h3>
          <h3 className="product__screenDescription">{product.capacity}</h3>
        </div>

        <div className="product__informationAll">
          <h3 className="product__screenTitle">RAM</h3>
          <h3 className="product__screenDescription">{product.ram}</h3>
        </div>
      </div>

      <div className="buttons">
        <button className="button__add" onClick={handleToggleCart}>
          {isAdded ? 'Added' : 'Add to cart'}
        </button>
        <button
          className="buttons__like"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            toggleFavorite(product);
          }}
        >
          <img src={isFavorite ? liked : like} alt="like" />
        </button>
      </div>
    </div>
  );
};
