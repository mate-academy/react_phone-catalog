import React, { useContext } from 'react';
import './productCard.scss';
import { Link } from 'react-router-dom';
import { FavoriteButton } from '../FavoriteButton';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';
import { Products } from '../../types/Products';
import { CategoryContext } from '../ContextProviders/ContextProviders';

type ProductData = {
  productData: Products;
};

export const ProductCard: React.FC<ProductData> = ({ productData }) => {
  const {
    itemId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
    category,
  } = productData;

  const { setCategoryType } = useContext(CategoryContext);

  return (
    <>
      <div className="card">
        <Link
          to={`/${category}/${itemId}`}
          onClick={() => setCategoryType(category)}
        >
          <div className="card__imageContainer">
            <img src={`${image}`} alt="card" className="card__image" />
          </div>
          <h2 className="card__item">{name}</h2>

          <div className="card__price">
            <div className="card__price__text">${price}</div>
            {price && (
              <div className="card__price__sale">{`$${fullPrice}`}</div>
            )}
          </div>

          <div className="card__description">
            <div className="card__description__items">
              <div className="card__description__item">Screen</div>
              <div className="card__description__item">Capacity</div>
              <div className="card__description__item">RAM</div>
            </div>

            <div className="card__description__values">
              <div className="card__description__value">{screen}</div>
              <div className="card__description__value">{ram}</div>
              <div className="card__description__value">{capacity}</div>
            </div>
          </div>
        </Link>
        <div className="card__shopContainer">
          <AddToCartButton cardData={productData} />
          <FavoriteButton cardData={productData} />
        </div>
      </div>
    </>
  );
};
