import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

const PhonesPage = ({ phones }) => (
  phones.length === 0 ? <Loading />
    : (
      <div className="card" data-qa="card">
        <img
          src={phones.map(img => img.imageUrl)}
          alt="iMac"
          className="card__img"
        />
        <div className="card__text">{phones.map(phone => phone.name)}</div>
        <div>Код товара: 195434</div>

        <div className="card__line">
          <div className="start__container">
            <div className="star start-active" />
            <div className="star start-active" />
            <div className="star start-active" />
            <div className="star start-active" />
            <div className="star" />
          </div>

          <div className="card__reviev">Отзывов: 5</div>
        </div>

        <div className="card__block-price">
          <div className="card__price">Цена:</div>
          <div className="card__price-number">69 999 грн</div>
        </div>
      </div>
    )
);

PhonesPage.propTypes = {
  phones: PropTypes.shape(
    PropTypes.array,
    PropTypes.string,
    PropTypes.object,
  ).isRequired,
};

export default PhonesPage;
