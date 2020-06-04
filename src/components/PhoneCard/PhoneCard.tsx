/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useHistory } from 'react-router-dom';
import CN from 'classnames';

type PropsPhoneCard = {
  phone: Products;
};

const PhoneCard: React.FC<PropsPhoneCard> = ({ phone }) => {
  const history = useHistory();

  const handleProductDetails = (id: string, type: string) => {
    switch (type) {
      case 'phone':
      case 'tablet':
        history.push({
          pathname: `/${type}s/${id}`,
        });
        break;
      default:
    }
  };

  const discountPrice = phone.price - phone.discount;
  // div button dont forget onClick

  return (
    <section className="PhoneCard">
      <div role="button" onClick={() => handleProductDetails(phone.id, phone.type)}>
        <img src={`${phone.imageUrl}`} alt="phone_image" className="PhoneCard__image" />
      </div>
      <p className="PhoneCard__product">{`${phone.id.toUpperCase()}`}</p>

      <div className="PhoneCard__price-container">
        <h2 className="PhoneCard__price">
          $
          {`${phone.price}`}
        </h2>
        <h2
          className={CN('PhoneCard__price-discount', {
            'price-discount': phone.price === discountPrice,
          })}
        >
          $
          {`${phone.price - phone.discount}`}
        </h2>
      </div>
      <p className="PhoneCard__style-line" />
      <div className="PhoneCard__text-container">
        <div className="PhoneCard__text-module">
          <p className="PhoneCard__title">Screen</p>
          <p className="PhoneCard__item">{`${phone.screen}`}</p>
        </div>
        <div className="PhoneCard__text-module">
          <p className="PhoneCard__title">Capacity</p>
          <p className="PhoneCard__item">{`${phone.capacity}`}</p>
        </div>
        <div className="PhoneCard__text-module">
          <p className="PhoneCard__title">RAM</p>
          <p className="PhoneCard__item">{`${phone.ram}`}</p>
        </div>
      </div>
      <div className="PhoneCard__buttons-container">
        <button type="button" className="PhoneCard__button button">
          Add to card
        </button>
        <button type="button" className="PhoneCard__favorits-button button">
          <img src="./img/heart.svg" alt="heart_icon" className="PhoneCard__favorits-image" />
        </button>
      </div>
    </section>

  );
};

export default PhoneCard;
