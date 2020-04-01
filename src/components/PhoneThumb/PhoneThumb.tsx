import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './_PhoneThumb.scss';
import { PhoneInterface } from '../../constants/types';
import { setFavourites, setCart } from '../../store/actionCreators';

interface Props {
  data: PhoneInterface;
  setFavourites: (id: string) => void;
  setCart: (id: string) => void;
}

export const PhoneThumbTemplate: FC<Props> = (props) => {
  const { imageUrl, snippet, name, id } = props.data;
  const {
    setFavourites: setFavouritesTemplate,
    setCart: setCartTemplate,
  } = props;

  const handleFavourites = (phoneId: string) => {
    setFavouritesTemplate(phoneId);
  };

  const handleCart = (phoneId: string) => {
    setCartTemplate(phoneId);
  };

  return (
    <div className="phoneThumb">
      <img src={`${imageUrl}`} alt="phone__photo" className="phoneThumb__img" />
      <div className="phoneThumb__info">
        <div className="phoneThumb__info-top">
          <Link key={id} to={`/phones/${id}`}>
            <h3 className="phoneThumb__title">{name}</h3>
          </Link>
          <p className="phoneThumb__text-price">Price</p>
        </div>
        <div className="phoneThumb__info-main">
          <p className="phoneThumb__decription">{snippet}</p>
        </div>
        <div className="phoneThumb__action-btns">
          <button
            type="button"
            className="phoneThumb__btn-cart"
            onClick={() => handleCart(id)}
          >
            Add to cart
          </button>
          <button
            type="button"
            className="phoneThumb__btn-favourites"
            onClick={() => handleFavourites(id)}
          />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setFavourites,
  setCart,
};

export const PhoneThumb = connect(null, mapDispatchToProps)(PhoneThumbTemplate);
