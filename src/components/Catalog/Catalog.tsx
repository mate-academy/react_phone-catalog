import React, { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import './Catalog.scss';
import { ProductCard } from '../ProductCard';
import { Amount, Product, Sort } from '../../type';
import { getSearchWith } from '../../utils/searchWith';
import { Params } from '../../type/Params';
import { PathRoute } from '../PathRoute/PathRoute';

type Props = {
  products?: Product[];
  title?: string;
};

export const Catalog: React.FC<Props> = ({ products = [], title = '' }) => {
  const [disableNext, setDisableNext] = useState(false);
  const [disablePrev, setDisablePrev] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const page = +(searchParams.get('page') || 1);
  const perPage = +(searchParams.get('perPage') || 0);

  function setSearchWith(params: Params) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const getAmountPages = useCallback(() => {
    const result = [];

    if (perPage) {
      const amount = Math.ceil(products.length / +perPage);

      for (let i = 1; i <= amount; i += 1) {
        result.push(i);
      }
    }

    return result;
  }, [perPage, products.length]);

  const amountPages = getAmountPages();

  const getPreparedProducts = useCallback(() => {
    let result = [...products];

    result.sort((product1, product2) => {
      switch (sort) {
        case Sort.AGE:
          return product2[sort] - product1[sort];

        case Sort.NAME:
          return product1[sort].localeCompare(product2[sort]);

        case Sort.PRICE:
          return product1[sort] - product2[sort];

        default:
          return 0;
      }
    });

    if (perPage) {
      const startIndex = page * perPage - perPage;
      const lastIndex = startIndex + perPage;

      result = result.slice(startIndex, lastIndex);
    }

    return result;
  }, [page, perPage, products, sort]);

  const visibleProducts = getPreparedProducts();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === Sort.NONE) {
      setSearchWith({ sort: null });
    } else {
      setSearchWith({ sort: e.target.value });
    }
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === Amount.ALL) {
      setSearchWith({ perPage: null, page: null });
    } else {
      setSearchWith({ perPage: e.target.value, page: 1 });
    }
  };

  const handleCurrentPage = (ap: number) => {
    if (ap !== page) {
      setSearchWith({ page: ap });
      window.scroll(0, 0);
      setDisableNext(false);
      setDisablePrev(false);
    }

    if (ap === 1) {
      setSearchWith({ page: null });
    }

    if (Array.isArray(amountPages) && ap === amountPages.length) {
      setDisableNext(true);
    }

    if (ap === 1) {
      setDisablePrev(true);
    }
  };

  const hadleNextPage = () => {
    if (Array.isArray(amountPages)) {
      if (page < amountPages.length) {
        setDisablePrev(false);
        setSearchWith({ page: page + 1 });
        window.scroll(0, 0);
      }

      if (page + 1 === amountPages.length) {
        setDisableNext(true);
      }
    }
  };

  const hadlePrevPage = () => {
    if (page > 1) {
      setDisableNext(false);
      setSearchWith({ page: page - 1 });
      window.scroll(0, 0);
    }

    if (page - 1 === 1) {
      setDisablePrev(true);
    }
  };

  return (
    <div className="Catalog">
      <PathRoute />

      <h1 className="Catalog__title">{title}</h1>

      <div className="Catalog__amount">{`${products.length} models`}</div>

      {products.length > 0 ? (
        <div className="Catalog__choose">
          <div className="Catalog__choose-item Catalog__choose-item--sort">
            <label htmlFor="sortBy" className="Catalog__choose-label">
              Sort by
            </label>
            <select
              value={sort}
              name="sortBy"
              id="sortBy"
              className="Catalog__choose-select"
              onChange={e => handleSortChange(e)}
            >
              <option value={Sort.NONE}>No sorted</option>
              <option value={Sort.AGE}>Newest</option>
              <option value={Sort.NAME}>Alphabetically</option>
              <option value={Sort.PRICE}>Cheapest</option>
            </select>
          </div>
          <div className="Catalog__choose-item Catalog__choose-item--amount">
            <label htmlFor="amount" className="Catalog__choose-label">
              Items on page
            </label>
            <select
              value={perPage}
              name="amountPages"
              id="amount"
              className="Catalog__choose-select"
              onChange={e => handlePerPageChange(e)}
            >
              <option value={Amount.ALL}>all</option>
              <option value={Amount.FOUR}>4</option>
              <option value={Amount.EIGHT}>8</option>
              <option value={Amount.SIXTEEN}>16</option>
            </select>
          </div>
        </div>
      ) : (
        <div className="Catalog__not-elements">{`${title} not found`}</div>
      )}

      <div className="Catalog__content" data-cy="productList">
        {visibleProducts.map(product => (
          <div className="Catalog__content-item" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {Array.isArray(amountPages) && amountPages.length > 1 && (
        <div className="Catalog__page-number" data-cy="pagination">
          <div className="Catalog__page-buttons">
            <button
              data-cy="paginationLeft"
              type="button"
              className="Catalog__page-buttons-item"
              aria-label="previous"
              onClick={hadlePrevPage}
              disabled={disablePrev}
            >
              <img
                src={
                  disablePrev
                    ? 'icons/Arrow_left_disable.svg'
                    : 'icons/Arrow_Left_small.svg'
                }
                alt="previous"
                className="arrow-disabled"
              />
            </button>

            <div className="Catalog__page-list">
              {amountPages.map(ap => (
                <button
                  key={ap}
                  type="button"
                  className={classNames('Catalog__page-list-item', {
                    'Catalog__page-list-item--active':
                      ap === page || (!page && ap === 1),
                  })}
                  aria-label="Number page"
                  onClick={() => handleCurrentPage(ap)}
                >
                  {ap}
                </button>
              ))}
            </div>

            <button
              data-cy="paginationRight"
              type="button"
              className="Catalog__page-buttons-item"
              aria-label="next"
              onClick={hadleNextPage}
              disabled={disableNext}
            >
              <img
                src={
                  disableNext
                    ? 'icons/Arrow_right_disable.svg'
                    : 'icons/Arrow_Right_small.svg'
                }
                alt="next"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
