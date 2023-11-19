import { Phone } from '../../types/phone';
import './ProductCard.scss';

import addToFavoritesButton from '../../icons/Add to fovourites - Default.png';

type Props = {
  phone: Phone,
  hotPricesPhones?: Phone[];
};

export const ProductCard: React.FC<Props> = ({ phone, hotPricesPhones }) => {
  return (
    <div className="product-card" key={phone.id}>
      <img
        src={`_new/${phone.image}`}
        alt="phone img"
        className="product-card__img"
      />

      <h1 className="product-card__name">
        {phone.name}
      </h1>

      <div className="product-card__prices">
        <h2 className="product-card__discount">
          {`${phone.price}$`}
        </h2>

        {hotPricesPhones && (
          <s className="product-card__no-discount">
            {`${phone.fullPrice}$`}
          </s>
        )}
      </div>

      <hr className="product-card__line" />

      <div className="product-card__description">
        <div className="product-card__screen">
          <div className="screen">Screen</div>
          <div className="oled">{phone.screen}</div>
        </div>

        <div className="product-card__capacity">
          <div className="capacity">Capacity</div>
          <div className="six-four-gb">{phone.capacity}</div>
        </div>

        <div className="product-card__ram">
          <div className="ram">RAM</div>
          <div className="four-gb">{phone.ram}</div>
        </div>
      </div>

      <div className="product-card__buttons">
        <button
          type="button"
          className="product-card__add-to-card-button"
        >
          Add to cart
        </button>
        <button
          type="button"
          className="product-card__favorites-button"
        >
          <img
            src={addToFavoritesButton}
            alt="add to favorites button"
          />
        </button>
      </div>
    </div>
  );
};
