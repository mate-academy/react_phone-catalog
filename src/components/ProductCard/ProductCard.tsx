import React from 'react';
import './productCard.scss';
import { Link } from 'react-router-dom';
import { Phones } from '../../types/Phones';
import { FavoriteButton } from '../FavoriteButton';

type PhoneData = {
  productData: Phones,
  // priceToken: number,
};

export const ProductCard: React.FC<PhoneData> = ({
  productData,
  // priceToken,
}) => {
  const {
    phoneId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = productData;

  return (
    <>
      <div className="card">
        <Link to={`${phoneId}`}>
          <div className="card__imageContainer">
            <img src={`_new/${image}`} alt="card" className="card__image" />
          </div>
          <h2 className="card__item">{name}</h2>

          <div className="card__price">
            <div className="card__price__text">
              $
              {price}
            </div>
            {price && <div className="card__price__sale">{`$${fullPrice}`}</div>}

          </div>

          <div className="card__description">
            <div className="card__description__items">
              <div className="card__description__item">Screen</div>
              <div className="card__description__item">Capacity</div>
              <div className="card__description__item">RAM</div>
            </div>

            <div className="card__description__values">
              <div className="card__description__value">
                {screen}
              </div>
              <div className="card__description__value">
                {ram}
              </div>
              <div className="card__description__value">
                {capacity}
              </div>
            </div>
          </div>
        </Link>
        <div className="card__shopContainer">
          <button type="button" className="card__btn">Add to cart</button>

          {/* <div className="card__favoritesBtn">
          <img
            src={FavoritesImg}
            alt="Favorites"
            className="card__favoritesImg"
          />
        </div> */}
          <FavoriteButton
            // id={id}
            // category={category}
            // phoneId={phoneId}
            // itemId={itemId}
            // name={name}
            // fullPrice={fullPrice}
            // price={price}
            // screen={screen}
            // capacity={capacity}
            // color={color}
            // ram={ram}
            // year={year}
            // image={image}
            cardData={productData}
          />
        </div>
      </div>
    </>
  );
};
