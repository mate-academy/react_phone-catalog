import React from 'react';
import './CardItem.scss';

type Props = {
  cardItem: Products;
};

export const CardItem: React.FC<Props> = ({ cardItem }) => {
  return (
    <>
      <div className="Card__item">
        <button className="Card__button_close" type="button">{}</button>
        <img className="Card__img" src={cardItem.imageUrl} alt="img" />
        <p className="Card__name">{cardItem.name}</p>
        <div className="Card__counter counter">
          <button type="button" className="PhoneSlider__btn counter__btn_minus">{ }</button>
          <p className="Card__counter_value">1</p>
          <button type="button" className="PhoneSlider__btn counter__btn_plus">{ }</button>
        </div>
        <h2 className="Card__price">{`$${cardItem.price}`}</h2>
      </div>
    </>
  );
};
