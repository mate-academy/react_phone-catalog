import React from 'react';

const ProductCard = () => {
  return (
    <section className="ProductCard">
      <img src="./img/phones/motorola-atrix-4g.3.jpg" alt="phone_image" className="ProductCard__image" />
      <p className="ProductCard__product">Apple iPhone Xs 64GB Silver (iMT9G2FS/A)</p>

      <div className="ProductCard__price-container">
        <h2 className="ProductCard__price">$999</h2>
        <h2 className="ProductCard__price-discount">$999</h2>
      </div>
      <p className="ProductCard__style-line" />
      <div className="ProductCard__text-container">
        <div className="ProductCard__text-module">
          <p className="ProductCard__title">screen</p>
          <p className="ProductCard__item">5.8&ldquo OLED</p>
        </div>
        <div className="ProductCard__text-module">
          <p className="ProductCard__title">capacity</p>
          <p className="ProductCard__item">64mb</p>
        </div>
        <div className="ProductCard__text-module">
          <p className="ProductCard__title">RAM</p>
          <p className="ProductCard__item">4gb</p>
        </div>
      </div>
      <div className="ProductCard__buttons-container">
        <button className="ProductCard__button button">
          Add to card
        </button>
        <button className="ProductCard__favorits-button button">
          <img src="./img/heart.svg" alt="heart_icon" className="ProductCard__favorits-image" />
        </button>
      </div>
    </section>

  );
};

export default ProductCard;
