import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import cn from 'classnames';
import { ProductDetails } from '../types/ProductDetails';
import { ButtonsCartFav } from './ButtonsCartFav';
import { Params } from './Params';
import { GlobalContext } from '../GlobalContext';

import '../styles/Options.scss';

interface Props {
  product: ProductDetails;
}

const OPTIONS_PARAMS = ['Screen', 'Resolution', 'Processor', 'RAM'];

export const Options: React.FC<Props> = ({ product }) => {
  const { getNewPathname, products } = useContext(GlobalContext);

  const {
    color,
    colorsAvailable,
    capacity,
    capacityAvailable,
    priceDiscount,
    priceRegular,
    id,
  } = product;

  const currentProduct = products.find(item => item.itemId === id);

  return (
    <section className="options">
      <div className="options__select-block">
        <p className="options__text">Available colors</p>

        <ul className="options__list">
          {colorsAvailable.map(col => (
            <li
              key={col}
              className={cn('options__colors-item', {
                'options__colors-item--active': color === col,
              })}
            >
              <Link
                to={`../${getNewPathname(col, -1)}`}
                className="options__colors-link"
                style={{ backgroundColor: col }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="options__select-block">
        <p className="options__text">Select capacity</p>

        <ul className="options__list">
          {capacityAvailable.map(cap => {
            const isActive = capacity === cap;

            return (
              <li
                key={cap}
                className={cn('options__capacity-item', {
                  'options__capacity-item--active': isActive,
                })}
              >
                <Link
                  to={`../${getNewPathname(cap.toLowerCase(), -2)}`}
                  className={cn('options__capacity-link', {
                    'options__capacity-link--active': isActive,
                  })}
                >
                  {cap}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="options__prices">
        <span className="options__price">{`$${priceDiscount}`}</span>
        <span className="options__full-price">{`$${priceRegular}`}</span>
      </div>

      {currentProduct && (
        <div className="options__buttons">
          <ButtonsCartFav product={currentProduct} height={48} />
        </div>
      )}

      <Params product={product} params={OPTIONS_PARAMS} />
    </section>
  );
};
