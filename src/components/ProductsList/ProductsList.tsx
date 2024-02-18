import React, { useEffect, useRef, useState } from 'react';
import { v4 as getId } from 'uuid';
import { Product } from '../../types/Product';

import './ProductsList.scss';
import { ProductItem } from '../ProductItem/ProductItem';
import { Button } from '../Button/Button';

type Props = {
  products: Product[]
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
    <div
      className="products__list"
      data-cy="productList"
    >
      <div className="products__list-top">
        <h1 className="section__title">
          {title}
        </h1>

        <div className="products__list-nav">
          <Button
            className="products__list-nav-btn button button__nav button--small"
            onClick={() => setPage(i => i - 1)}
            disabled={!page}
          >
            <img src="img/icons/arrow-left.svg" alt="Arrow left" />
          </Button>

          <Button
            className="products__list-nav-btn button button__nav button--small"
            onClick={() => setPage(i => i + 1)}
            disabled={page === lastPage}
          >
            <img src="img/icons/arrow-right.svg" alt="Arrow right" />
          </Button>
        </div>
      </div>

      <div
        className="products__list-wrapper"
        ref={wrapperRef}
      >
        <div
          className="products__list-items"
          style={{
            transform: `translateX(${offset}px)`,
            gap: `${gap}px`,
          }}
          data-cy="cardsContainer"
        >
          {products.map((product: Product) => (
            <ProductItem
              key={getId()}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
