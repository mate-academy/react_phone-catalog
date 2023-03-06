/* eslint-disable max-len */
import { FC, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Product } from '../types/Product';
import '../styles/productsList.scss';
import { Header } from './Header';
import { Breadcrumbs } from './Breadcrumbs';
import { ProductCard } from './ProductCard';
import { Pagination } from './Pagination';
import { Footer } from './Footer';

type Props = {
  products: Product[],
  title: string,
  isloading: boolean,
};

export const ProductsList: FC<Props> = ({ products, title, isloading }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('newest');
  const [list, setlist] = useState('100');
  const [currentPage, setCurrentPage] = useState(1);
  const query = searchParams.get('query') || '';

  const productAfterQuery = (devices: Product[], selectedQuery: string) => {
    if (!selectedQuery) {
      return devices;
    }

    const normalizeQuery = selectedQuery.trim().toUpperCase();

    return devices.filter(({ name }) => {
      return name.trim().toUpperCase().includes(normalizeQuery);
    });
  };

  const productsFilteredByQuery = productAfterQuery(products, query);

  const sortMenu = () => {
    const sort = searchParams.get('sortBy') || 'newest';

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
          a.age - b.age
        ));
        break;
    }

    navigate({
      search: searchParams.toString(),
    });
  };

  const filterMenu = () => {
    const visibleDevices = searchParams.get('perPage') || '100';

    setlist(visibleDevices);
    setCurrentPage(1);

    navigate({
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    sortMenu();
    filterMenu();
  }, [setlist]);

  return (
    <>
      <Header />
      <main>
        {!isloading ? (
          <div className="product-list product-list__container" data-cy="productList">
            <Breadcrumbs />
            <h1 className="product-list__title">{title}</h1>
            {productsFilteredByQuery.length > 0 ? (
              <>
                <p className="product-list__count">{`${productsFilteredByQuery.length} models`}</p>
                <div className="product-list__menu">
                  <label htmlFor="#">
                    Sort By
                    <select
                      value={sortBy}
                      onChange={(event) => {
                        searchParams.set('sortBy', event.target.value);

                        sortMenu();
                      }}
                    >
                      <option value="newest">Newest</option>
                      <option value="alphabetically">Alphabetically</option>
                      <option value="price">Price</option>
                    </select>
                  </label>
                  <label htmlFor="#">
                    Items on page
                    <select
                      value={list}
                      onChange={(event) => {
                        searchParams.set('perPage', event.target.value);

                        filterMenu();
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
                  {productsFilteredByQuery.slice((currentPage - 1) * +list, +list * currentPage).map(product => (
                    <ProductCard product={product} key={product.id} />
                  ))}
                </div>
              </>
            ) : (
              <h2 className="product-list__error">Products not found</h2>
            )}
            {+list < products.length && (
              <Pagination
                productsLength={productsFilteredByQuery.length}
                list={+list}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        ) : (
          <div className="product-list__loader">
            <i className="fas fa-circle-notch fa-spin" />
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};
