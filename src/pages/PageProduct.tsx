import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../App.scss';
import { Product } from '../types/Product';
import { ProductTitle } from '../types/ProductTitel';
import { ProductCard } from '../components/ProductCard';
import { Title } from '../types/Titel';
import '../styles/containers.scss';
import '../styles/PageProduct.scss';
import { getNumbers } from '../utils/utils';
import classNames from 'classnames';
import { WhatSorted } from '../types/WhatSorted';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useProducts } from '../context/ProductsContext';

type Props = {
  titel: ProductTitle;
};

export const PageProduct: React.FC<Props> = ({ titel }) => {
  const { products: catalog } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryByTitle: Record<ProductTitle, string> = {
    [ProductTitle.phone]: 'phones',
    [ProductTitle.tablet]: 'tablets',
    [ProductTitle.accessories]: 'accessories',
    [ProductTitle.favorits]: 'favorits',
    [ProductTitle.orders]: 'orders',
  };

  const products = catalog.filter(
    product => product.category === categoryByTitle[titel],
  );

  // Читаємо значення з URL, з дефолтами, якщо параметра ще немає
  const perPage = Number(searchParams.get('perPage')) || 16;
  const perSort = (searchParams.get('sort') as WhatSorted) || WhatSorted.Newest;
  const currentPage = Number(searchParams.get('page')) || 1;

  const pageCount = Math.ceil(products.length / perPage);
  const listItems = getNumbers(1, pageCount).map(n => n);

  // Універсальна функція для оновлення одного параметра, зберігаючи інші
  const updateParams = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      newParams.set(key, value);
    });

    setSearchParams(newParams);
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= pageCount) {
      updateParams({ page: String(page) });
    }
  };

  const handleSortChange = (sort: WhatSorted) => {
    updateParams({ sort, page: '1' }); // при зміні сортування скидаємо на 1 сторінку
  };

  const handlePerPageChange = (value: number) => {
    updateParams({ perPage: String(value), page: '1' }); // так само скидаємо сторінку
  };

  const sortedProducts: Product[] = useMemo(() => {
    const result = [...products];

    switch (perSort) {
      case WhatSorted.Newest:
        result.sort((a, b) => b.year - a.year);
        break;
      case WhatSorted.Old:
        result.sort((a, b) => a.year - b.year);
        break;
      case WhatSorted.Cheaper:
        result.sort((a, b) => a.price - b.price);
        break;
      case WhatSorted.Expensive:
        result.sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [products, perSort]);

  const visibleProducts = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    return sortedProducts.slice(start, end);
  }, [sortedProducts, currentPage, perPage]);

  return (
    <>
      <h1 className="title offCalss">Home page</h1>
      <div className="product-page">
        <section className="section-titel">
          <div className="container">
            <Breadcrumbs />
            <h1 className="titel titelOf">Product Catalog</h1>
            <div className="titel box">
              <h2>{titel}</h2>
              <p>{products.length} models</p>
            </div>
          </div>
        </section>
      </div>
      <section className="section">
        <div className="container">
          <div className="sort-By">
            <p className="sort-By--text">Sort By</p>
            <select
              className="sort-By--item item"
              name="sort-By"
              id="sort-By"
              value={perSort}
              onChange={e => handleSortChange(e.target.value as WhatSorted)}
            >
              <option className="option" value={WhatSorted.Old}>
                Old
              </option>
              <option className="option" value={WhatSorted.Newest}>
                Newest
              </option>
              <option className="option" value={WhatSorted.Cheaper}>
                Сheaper
              </option>
              <option className="option" value={WhatSorted.Expensive}>
                Dear ones
              </option>
            </select>
          </div>
          <div className="form">
            <p className="form--text">Items on page</p>
            <select
              className="form--item item"
              name="perPageSelector"
              data-cy="perPageSelector"
              id="perPageSelector"
              value={perPage}
              onChange={event =>
                handlePerPageChange(Number(event.target.value))
              }
            >
              <option className="option" value="16">
                16
              </option>
              <option className="option" value="32">
                32
              </option>
              <option className="option" value="64">
                64
              </option>
              <option className="option" value="128">
                128
              </option>
            </select>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {visibleProducts.map(product => (
            <ProductCard
              titel={Title.Space}
              key={product.itemId}
              product={product}
            />
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container">
          <ul className="pagnation">
            <li className="page--item">
              <button
                type="button"
                data-cy="prevLink"
                className={classNames('page--link arrow ', {
                  disebled: currentPage === 1,
                })}
                aria-disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                «
              </button>
            </li>
            {listItems.map(count => (
              <li
                key={count}
                className={classNames('page--item ', {
                  active: currentPage === count,
                })}
              >
                <button
                  type="button"
                  data-cy="pageLink"
                  className="page--link"
                  onClick={() => handlePageChange(count)}
                >
                  {count}
                </button>
              </li>
            ))}
            <li className="page--item">
              <button
                type="button"
                data-cy="prevLink"
                className={classNames('page--link arrow', {
                  disebled: currentPage === pageCount,
                })}
                aria-disabled={currentPage === pageCount}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                »
              </button>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};
