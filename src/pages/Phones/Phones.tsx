import React, { useMemo, useState } from 'react';
import '../../container.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { Product } from '../../type';
import './Phones.scss';
import { PricesPhone } from '../../helpers/PricesPhone/PricesPhone';
import { Pagination } from '../../components/Pagination/Pagination';
import { NavPages } from '../../components/NavPages/NavPages';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

interface Props {
  products: Product[],
  title: string
}

export const Phones: React.FC<Props> = ({ products, title }) => {
  const [page, setPage] = useState(1);
  const searchParams = new URLSearchParams(useLocation().search);

  const navigate = useNavigate();
  const sortItems = searchParams.get('sortItems') || '';
  const sortBy = searchParams.get('sortBy') || '';
  const searchInput = searchParams.get('searchInput') || '';

  const visibleProducts = useMemo(() => {
    if (sortBy || searchInput) {
      switch (sortBy) {
        case 'newest':
          return products.sort((a, b) => a.age - b.age)
            .filter(product => product.name.toLowerCase()
              .includes(searchInput.toLowerCase()));
        case 'cheaper':
          return products.sort((a, b) => a.price - b.price)
            .filter(product => product.name
              .includes(searchInput));
        case 'expensive':
          return products.sort((a, b) => b.price - a.price)
            .filter(product => product.name.includes(searchInput));
        default: return null;
      }
    }

    return products;
  }, [sortBy, products, searchInput]);

  return (
    <div className="wrapper">
      <div className="top">
        <Header />
        <main className="phones">
          <div className="container">
            <NavPages />
            <h1 className="phones__title">{title}</h1>
            {products.length !== 0 ? (
              <>
                <p className="phones__number">
                  {visibleProducts?.length}
                  {' '}
                  models
                </p>
                {searchInput === '' && (
                  <div className="phones__inputs">
                    <div className="phones__input">
                      <label
                        htmlFor="inputSort"
                        className="phones__label"
                      >
                        Sort by
                      </label>
                      <select
                        name="sort"
                        id="inputSort"
                        className="phones__select"
                        value={sortBy}
                        onChange={(event) => {
                          searchParams.set('sortBy', event.target.value);
                          navigate({
                            search: searchParams.toString(),
                          });
                        }}
                      >
                        <option className="phones__option" value="newest">
                          Newest
                        </option>
                        <option className="phones__option" value="cheaper">
                          Сheaper
                        </option>
                        <option className="phones__option" value="expensive">
                          More expensive
                        </option>
                      </select>
                    </div>
                    <div className="phones__input">
                      <label
                        htmlFor="inputItems"
                        className="phones__label"
                      >
                        Items on page
                      </label>
                      <select
                        name="numberPage"
                        id="inputItems"
                        className="phones__select"
                        value={sortItems}
                        onChange={(event) => {
                          searchParams.set('sortItems', event.target.value);
                          navigate({
                            search: searchParams.toString(),
                          });
                        }}
                      >
                        <option className="phones__option" value="0">
                          All
                        </option>
                        <option className="phones__option" value="4">
                          4
                        </option>
                        <option className="phones__option" value="8">
                          8
                        </option>
                      </select>
                    </div>
                  </div>
                )}
                <div className="phones__list">
                  {sortItems === '0' || sortItems === ''
                    ? visibleProducts?.slice().map(product => (
                      <div className="phones__card card" key={product.id}>
                        <PricesPhone product={product} />
                      </div>
                    )) : (
                      visibleProducts?.slice((page - 1) * +sortItems,
                        +sortItems * page)
                        .map(product => (
                          <div
                            className="phones__card card"
                            key={product.id}
                          >
                            <PricesPhone product={product} />
                          </div>
                        )))}
                </div>
                {sortItems !== '0' && sortItems !== ''
                  && searchInput === '' && (
                  <Pagination
                    total={products.length}
                    step={+sortItems}
                    page={page}
                    changePage={setPage}
                    arrPages={Array.from({
                      length: Math.ceil(products.length / +sortItems),
                    }, (_, i) => i + 1)}
                  />
                )}
              </>
            ) : (
              <div className="phones__notfound h2">
                Product not found
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
