import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Phone } from '../../types/Phone';
import { PhoneContext } from '../../utils/PhoneContext';
import { Buttons } from '../Buttons';

type Props = {
  phone: Phone,
  position: number,
};

export const ProductCard: React.FC<Props> = ({ phone, position }) => {
  const {
    phoneId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
    category,
  } = phone;

  const click = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const {
    bagPhones,
    addToBag,
    favPhones,
    addAndRemove,
  } = useContext(PhoneContext);

  return (
    <div
      className="productCard"
      style={{
        transform: `translateX(${position}px)`,
      }}
    >
      <Link
        to={category === 'phones' ? `/phones/${phoneId}` : `/tablets/${phoneId}`}
        className="productCard_image"
        onClick={click}
      >
        <img
          src={image}
          alt={phoneId}
          className="productCard_image_img"
        />
      </Link>

      <div className="productCard_text">
        <Link
          to={category === 'phones' ? `/phones/${phoneId}` : `/tablets/${phoneId}`}
          className="productCard_text_title"
        >
          {name}
        </Link>
        <div className="productCard_text_price">
          <span className="productCard_text_price_price">
            {`$${price}`}
          </span>
          <span className="productCard_text_price_fullPrice">
            {fullPrice !== 0 && `$${fullPrice}`}
          </span>
        </div>
        <div className="productCard_text_about">
          <div className="productCard_text_about_conteiner">
            <span className="productCard_text_about_conteiner_name">
              Screen
            </span>
            <span className="productCard_text_about_conteiner_value">
              {screen}
            </span>
          </div>
          <div className="productCard_text_about_conteiner">
            <span className="productCard_text_about_conteiner_name">
              Capacity
            </span>
            <span className="productCard_text_about_conteiner_value">
              {capacity}
            </span>
          </div>
          <div className="productCard_text_about_conteiner">
            <span className="productCard_text_about_conteiner_name">
              RAM
            </span>
            <span className="productCard_text_about_conteiner_value">
              {ram}
            </span>
          </div>
        </div>
      </div>
      <Buttons
        addToBag={() => addToBag(phone)}
        addAndRemove={() => addAndRemove(phone)}
        boolVal={bagPhones.some(dev => dev.phoneId === phone.phoneId)}
        favBool={favPhones.some(i => i.phoneId === phone.phoneId)}
      />
    </div>
  );
};
