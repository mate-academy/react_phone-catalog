import { useState } from 'react';
import classNames from 'classnames';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';

import './HotPhones.scss';

interface Props {
  phones: Product[];
}

export const HotPhones: React.FC<Props> = ({ phones }) => {
  const visibleCards = 4;
  const [start, setStart] = useState(0);
  const end = start + visibleCards;

  const sortedphones = phones.sort((a, b) => (
    (b.discount) - (a.discount)
  ));

  return (
    <div className="container">
      <div className="hot-phones">
        <div
          className="hot-phones__top"
          data-cy="productList"
        >
          <h1 className="hot-phones__title name__page">Hot prices</h1>
          <div className="hot-phones__buttons">
            <button
              className={classNames(
                'hot-phones__button hot-phones__button-left', {
                  'hot-phones__button-left--disabled': start === 0,
                },
              )}
              type="button"
              onClick={() => setStart((prev) => prev - 1)}
              disabled={start === 0}
            >
              <p hidden>
                left button
              </p>
            </button>
            <button
              className={classNames(
                'hot-phones__button hot-phones__button-right', {
                  'hot-phones__button-right--disabled': end === 0,
                },
              )}
              type="button"
              onClick={() => setStart((prev) => prev + 1)}
              disabled={end === 0}
            >
              <p hidden>
                right button
              </p>
            </button>
          </div>
        </div>
        <div className="hot-phones__phones">
          <ul className="product">
            {sortedphones.slice(start, end).map((phone: Product) => (
              <li
                className="product__item"
                key={phone.id}
              >
                <ProductCard
                  phone={phone}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
