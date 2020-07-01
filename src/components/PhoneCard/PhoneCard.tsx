import React from 'react';
import { Link } from 'react-router-dom';
import CN from 'classnames';
import { FavouriteButton } from '../Buttons/FavouriteButton';
import { CartButton } from '../Buttons/CartButton';


type PropsPhoneCard = {
  phone: Products;
};

const PhoneCard: React.FC<PropsPhoneCard> = ({ phone }) => {
  const discountPrice = phone.price - phone.discount;

  return (
    <section className="PhoneCard">
      <Link to={`/${phone.type}s/${phone.id}`}>
        <img src={`${phone.imageUrl}`} alt="phone_image" className="PhoneCard__image" />
      </Link>
      <Link className="PhoneCard__product" to={`/${phone.type}s/${phone.id}`}>
        {`${phone.id.toUpperCase()}`}
      </Link>
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
        <CartButton product={phone} className="PhoneCard__button" />
        <FavouriteButton item={phone} className="PhoneCard__favorits-button button" />
      </div>
    </section>

  );
};

export default PhoneCard;
