import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
// import { ProductsList } from './components/ProductsList';
import '../styles/styles.scss';

export const CardPage: FC = () => {
  const cardedPhones = useAppSelector(state => state.phonesCarded.value);

  const totalAmount = cardedPhones.reduce(
    (sum, price) => sum + +price.price, 0,
  );

  return (
    <div className="card-page">
      <Link className="card-page__back-link" to="..">
        <img
          className="card-page__back-link--img"
          src="images/icons/ArrowLeft.svg"
          alt="Back-button"
        />
        Back
      </Link>
      <h1 className="card-page__title">Cart</h1>
      <div className="card-page__order-content order-content">
        <ul className="order-content__list-ored">
          {cardedPhones.map(phone => (
            <li className="order-content__item-ored item-ored">
              <button className="item-ored__delete-button" type="button">
                <img
                  className="item-ored__delete-button--icon"
                  src="images/icons/CloseButton.svg"
                  alt="Close"
                />
              </button>
              <img
                className="item-ored__product-img"
                src={phone.image || phone.imageUrl}
                alt="Phone"
              />
              <h2 className="item-ored__product-name">
                {phone.name}
              </h2>
              <button
                className="item-ored__product-count-deg"
                type="button"
              >
                -
              </button>
              <p className="item-ored__count-value">1</p>
              <button
                type="button"
                className="item-ored__product-count-inc"
              >
                +
              </button>
              <p className="item-ored__price-product">{`$${phone.price}`}</p>
            </li>
          ))}
        </ul>
        <div className="order-content__checkout-block checkout-block">
          <p className="checkout-block__total-price-amout">{`$${totalAmount}`}</p>
          <p className="checkout-block__total-items-amout">{`Total for ${cardedPhones.length} items`}</p>
          <button
            type="button"
            className="checkout-block__checkout-button"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
