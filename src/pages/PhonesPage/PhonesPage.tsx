import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Product } from '../../types/Product';
import { getSearchWith } from '../../helpers/searchHelper';

import { ProductCard } from '../../components/ProductCard/ProductCard';
import { DropDown } from '../../components/DropDown/DropDown';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Pagination } from '../../components/Pagination/Pagination';

import './PhonesPage.scss';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const sortBy = searchParams.get('sortBy') || 'age';
  const pageSize = searchParams.get('pageSize') || smallestPageSize;
  const currentPage = searchParams.get('currentPage') || 1;

  const handleSortChange = (newValue: string) => {
    setSearchParams(
      getSearchWith(
        searchParams,
        {
          sortBy: newValue || null,
          currentPage: '1' || null,
        },
      ),
    );
  };

  const handlePageSizeChange = (
    newValue: string,
  ) => {
    setSearchParams(
      getSearchWith(
        searchParams,
        {
          pageSize: newValue || null,
          currentPage: '1',
        },
      ),
    );
  };

  const filteredPhones = useMemo(() => {
    return phones.filter(phone => {
      const normalizedQuery = query.toLowerCase().trim();
      const normalizedName = phone.name.toLowerCase().trim();

      return normalizedName.includes(normalizedQuery);
    });
  }, [phones, query]);

  const sortedPhones = useMemo(() => {
    const phonesCopy = [...filteredPhones];

    switch (sortBy) {
      case 'name':
        phonesCopy.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'price':
        phonesCopy.sort((a, b) => a.price - b.price);
        break;

      case 'age':
      default:
        phonesCopy.sort((a, b) => b.age - a.age);
        break;
    }

    return phonesCopy;
  }, [sortBy, filteredPhones]);

  const startIndex = (+currentPage - 1) * +pageSize;
  const endIndex = startIndex + +pageSize;
  const visiblePhones = sortedPhones.slice(startIndex, +endIndex);

  const phonesLength = sortedPhones.length;
  const pageSizes = [smallestPageSize, 8, phonesLength]; // add 16 when will be more phones on API
  const showPagination = phonesLength > smallestPageSize
    && +pageSize !== +phonesLength;

  return (
    <div className="PhonesPage">
      <div className="container">
        {phones.length === 0 ? (
          <h1>Loading...</h1>
        ) : (
          <div className="PhonesPage__content">
            <Breadcrumbs />

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

            {showPagination && phonesLength > 0 && (
              <Pagination
                currentPage={+currentPage}
                pageSize={+pageSize}
                phonesLength={phonesLength}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
