import { Link } from 'react-router-dom';
import { ProductPhone } from '../../Type/phone';
import { BuyButtonCart } from '../BuyButtonCard/BuyButtonCart';
import { FavouritesIcon } from '../FavouritesIcon/FavouritesIcon';
import './ProductCard.scss';

type Props = {
  phone: ProductPhone;
};

export const ProductCard: React.FC<Props> = ({ phone }) => {
  const {
    name, image, ram, capacity, screen, price, fullPrice, phoneId,
  } = phone;

  return (
    <Link
      to={{
        pathname: `/phones/${phoneId}`,
      }}
      className="ProductCard"
    >
      <div className="ProductCard__photo">
        <img
          className="ProductCard__img"
          src={`https://mate-academy.github.io/react_phone-catalog/_new/${image}`}
          alt={`${name}`}
        />
      </div>

      <div className="ProductCard__wrap">
        <div className="ProductCard__title">{name}</div>

        <div className="ProductCard__price">
          <div className="ProductCard__price-normal">{`$${price}`}</div>
          {price && (
            <div className="ProductCard__price-discounted">{`$${fullPrice}`}</div>
          )}
        </div>

        <div className="ProductCard__details">
          <div className="ProductCard__details-item">
            <div className="ProductCard__details-item__name">Screen</div>
            <div className="ProductCard__details-item__value">
              {screen || '-'}
            </div>
          </div>
          <div className="ProductCard__details-item">
            <div className="ProductCard__details-item__name">
              Capacity
            </div>
            <div className="ProductCard__details-item__value">
              {capacity || '-'}
            </div>
          </div>
          <div className="ProductCard__details-item">
            <div className="ProductCard__details-item__name">RAM</div>
            <div className="ProductCard__details-item__value">
              {ram || '-'}
            </div>
          </div>
        </div>

        <div className="ProductCard__buttons">
          <BuyButtonCart phone={phone} />
          <FavouritesIcon phone={phone} />
        </div>
      </div>
    </Link>
  );
};
