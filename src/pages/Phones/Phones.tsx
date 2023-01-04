import React, { useMemo, useState } from 'react';
import '../../container.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
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
  const customStyles = {
    // eslint-disable-next-line
    option: (provided: any, state: any) => ({
      ...provided,
      color: state.isSelected ? '#313237' : '#89939a',
      backgroundColor: state.isSelected ? '#fff' : '#fff',
    }),
  };

  const visibleProducts = useMemo(() => {
    let mass: Product[] = products;

    if (sortBy) {
      switch (sortBy) {
        case 'newest':
          mass = mass.sort((a, b) => a.age - b.age);
          break;
        case 'cheaper':
          mass = mass.sort((a, b) => a.price - b.price);
          break;
        case 'expensive':
          mass = mass.sort((a, b) => b.price - a.price);
          break;
        default: return null;
      }
    }

    mass = mass.filter(product => product.name.toLowerCase()
      .includes(searchInput.toLowerCase()));
    searchParams.delete('searchInput');

    return mass;
  }, [sortBy, products, searchInput]);

  return (
    <div className="wrapper">
      <div className="top">
        <Header />
        <main className="phones">
          <div className="container">
            <NavPages />
            <h1 className="phones__title">{title}</h1>
            {visibleProducts?.length !== 0 ? (
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
                      <Select
                        name="inputSort"
                        id="inputSort"
                        className="phones__select"
                        styles={customStyles}
                        options={[
                          { value: 'newest', label: 'Newest' },
                          { value: 'cheaper', label: 'Сheaper' },
                          { value: 'expensive', label: 'More expensive' },
                        ]}
                        placeholder="Newest"
                        onChange={(event) => {
                          searchParams.set('sortBy', event?.value || '');
                          navigate({
                            search: searchParams.toString(),
                          });
                        }}
                      />
                    </div>
                    <div className="phones__input">
                      <label
                        htmlFor="inputItems"
                        className="phones__label"
                      >
                        Items on page
                      </label>
                      <Select
                        name="numberPage"
                        id="inputSort"
                        className="phones__select"
                        placeholder="All"
                        styles={customStyles}
                        options={[
                          { value: '0', label: 'All' },
                          { value: '4', label: '4' },
                          { value: '8', label: '8' },
                        ]}
                        onChange={(event) => {
                          searchParams.set('sortItems', event?.value || '');
                          navigate({
                            search: searchParams.toString(),
                          });
                        }}
                      />
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
