import { useContext } from 'react';
import './Accessories.scss';
import { DevicesContext } from '../../DevicesContext';
import { ProductCard } from '../ProductCard/ProductCard';
import classNames from 'classnames';
import homeIcon from '../../images/icons/home-icon.png';
import arrowRight from '../../images/icons/button-right.png';
import vector from '../../images/icons/vector.png';
import buttonLeft from '../../images/icons/button-left.png';
import buttonRight from '../../images/icons/button-right.png';
import { useLocation } from 'react-router-dom';
import { ItemCard } from '../ItemCard/ItemCard';

export const Accessories = () => {
  const context = useContext(DevicesContext);
  const buttonNumber = [1, 2, 3, 4, 5];
  const pageSelection = 2;
  const { pathname } = useLocation();
  const basePath = pathname.split('/').slice(1);

  if (!context) {
    return null;
  }

  const { accessories } = context;

  return !basePath[1] ? (
    <div className="accessories">
      <div className="accessories__address">
        <div className="accessories__address__home-icon">
          <img
            src={homeIcon}
            className="accessories__address__home-icon__image"
          />
        </div>
        <div className="accessories__address__arrow-right-icon">
          <img
            src={arrowRight}
            className="accessories__address__arrow-right-icon__image"
          />
        </div>
        <div className="accessories__address__page-address">Accessories</div>
      </div>
      <div className="accessories__title">Accessories</div>
      <div className="accessories__quantity-of-phones">{`${accessories.length} models`}</div>
      <div className="accessories__sort-by-items-on-page">
        <div className="accessories__sort-by-items-on-page__container sort-by">
          <div className="accessories__sort-by-items-on-page__name">
            Sort by
          </div>
          <div className="accessories__sort-by-items-on-page__select">
            {' '}
            <div className="accessories__sort-by-items-on-page__select__value">
              Newest
            </div>
            <div className="accessories__sort-by-items-on-page__select__vector">
              <img
                src={vector}
                className="accessories__sort-by-items-on-page__select__vector__image"
              />
            </div>
          </div>
        </div>
        <div className="accessories__sort-by-items-on-page__container items-on-page">
          <div className="accessories__sort-by-items-on-page__name">
            Items on page
          </div>
          <div className="accessories__sort-by-items-on-page__select">
            <div className="accessories__sort-by-items-on-page__select__number">
              16
            </div>
            <div className="accessories__sort-by-items-on-page__select__vector">
              <img
                src={vector}
                className="accessories__sort-by-items-on-page__select__vector__image"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="accessories__goods">
        {accessories.slice(0, 16).map(model => (
          <ProductCard model={model} key={model.id} />
        ))}
      </div>
      <div className="accessories__pagination">
        <div className="accessories__pagination__button-left">
          <img
            src={buttonLeft}
            className="accessories__pagination__button-left__image"
          />
        </div>
        <div className="accessories__pagination__button-numbers">
          {buttonNumber.map(num => (
            <div
              className={classNames('accessories__pagination__button-number', {
                'accessories__pagination__button-number--active':
                  num === pageSelection,
              })}
              key={num}
            >
              {num}
            </div>
          ))}
        </div>
        <div className="accessories__pagination__button-right">
          <img
            src={buttonRight}
            className="accessories__pagination__button-right__image"
          />
        </div>
      </div>
    </div>
  ) : (
    <ItemCard />
  );
};
