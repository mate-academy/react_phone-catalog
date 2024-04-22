import React, { useState } from 'react';
import { ProductCard } from '../ProductCard';
import { Product } from '../../../types/Product';
import { Dropdown } from '../Dropdown';
import { Option } from '../../../types/Option';
import { getNumbers } from '../../../services/getNumbers';
import { Pagination } from '../Pagination';
import { getItemsPerPage } from '../../../services/getItemsPerPage';

type Props = {
  title: string;
  routeTitle: string;
  dataLoaded: boolean;
  phones: Product[];
  // perPage: (item: number) => void;
};

const optionsItemsPerPage: Option[] = [
  { value: '4' },
  { value: '8' },
  { value: '16' },
  { value: 'All' },
];

const optionsSortBy: Option[] = [
  { value: 'Newest' },
  { value: 'Alphabetically' },
  { value: 'Cheapest' },
];

export const ProductPage: React.FC<Props> = React.memo(
  ({ title, routeTitle, phones }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectSortBy, setSelectSortBy] = useState(optionsSortBy[0].value);
    const [itemsPerPage, setItemsPerPage] = useState(
      optionsItemsPerPage[1].value,
    );

    const productsPerPage = getItemsPerPage(itemsPerPage, phones.length);

    const items = getNumbers(
      (currentPage - 1) * productsPerPage + 1,
      Math.min(currentPage * productsPerPage, phones.length),
    );

    return (
      <div className="product-page">
        <div className="product-page__route">
          <img src="/img/icons/home.svg" alt="home" />
          <img src="/img/icons/move-right.svg" alt="to" />
          {routeTitle}
        </div>

        <div className="product-page__title">
          <h2 className="product-page__main-title secondary-title">{title}</h2>
          <h4 className="product-page__sub-title quaternary-title">
            {`${phones.length} models`}
          </h4>
        </div>

        <div className="product-page__dropdown-container">
          <Dropdown
            title="Sort by"
            defaultValue={selectSortBy}
            options={optionsSortBy}
            setSelectValue={value => setSelectSortBy(value)}
            resetCurrentPage={() => setCurrentPage(1)}
          />

          <Dropdown
            title="Items per page"
            defaultValue={itemsPerPage}
            options={optionsItemsPerPage}
            setSelectValue={value => setItemsPerPage(value)}
            resetCurrentPage={() => setCurrentPage(1)}
          />
        </div>

        <div className="product-page__product-card-container">
          {items.map(item => (
            <ProductCard
              key={item}
              product={phones[item - 1]}
              hotPrice={false}
            />
          ))}
        </div>

        {items.length !== phones.length && (
          <div className="product-page__navigation">
            <Pagination
              total={phones.length}
              perPage={productsPerPage}
              currentPage={currentPage}
              onPageChange={page => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    );
  },
);
