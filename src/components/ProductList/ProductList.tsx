import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Pagination } from '../Pagination/Pagination';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';

import './ProductList.scss';

type Props = {
  products: Product[],
  title: string,
};

export const ProductList: React.FC<Props> = ({ products, title }) => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(useLocation().search);
  const [countShow, setCountShow] = useState('100');
  const [sortBy, setSortBy] = useState('newset');
  const [page, setPage] = useState(1);

  const fitlerProducts = () => {
    const show = searchParams.get('perPage')?.toString() || '100';

    setCountShow(show);
    setPage(1);

    navigate({
      search: searchParams.toString(),
    });
  };

  const sortProducts = () => {
    const sort = searchParams.get('sortBy')?.toString() || 'newset';

    setSortBy(sort);

    switch (sort) {
      case 'alphabetically':
        products.sort((a, b) => (
          a.name.localeCompare(b.name)
        ));
        break;
      case 'price':
        products.sort((a, b) => (
          a.price - b.price
        ));
        break;
      default:
        products.sort((a, b) => (
          a.year - b.year
        ));
        break;
    }

    navigate({
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    sortProducts();
    fitlerProducts();
  }, [countShow]);

  return (
    <>
      <Header />
      <main>
        <div className="product-list container" data-cy="productList">
          <h1 className="product-list__title">{title}</h1>
          {products.length > 0 ? (
            <>
              <p className="product-list__count">{`${products.length} models`}</p>
              <div className="product-list__menu">
                <label htmlFor="#">
                  Sort By
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      searchParams.set('sortBy', e.target.value);

                      sortProducts();
                    }}
                  >
                    <option value="newset">New</option>
                    <option value="alphabetically">Alphabetically</option>
                    <option value="price">Price</option>
                  </select>
                </label>
                <label htmlFor="#">
                  Show
                  <select
                    value={countShow}
                    onChange={(e) => {
                      searchParams.set('perPage', e.target.value);

                      fitlerProducts();
                    }}
                  >
                    <option value="100">all</option>
                    <option value="4">4</option>
                    <option value="8">8</option>
                    <option value="16">16</option>
                  </select>
                </label>
              </div>
              <div className="product-list__content">
                {products
                  .slice((page - 1) * +countShow, +countShow * page)
                  .map(p => (
                    <ProductCard product={p} key={p.id} />
                  ))}
              </div>
            </>
          ) : (
            <h2>{`${title} not found`}</h2>
          )}
          {+countShow < products.length && (
            <Pagination
              total={products.length}
              step={+countShow}
              page={page}
              changePage={setPage}
            />
          )}
        </div>
      </main>
    </>
  );
};
