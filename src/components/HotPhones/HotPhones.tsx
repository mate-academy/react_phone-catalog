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

  const sortedPhones = phones.sort((a, b) => (
    (b.discount) - (a.discount)
  ));

  const arrLength = sortedPhones.length;

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
              onClick={() => setStart((prev) => Math.max(prev - 1, 0))}
              disabled={start === 0}
            >
              <p hidden>
                left button
              </p>
            </button>
            <button
              className={classNames(
                'hot-phones__button hot-phones__button-right', {
                  'hot-phones__button-right--disabled': end >= arrLength,
                },
              )}
              type="button"
              onClick={() => setStart((prev) => Math.min(
                prev + 1, arrLength - visibleCards,
              ))}
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
            {sortedPhones.slice(start, end).map((phone: Product) => (
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
