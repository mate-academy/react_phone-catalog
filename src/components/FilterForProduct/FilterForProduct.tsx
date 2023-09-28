import React from 'react';
import { OptionsForSort } from '../../types/OptionsForSort';
import { Select } from '../Select/Select';
import './FilterForProduct.scss';
import { SearchParams } from '../../types/SearchParams';

const optionsForSort = [
  { key: OptionsForSort.AgeKey, name: OptionsForSort.AgeName },
  { key: OptionsForSort.NameKey, name: OptionsForSort.NameName },
  { key: OptionsForSort.PriceKey, name: OptionsForSort.PriceName },
];

const quantityPerPage = [
  { key: OptionsForSort.NumberFour, name: OptionsForSort.NumberFour },
  { key: OptionsForSort.NumberEight, name: OptionsForSort.NumberEight },
  { key: OptionsForSort.NumberSixteen, name: OptionsForSort.NumberSixteen },
];

export const FilterForProduct: React.FC = () => {
  return (
    <div className="phones-filter">
      <div className="phones-filter__sort">
        <p>Sort by</p>

        <Select
          options={optionsForSort}
          searchParam={SearchParams.Sort}
        />
      </div>

      <div className="phones-filter__quantity-items">
        <p>Items on page</p>

        <Select
          options={quantityPerPage}
          searchParam={SearchParams.ShownCards}
        />
      </div>
    </div>
  );
};
