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
            <img src="img/icons/arrow-left.svg" alt="Arrow left" />
          </button>

          {/* eslint-disable-next-line */}
          <button
            type="button"
            className="products__nav-btn button button__nav button--small"
            onClick={() => setPage(i => i + 1)}
            disabled={page === lastPage}
          >
            <img src="img/icons/arrow-right.svg" alt="Arrow right" />
          </button>
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
