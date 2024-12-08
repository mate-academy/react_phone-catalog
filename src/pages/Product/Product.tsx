import { BackButton } from '../../components/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import './Product.scss';

export const Product = () => {
  return (
    <div className="product">
      <Breadcrumbs
        paths={['Phones', 'Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)']}
      />

      <div className="product__back-button">
        <BackButton />
      </div>

      <h2 className="product__title">
        Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
      </h2>

      <div className="product__container">
        <div className="product__small-images">
          <div className="product__small-images-image square-container">
            <img
              src="/img/phones/apple-iphone-11-pro-max/gold/00.webp"
              alt="Image"
            />
          </div>
          <div className="product__small-images-image square-container">
            <img
              src="/img/phones/apple-iphone-11-pro-max/gold/02.webp"
              alt="Image"
            />
          </div>
        </div>

        <div className="product__image square-container">
          <img
            src="/img/phones/apple-iphone-11-pro-max/gold/00.webp"
            alt="Image"
          />
        </div>

        <div className="product__info">
          <p className="product__info-name small-text">Available colors</p>
          <div className="product__selector-container">
            <div className="product__color-border">
              <div className="product__color"></div>
            </div>
          </div>

          <div className="product__divider-line"></div>

          <p className="product__info-name small-text">Select capacity</p>
          <div className="product__selector-container">
            <button className="product__capacity-button">64 GB</button>
            <button className="product__capacity-button button--white">
              256 GB
            </button>
            <button className="product__capacity-button button--white">
              512 GB
            </button>
          </div>

          <div className="product__divider-line"></div>

          <div className="product__price-container">
            <h2 className="product__price">$799</h2>
            <h3 className="product__old-price">$1199</h3>
          </div>

          <div className="product__buttons">
            <button className="product__cart-button">Add to cart</button>
            <button className="product__favourite-button button--white">
              <img src="/icons/favourite.svg" alt="Favourite icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
