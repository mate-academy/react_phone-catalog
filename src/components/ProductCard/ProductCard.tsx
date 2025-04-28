import './ProductCard.scss';
import React from 'react';
import { IoHeartOutline } from 'react-icons/io5';

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  fullPrice,
  screen,
  capacity,
  ram,
}) => (
  <div className="card custom-padding" data-cy="Movie">
    <div className="card-image">
      <figure className="image is-4by3">
        <img data-cy="MovieImage" src={image} alt="Product photo" />
      </figure>
    </div>

    <div className="card-content">
      <div className="media-content ">
        <h2 className="title is-8">{name}</h2>
        <p className="product__price">
          <span className="new__price">${price}</span>
          <span className="old__price">${fullPrice}</span>
        </p>
        <hr />
        <p className="product__info">
          <span className="feature">Screen:</span>
          <span className="feature__info">{screen}</span>
        </p>
        <p className="product__info">
          <span className="feature">Capacity:</span>
          <span className="feature__info">{capacity}</span>
        </p>
        <p className="product__info">
          <span className="feature">RAM:</span>
          <span className="feature__info">{ram}</span>
        </p>
      </div>

      <div className="buttons">
        <button className="addButton">Add to cart</button>
        <button className="icon__heart">
          {/* <div className="icon__heart"> */}
          <IoHeartOutline />
        </button>
      </div>
    </div>
  </div>
);
