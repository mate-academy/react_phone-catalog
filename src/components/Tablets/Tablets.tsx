import { useContext } from 'react';
import './Tablets.scss';
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

export const Tablets = () => {
  const context = useContext(DevicesContext);
  const buttonNumber = [1, 2, 3, 4, 5];
  const pageSelection = 2;
  const { pathname } = useLocation();
  const basePath = pathname.split('/').slice(1);

  if (!context) {
    return null;
  }

  const { tablets } = context;

  return !basePath[1] ? (
    <div className="tablets">
      <div className="tablets__address">
        <div className="tablets__address__home-icon">
          <img src={homeIcon} className="tablets__address__home-icon__image" />
        </div>

        <div className="tablets__address__arrow-right-icon">
          <img
            src={arrowRight}
            className="tablets__address__arrow-right-icon__image"
          />
        </div>

        <div className="tablets__address__page-address">Tablets</div>
      </div>

      <div className="tablets__title">Tablets</div>

      <div className="tablets__quantity-of-phones">{`${tablets.length} models`}</div>

      <div className="tablets__sort-by-items-on-page">
        <div className="tablets__sort-by-items-on-page__container sort-by">
          <div className="tablets__sort-by-items-on-page__name">Sort by</div>

          <div className="tablets__sort-by-items-on-page__select">
            {' '}
            <div className="tablets__sort-by-items-on-page__select__value">
              Newest
            </div>
            <div className="tablets__sort-by-items-on-page__select__vector">
              <img
                src={vector}
                className="tablets__sort-by-items-on-page__select__vector__image"
              />
            </div>
          </div>
        </div>

        <div className="tablets__sort-by-items-on-page__container items-on-page">
          <div className="tablets__sort-by-items-on-page__name">
            Items on page
          </div>

          <div className="tablets__sort-by-items-on-page__select">
            <div className="tablets__sort-by-items-on-page__select__number">
              16
            </div>

            <div className="tablets__sort-by-items-on-page__select__vector">
              <img
                src={vector}
                className="tablets__sort-by-items-on-page__select__vector__image"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="tablets__goods">
        {tablets.slice(0, 16).map(model => (
          <ProductCard model={model} key={model.id} />
        ))}
      </div>

      <div className="tablets__pagination">
        <div className="tablets__pagination__button-left">
          <img
            src={buttonLeft}
            className="tablets__pagination__button-left__image"
          />
        </div>

        <div className="tablets__pagination__button-numbers">
          {buttonNumber.map(num => (
            <div
              className={classNames('tablets__pagination__button-number', {
                'tablets__pagination__button-number--active':
                  num === pageSelection,
              })}
              key={num}
            >
              {num}
            </div>
          ))}
        </div>

        <div className="tablets__pagination__button-right">
          <img
            src={buttonRight}
            className="tablets__pagination__button-right__image"
          />
        </div>
      </div>
    </div>
  ) : (
    <ItemCard />
  );
};
