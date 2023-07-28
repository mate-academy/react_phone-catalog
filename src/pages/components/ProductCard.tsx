import { FC } from 'react';
import { Phone } from '../../types/Phone';
import '../../styles/styles.scss';

type Props = {
  product: Phone;
};

export const ProductCard: FC<Props> = ({ product }) => {
  return (
    <div className="product-card" key={product.id}>
      <img
        src={product.imageUrl}
        alt="Phone"
        className="product-card__phone-img"
      />
      <h2 className="product-card__title">
        {/* Apple iPhone Xs 64GB Silver (iMT9G2FS/A) */}
        {product.name}
      </h2>
      <p className="product-card__price">$799</p>
      <p className="product-card__price product-card__price--discount">$899</p>
      <dl className="product-card__description-phone description-phone">
        <dt className="description-phone--title">Screen</dt>
        <dd className="description-phone--value">5.8” OLED</dd>
        <dt className="description-phone--title">Capacity</dt>
        <dd className="description-phone--value">64 GB</dd>
        <dt className="description-phone--title">RAM</dt>
        <dd className="description-phone--value">4 GB</dd>
      </dl>
      <div className="product-card__container">
        <button
          className="product-card__add-to-card"
          type="button"
        >
          Add to cart
        </button>
        <a
          href="http://"
          className="product-card__add-to-favorites add-to-favorites"
        >
          <img
            className="add-to-favorites__icon"
            src="images/icons/HeartLike.svg"
            alt="icon"
          />
        </a>
      </div>
    </div>
  );
};
