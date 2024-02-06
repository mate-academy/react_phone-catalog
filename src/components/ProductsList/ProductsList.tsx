import React, { useEffect, useRef, useState } from 'react';
import { v4 as getId } from 'uuid';
import { Phone } from '../../types/Phone';

import './ProductsList.scss';
import { ProductItem } from '../ProductItem/ProductItem';

type Props = {
  products: Phone[]
  title: string,
};

export const ProductsList: React.FC<Props> = ({
  products,
  title,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [itemsPerPage] = useState(4);
  const [page, setPage] = useState(0);
  const [wrapperWidth, setWrapperWidth] = useState(0);

  const itemWidth = 270;
  const gap = (wrapperWidth - (itemWidth * itemsPerPage)) / (itemsPerPage - 1);
  const offset = -(page * ((itemWidth + gap) * itemsPerPage));
  const lastPage = Math.round((products.length / itemsPerPage) - 1);

  useEffect(() => {
    if (wrapperRef.current) {
      setWrapperWidth(wrapperRef.current.offsetWidth);
    }
  }, []);

  return (
    <section
      className="products products__hot-price"
    >
      <div className="products__top">
        <h1 className="section__title">
          {title}
        </h1>

        <div className="products__nav">
          {/* eslint-disable-next-line */}
          <button
            type="button"
            className="products__nav-btn button button__nav button--small"
            onClick={() => setPage(i => i - 1)}
            disabled={!page}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Icons/Chevron (Arrow Left)">
                <path
                  id="Vector (Stroke)"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="
                    M10.4715 3.52861C10.2111 3.26826 9.78903
                    3.26826 9.52868 3.52861L5.52868 7.52861C5.26833
                    7.78896 5.26833 8.21107 5.52868 8.47141L9.52868
                    12.4714C9.78903 12.7318 10.2111 12.7318 10.4715
                    12.4714C10.7318 12.2111 10.7318 11.789 10.4715
                    11.5286L6.94289 8.00001L10.4715 4.47141C10.7318
                    4.21107 10.7318 3.78896 10.4715 3.52861Z
                  "
                  fill="#313237"
                />
              </g>
            </svg>
          </button>

          {/* eslint-disable-next-line */}
          <button
            type="button"
            className="products__nav-btn button button__nav button--small"
            onClick={() => setPage(i => i + 1)}
            disabled={page === lastPage}
          />
        </div>
      </div>

      <div
        className="products__wrapper"
        ref={wrapperRef}
      >
        <div
          className="products__list"
          style={{
            transform: `translateX(${offset}px)`,
            gap: `${gap}px`,
          }}
          data-cy="cardsContainer"
        >
          {products.map((product: Phone) => (
            <ProductItem
              key={getId()}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
