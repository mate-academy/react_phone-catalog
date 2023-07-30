import React, { useState } from 'react';
import cn from 'classnames';

import { Product } from '../../types/Product';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import arrowLeft from '../../images/arrows/arrow-left.svg';
import arrowRight from '../../images/arrows/arrow-right.svg';
import { DropDown } from '../../components/DropDown/DropDown';

import './PhonesPage.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

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

  const handlePaginationButtonClick = (page: number) => {
    setCurrentPage(page);
  };

  const generatePageNumbers = () => {
    const totalPageCount = Math.ceil(phonesLength / pageSize);
    const pageNumbers = [];

    for (let i = 1; i <= totalPageCount; i += 1) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handlePaginationLeftClick = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePaginationRightClick = () => {
    const maxPage = Math.ceil(phonesLength / pageSize);

    if (currentPage < maxPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

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

            {showPagination && (
              <div className="PhonesPage__pagination" data-cy="pagination">
                <button
                  type="button"
                  className="PhonesPage__button PhonesPage__button-prev"
                  onClick={handlePaginationLeftClick}
                  data-cy="paginationLeft"
                >
                  <img src={arrowLeft} alt="previous page button" />
                </button>
                {generatePageNumbers().map((pageNumber) => (
                  <button
                    type="button"
                    key={pageNumber}
                    className={cn(
                      'PhonesPage__button',
                      'PhonesPage__button-page',
                      {
                        active: currentPage === pageNumber,
                      },
                    )}
                    onClick={() => handlePaginationButtonClick(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  type="button"
                  className="PhonesPage__button PhonesPage__button-next"
                  onClick={handlePaginationRightClick}
                  data-cy="paginationRight"
                >
                  <img src={arrowRight} alt="next page button" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
