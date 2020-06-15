import React from 'react';


type Props = { product: Product };

const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    name, imageUrl, price, discount, screen, capacity, ram,
  } = product;
  const priceWithDiscount = (price - (price * (discount / 100)));

  return (

    <>

      <img
        src={`./${imageUrl}`}
        alt={name}
        className="ProductCard__img"
      />
      <h3 className="ProductCard__name">{name}</h3>
      <div className="ProductCard__price">
        <span className="ProductCard__price--withDiscount">
          {' '}
          $
          {priceWithDiscount}
        </span>
        <span className="ProductCard__price--withoutDiscount">
          {' '}
          $
          {price}
        </span>
      </div>
      <ul className="ProductCard__description">
        <li className="ProductCard__element">
          <p>Screen:</p>
          <p className="ProductCard__title">{screen}</p>
        </li>
        <li className="ProductCard__element">
          <p>Capacity:</p>
          <p className="ProductCard__title">{capacity}</p>
        </li>
        <li className="ProductCard__element">
          <p>RAM:</p>
          <p className="ProductCard__title">{ram}</p>
        </li>
      </ul>

      <div className="ProductCard__button">
        <button type="button" className="ProductCard__button--cart">
          Add to cart
        </button>
        <button type="button" className="ProductCard__button--favorites">
          <img src="../img/icons/Favorites.svg" alt="favorites" className="ProductCard__icons--img" />
        </button>

      </div>
    </>

  );
};

export default ProductCard;
