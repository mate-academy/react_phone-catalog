import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ProductCard } from '../ProductCard';
import { PhoneCard } from '../PhoneCard';
import { Selector } from '../Selector';
import { Pagination } from '../Pagination';

import { Phone } from '../../types/Phone';
import { ApiProduct } from '../../types/ApiProduct';

type Props = {
  products: ApiProduct[] | Phone[] | null;
};

const sortLabels = ['Newest', 'Alphabetically', 'Cheapest'];
const pageValues = ['4', '8', '16', 'all'];
const sortValues = ['age', 'name', 'price'];

const labels = ['Sort by', 'Items on page'];

const valuesKeys = ['sort', 'perPage', 'page'];

export const List: React.FC<Props> = ({ products }) => {
  const [sortedBy, setSortedBy] = useState('age');
  const [perPage, setPerPage] = useState('16');
  const [pagesCount, setPagesCount] = useState(1);
  const [currentPage, setCurrentPage] = useState('1');
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleProducts, setVisibleProducts] = useState(products);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    setSortedBy(params.get(valuesKeys[0]) || sortedBy);
    setPerPage(params.get(valuesKeys[1]) || perPage);
    setCurrentPage(params.get(valuesKeys[2]) || currentPage);

    setSearchParams(params);
  }, []);

  useEffect(() => {
    setPagesCount((perPage === 'all')
      ? 1
      : Math.ceil((products?.length || 0) / +perPage));
  }, [perPage, searchParams]);

  useEffect(() => {
    const sorted = products?.sort((product1, product2) => {
      switch (sortedBy) {
        case 'name':
          return product1.name.localeCompare(product2.name);

        case 'age':
          if ('year' in product1 && 'year' in product2) {
            return product2.year - product1.year;
          }

          if ('age' in product1 && 'age' in product2) {
            return product2.age - product1.age;
          }

          return 0;

        case 'price':
          return product1.price - product2.price;

        default:
          throw new Error('Sort error');
      }
    });

    const filtered = (perPage === 'all')
      ? (sorted || null)
      : sorted
        ?.slice((+currentPage - 1) * +perPage, +currentPage * +perPage) || null;

    setVisibleProducts(filtered);
  }, [sortedBy, perPage, currentPage, products]);

  const handleOnClick = (
    option: string,
    setOption: React.Dispatch<React.SetStateAction<string>>,
    valueKey: string,
  ) => {
    const params = new URLSearchParams(searchParams);

    const param = (valueKey === 'sort')
      ? sortValues[sortLabels.indexOf(option)]
      : option;

    setOption(param);
    params.set(valueKey, param);
    setCurrentPage('1');

    setSearchParams(params);
  };

  const handlePage = (page: string) => () => {
    const params = new URLSearchParams(searchParams);

    setCurrentPage(page);
    params.set('page', page);

    setSearchParams(params);
  };

  return (
    <div
      className="products-list"
      data-cy="productList"
    >
      <div className="products-list__sort-form">
        <Selector
          options={sortLabels}
          label={labels[0]}
          value={sortLabels[sortValues.indexOf(sortedBy)]}
          setOption={setSortedBy}
          valueKey={valuesKeys[0]}
          handleOnClick={handleOnClick}
        />

        <Selector
          options={pageValues}
          label={labels[1]}
          value={perPage}
          setOption={setPerPage}
          valueKey={valuesKeys[1]}
          handleOnClick={handleOnClick}
        />
      </div>

      <div className="products-list__container">
        {visibleProducts?.map(
          product => {
            if ('age' in product) {
              return <ProductCard key={product.id} product={product} />;
            }

            return <PhoneCard key={product.id} product={product} />;
          },
        )}
      </div>

      {(pagesCount > 1) && (
        <Pagination
          currentPage={currentPage}
          pagesCount={pagesCount}
          onClick={handlePage}
        />
      )}
    </div>
  );
};
