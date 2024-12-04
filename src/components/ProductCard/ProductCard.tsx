import './ProductCard.scss';

export const ProductCard = () => {
  return (
    <div className="product-card">
      <img
        src="/img/phones/apple-iphone-14/midnight/00.webp"
        alt="Iphone 14 photo"
        className="product-card__image"
      />

      <div className="product-card__container">
        <p className="product-card__title body-text">
          Apple iPhone 14 Pro 128GB Silver (MQ023)
        </p>
        <h3 className="product-card__price">$999</h3>

        <div className="product-card__line"></div>

        <div className="product-card__specs">
          <div className="product-card__specs-entry">
            <p className="product-card__specs-name small-text">Screen</p>
            <p className="product-card__specs-value small-text">6.1” OLED</p>
          </div>
          <div className="product-card__specs-entry">
            <p className="product-card__specs-name small-text">Capacity</p>
            <p className="product-card__specs-value small-text">128 GB</p>
          </div>
          <div className="product-card__specs-entry">
            <p className="product-card__specs-name small-text">RAM</p>
            <p className="product-card__specs-value small-text">6 GB</p>
          </div>
        </div>

        <div className="product-card__buttons">
          <button>Add to cart</button>
          <button className="button--white">
            <img src="/icons/favourite.svg" alt="Favourite icon" />
          </button>
        </div>
      </div>
    </div>
  );
};
