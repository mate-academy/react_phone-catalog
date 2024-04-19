import React from 'react';
import { ProductCard } from '../ProductCard';
import { Product } from '../../../types/Product';
import { Dropdown } from '../Dropdown';
import { Option } from '../../../types/Option';

type Props = {
  title: string;
  routeTitle: string;
  phones: Product[];
};

export const ProductPage: React.FC<Props> = React.memo(
  ({ title, routeTitle, phones }) => {
    const optionsSortBy: Option[] = [
      { label: 'Newest', value: 'newest' },
      { label: 'Lowest price', value: 'lowestPrice' },
      { label: 'Highest price', value: 'highestPrice' },
    ];

    const optionsItemsPerPage: Option[] = [
      { label: '4', value: '4' },
      { label: '8', value: '8' },
      { label: '16', value: '16' },
      { label: '32', value: '32' },
    ];

    // console.log(curentPage);

    return (
      <div className="product-page">
        <div className="product-page__route">
          <img src="/img/icons/home.svg" alt="home" />
          <img src="/img/icons/move-right.svg" alt="to" />
          {routeTitle}
        </div>
        <div className="product-page__title">
          <h2 className="product-page__main-title secondary-title">{title}</h2>
          <h4 className="product-page__sub-title quaternary-title">{`${phones.length} models`}</h4>
        </div>

        <div className="product-page__dropdown-container">
          <Dropdown
            title="Sort by"
            defaultValue={optionsSortBy[0].label}
            options={optionsSortBy}
          />

          <Dropdown
            title="Items per page"
            defaultValue={optionsItemsPerPage[1].label}
            options={optionsItemsPerPage}
          />
        </div>

        {phones.map(phone => (
          <ProductCard key={phone.id} product={phone} hotPrice={false} />
        ))}

        <div className="product-page__navigation">Navigation</div>
      </div>
    );
  },
);
