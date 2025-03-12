import React from 'react';
import { Product } from '../../types/ProductDetails';
import { NavLink } from 'react-router-dom';
import like from '../../../image/heart.svg';
import './ProductItem.scss';

interface Props {
  product: Product;
  WithAdditionalPrice?: boolean;
  onClick?: () => void;
}

export const ProductItem: React.FC<Props> = ({
  product,
  WithAdditionalPrice = false,
  // onClick,
}) => {
  const productPath = `/${product.category}/${product.itemId}`;

  return (
    <NavLink
      to={productPath}
      className="product__elements"
      // onClick={onClick}
    >
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
        <NavLink className="button__add" to="/...">
          Add to cart
        </NavLink>
        <NavLink className="buttons__like" to="/?">
          <img src={like} alt="like" />
        </NavLink>
      </div>
    </NavLink>
  );
};
