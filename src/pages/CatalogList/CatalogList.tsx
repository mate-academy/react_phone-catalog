import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Pagination } from '../../components/Pagination/Pagination';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Product } from '../../types/Product';
import { useLocalStorage } from '../../utils/useLocalStorage';
import { CategoryProduct } from '../../utils/CategoryProducts';

import './CatalogList.scss';

type Props = {
  title: string;
};

export const CatalogList: React.FC<Props> = ({ title }) => {
  const [products] = useLocalStorage<Product[]>('products', []);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const searchParams = new URLSearchParams(useLocation().search);
  const query = searchParams.get('query')?.toString() || '';
  const [countShow, setCountShow] = useState('100');
  const [sortBy, setSortBy] = useState('newset');
  const [page, setPage] = useState(1);

  const visibleProducts = useMemo(() => {
    if (!query) {
      switch (pathname.slice(1)) {
        case CategoryProduct.Phones:
          return products.filter((product) => {
            return product.category === CategoryProduct.Phones;
          });
        case CategoryProduct.Tablets:
          return products.filter((product) => {
            return product.category === CategoryProduct.Tablets;
          });
        case CategoryProduct.Accessories:
          return products.filter((product) => {
            return product.category === CategoryProduct.Accessories;
          });
        default:
          return [];
      }
    } else {
      switch (pathname.slice(1)) {
        case CategoryProduct.Phones:
          return products.filter((product) => {
            return product.category === CategoryProduct.Phones
              && product.name.toLocaleLowerCase().includes(query);
          });
        case CategoryProduct.Tablets:
          return products.filter((product) => {
            return product.category === CategoryProduct.Tablets
              && product.name.toLocaleLowerCase().includes(query);
          });
        case CategoryProduct.Accessories:
          return products.filter((product) => {
            return product.category === CategoryProduct.Accessories
              && product.name.toLocaleLowerCase().includes(query);
          });
        default:
          return [];
      }
    }
  }, [pathname, query]);

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
        visibleProducts.sort((a, b) => (
          a.name.localeCompare(b.name)
        ));
        break;
      case 'price':
        visibleProducts.sort((a, b) => (
          a.price - b.price
        ));
        break;
      default:
        visibleProducts.sort((a, b) => (
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
      <main>
        <div className="catalog-list container">
          <Breadcrumbs />
          <h1 className="catalog-list__title">{title}</h1>
          {visibleProducts.length > 0 ? (
            <>
              <p className="catalog-list__count">{`${visibleProducts.length} models`}</p>
              <div className="catalog-list__menu">
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
              <div className="catalog-list__content">
                {visibleProducts.slice(
                  (page - 1) * +countShow, +countShow * page,
                ).map(p => (
                  <ProductCard product={p} key={p.id} />
                ))}
              </div>
            </>
          ) : (
            <h2>{`${title} not found`}</h2>
          )}
          {+countShow < visibleProducts.length && (
            <Pagination
              total={visibleProducts.length}
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
