import React, { useState } from 'react';

import { Product } from '../../types/Product';

import { ProductCard } from '../../components/ProductCard/ProductCard';
import { DropDown } from '../../components/DropDown/DropDown';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Pagination } from '../../components/Pagination/Pagination';

import './PhonesPage.scss';
import { BackButton } from '../../components/BackButton/BackButton';

type Props = {
  phones: Product[];
};

const sortOptions = [
  { value: 'age', label: 'Newest' },
  { value: 'name', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const smallestPageSize = 4;

export const PhonesPage: React.FC<Props> = ({ phones }) => {
  const [sortBy, setSortBy] = useState('age');
  const [pageSize, setPageSize] = useState(smallestPageSize);
  const [currentPage, setCurrentPage] = useState(1);

  const phonesLength = phones.length;
  const pageSizes = [smallestPageSize, 8, phonesLength]; // add 16 when will be more phones on API
  const showPagination = phonesLength > smallestPageSize
    && pageSize !== phonesLength;

  const handleSortChange = (newValue: string) => {
    setSortBy(newValue);
  };

  const handlePageSizeChange = (
    newValue: string,
  ) => {
    setPageSize(parseInt(newValue, 10));
    setCurrentPage(1);
  };

  const sortPhones = () => {
    const sortedPhones = [...phones];

    switch (sortBy) {
      case 'age':
        sortedPhones.sort((a, b) => b.age - a.age);
        break;
      case 'name':
        sortedPhones.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price':
        sortedPhones.sort((a, b) => a.price - b.price);
        break;
      default:
        sortedPhones.sort((a, b) => b.age - a.age);
        break;
    }

    return sortedPhones;
  };

  const sortedPhones = sortPhones();

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visiblePhones = sortedPhones.slice(startIndex, endIndex);

  return (
    <div className="PhonesPage">
      <div className="container">
        {phones.length === 0 ? (
          <h1>Loading...</h1>
        ) : (
          <div className="PhonesPage__content">
            <Breadcrumbs />
            <BackButton />
            <h1 className="PhonesPage__title">Mobile phones</h1>

            <h3 className="PhonesPage__subtitle">{`${phonesLength} models`}</h3>

            <div className="PhonesPage__filters">
              <div className="PhonesPage__filter">
                <div
                  className="PhonesPage__label"
                >
                  Sort by
                </div>
                <DropDown
                  options={sortOptions}
                  value={sortBy}
                  onChange={handleSortChange}
                />
              </div>
              <div className="PhonesPage__filter">
                <div
                  className="PhonesPage__label"
                >
                  Items on page
                </div>
                <DropDown
                  options={pageSizes.map((size) => ({
                    value: String(size),
                    label: size === phonesLength ? 'All' : String(size),
                  }))}
                  value={String(pageSize)}
                  onChange={handlePageSizeChange}
                />
              </div>
            </div>

            <div className="ProductsList" data-cy="productList">
              {visiblePhones.map((phone) => (
                <ProductCard product={phone} key={phone.id} />
              ))}
            </div>

            {showPagination && (
              <Pagination
                currentPage={currentPage}
                pageSize={pageSize}
                phonesLength={phonesLength}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
