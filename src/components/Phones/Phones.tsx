import { useContext } from 'react';
import './Phones.scss';
import { DevicesContext } from '../../DevicesContext';
import { ProductCard } from '../ProductCard/ProductCard';
import homeIcon from '../../images/icons/home-icon.png';
import arrowRight from '../../images/icons/arrow-right.png';
import vector from '../../images/icons/vector.png';
import buttonLeft from '../../images/icons/button-left.png';
import buttonRight from '../../images/icons/button-right.png';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { ItemCard } from '../ItemCard/ItemCard';

export const Phones = () => {
  const context = useContext(DevicesContext);
  const buttonNumber = [1, 2, 3, 4, 5];
  const pageSelection = 2;
  const { pathname } = useLocation();
  const basePath = pathname.split('/').slice(1);

  if (!context) {
    return null;
  }

  const { phones } = context;

  return !basePath[1] ? (
    <div className="phones">
      <div className="phones__address">
        <div className="phones__address__home-icon">
          <img src={homeIcon} className="phones__address__home-icon__image" />
        </div>
        <div className="phones__address__arrow-right-icon">
          <img
            src={arrowRight}
            className="phones__address__arrow-right-icon__image"
          />
        </div>
        <div className="phones__address__page-address">Phones</div>
      </div>
      <div className="phones__title">Mobile phones</div>
      <div className="phones__quantity-of-phones">{`${phones.length} models`}</div>
      <div className="phones__sort-by-items-on-page">
        <div className="phones__sort-by-items-on-page__container sort-by">
          <div className="phones__sort-by-items-on-page__name">Sort by</div>
          <div className="phones__sort-by-items-on-page__select">
            {' '}
            <div className="phones__sort-by-items-on-page__select__value">
              Newest
            </div>
            <div className="phones__sort-by-items-on-page__select__vector">
              <img
                src={vector}
                className="phones__sort-by-items-on-page__select__vector__image"
              />
            </div>
          </div>
        </div>
        <div className="phones__sort-by-items-on-page__container items-on-page">
          <div className="phones__sort-by-items-on-page__name">
            Items on page
          </div>
          <div className="phones__sort-by-items-on-page__select">
            <div className="phones__sort-by-items-on-page__select__number">
              16
            </div>
            <div className="phones__sort-by-items-on-page__select__vector">
              <img
                src={vector}
                className="phones__sort-by-items-on-page__select__vector__image"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="phones__goods">
        {phones.slice(0, 16).map(model => (
          <ProductCard model={model} key={model.id} />
        ))}
      </div>
      <div className="phones__pagination">
        <div className="phones__pagination__button-left">
          <img
            src={buttonLeft}
            className="phones__pagination__button-left__image"
          />
        </div>
        <div className="phones__pagination__button-numbers">
          {buttonNumber.map(num => (
            <div
              className={classNames('phones__pagination__button-number', {
                'phones__pagination__button-number--active':
                  num === pageSelection,
              })}
              key={num}
            >
              {num}
            </div>
          ))}
        </div>
        <div className="phones__pagination__button-right">
          <img
            src={buttonRight}
            className="phones__pagination__button-right__image"
          />
        </div>
      </div>
    </div>
  ) : (
    <ItemCard />
  );
};
