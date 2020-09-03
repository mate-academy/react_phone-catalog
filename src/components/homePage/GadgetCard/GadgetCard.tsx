import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './GadgetCard.scss';
import CartButton from '../cartButton/cartButton';
import FavoriteButton from '../FavoriteButton/FavoriteButton';

type Props = {
  gadget: Gadget;
};

const GadgetCard: React.FC<Props> = ({ gadget }) => {
  const {
    price, discount, id, imageUrl, name, screen, capacity, ram, type,
  } = gadget;

  const priceWithDiscount = price - (price * (discount / 100));
  const [gadgetType, setGadgetType] = useState('phones');

  const SECTION = {
    phone: 'phone',
    tablet: 'tablet',
    accessories: 'accessories',
  };

  useEffect(() => {
    switch (type) {
      case SECTION.phone:
        setGadgetType('phone');
        break;
      case SECTION.tablet:
        setGadgetType('tablet');
        break;
      case SECTION.accessories:
        setGadgetType('accessories');
        break;
      default:
        setGadgetType('phones');
    }
  }, [gadget]);

  return (
    <div className="gadget">
      <div className="gadget__photo">
        <img className="gadget__img" src={imageUrl} alt="gadget" />
      </div>

      <Link to={`/${gadgetType}/${id}`} className="gadget__title">
        {name}
      </Link>

      <span className="gadget__price">
        <p className="gadget__price-discount">{`$${priceWithDiscount}`}</p>
        <p className="gadget__price-value">
          {(price === priceWithDiscount)
            ? '' : (`$${price}`)}
        </p>
      </span>

      <div className="description gadget__description">
        <span className="characteristic__span">
          <span>
            Screen
          </span>

          <span>
            {screen}
          </span>
        </span>

        <span className="characteristic__span">
          <span>
            Capacity
          </span>

          <span>
            {capacity}
          </span>
        </span>

        <span className="characteristic__span">
          <span>
            RAM
          </span>

          <span>
            {ram}
          </span>
        </span>
      </div>

      <div className="gadget__button">
        <CartButton
          gadget={gadget}
        />

        <FavoriteButton gadget={gadget} />
        {/*<label*/}
        {/*  htmlFor={id}*/}
        {/*  className="gadget__button-favorite"*/}
        {/*>*/}
        {/*  <input*/}
        {/*    id={id}*/}
        {/*    type="checkbox"*/}
        {/*    className="gadget__button-favorite-input"*/}
        {/*  />*/}

        {/*  <span className="gadget__button-favorite-check" />*/}
        {/*</label>*/}
      </div>
    </div>
  );
};

export default GadgetCard;
