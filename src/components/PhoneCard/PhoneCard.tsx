import './PhoneCard.scss';
import { Phone } from '../../types/Phone';

type Props = {
  phone: Phone,
};

export const PhoneCard: React.FC<Props> = ({ phone }) => {
  const {
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = phone;

  return (
    <div className="phone-card">
      <div className="phone-card__content">
        <div className="phone-card__phone phone">
          <div className="phone__container">
            {/* <img src='_new/products/phones-photos/apple-iphone-xs/spacegray/01.jpg' alt='phone' className="phone__image" /> */}
            <img src={`_new/${image}`} alt={name} className="phone__image" />

            <p className="phone__title">
              {name}
            </p>

            <div className="phone__priceholder">
              <p className="phone__price">
                {`$${price}`}
              </p>

              <p className="phone__price--old">
                {`$${fullPrice}`}
              </p>
            </div>

            <div className="phone__description">
              <div className="phone__description--names">
                Screen
                {' '}
                <br />
                {' '}
                Capacity
                {' '}
                <br />
                {' '}
                RAM
              </div>
              <div className="phone__description--data">
                {screen}
                {' '}
                <br />
                {' '}
                {capacity}
                {' '}
                <br />
                {' '}
                {ram}
              </div>
            </div>

            <div className="phone__bottom">
              <button type="button" className="phone__button">
                Add to cart
              </button>

              <button type="button" className="phone__favourites">
                <p hidden>
                  favourites
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
