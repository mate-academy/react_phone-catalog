import React from 'react';
import { ProductDetails } from '../../types/ProductTypes';
import { NavLink, useNavigate } from 'react-router-dom';
import like from '../../../image/heart.svg';
import liked from '../../../image/liked.svg';

import './ProductItem.scss';
import { useFavourites } from '../Favourites/FacouritesContext';

interface Props {
  product: ProductDetails;
  WithAdditionalPrice?: boolean;
  // onClick?: () => void;
}

export const ProductItem: React.FC<Props> = ({
  product,
  WithAdditionalPrice = false,
}) => {
  const { favorites, toggleFavorite } = useFavourites();
  const isFavorite = favorites.some(fav => fav.id === product.id);
  const productPath = `/${product.category}/${product.id}`;
  const navigate = useNavigate();

  return (
    <div
      // to={productPath}
      className="product__elements"
      onClick={() => navigate(productPath)}
    >
      <div className="product__img-container">
        <img
          src={product.images[0]}
          alt={`${product.category} image`}
          className="product__image"
        />
      </div>

      <h3 className="product__name">{product.name}</h3>
      <div className="product__discount">
        <h3 className="product__price">{`$ ${product.priceRegular}`}</h3>
        {WithAdditionalPrice && (
          <h3 className="product__fullprice">{`$ ${product.priceDiscount}`}</h3>
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
        <NavLink className="button__add" to="/...">
          Add to cart
        </NavLink>
        <button
          className="buttons__like"
          onClick={() => toggleFavorite(product)}
        >
          <img src={isFavorite ? liked : like} alt="like" />
        </button>
      </div>
    </div>
  );
};
