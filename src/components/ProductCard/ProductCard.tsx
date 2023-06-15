import React from 'react';
import './productCard.scss';
import { Phones } from '../../types/Phones';
import FavoritesImg from '../../images/icons/Favourites (Heart Like).svg';

type PhoneData = {
  productData: Phones,
  priceToken: number,
};

export const ProductCard: React.FC<PhoneData> = ({
  productData,
  priceToken,
}) => {
  return (
    <div className="card">
      <div className="card__imageContainer">
        <img src={productData?.image} alt="card" className="card__image" />
      </div>
      <h2 className="card__item">{productData?.name}</h2>

      <div className="card__price">
        <div className="card__price__text">
          $
          {productData?.fullPrice}
        </div>
        {priceToken && <div className="card__price__sale">{`$${priceToken}`}</div>}

      </div>

      <div className="card__description">
        <div className="card__description__items">
          <div className="card__description__item">Screen</div>
          <div className="card__description__item">Capacity</div>
          <div className="card__description__item">RAM</div>
        </div>

        <div className="card__description__values">
          <div className="card__description__value">
            {productData?.screen}
          </div>
          <div className="card__description__value">
            {productData?.ram}
          </div>
          <div className="card__description__value">
            {productData?.capacity}
          </div>
        </div>
      </div>

      <div className="card__shopContainer">
        <button type="button" className="card__btn">Add to cart</button>

        <div className="card__favoritesBtn">
          {/* <img src={FavoritesIcon} alt="favorites button" className='card__favoritesImg' /> */}
          <img
            src={FavoritesImg}
            alt="Favorites"
            className="card__favoritesImg"
          />
        </div>

      </div>
    </div>
  );
};
