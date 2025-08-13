import React, { useEffect, useState } from 'react';

import { Product } from '../../utils/Product';
import { ProductCard } from '../ProductCard';
import './AllItemsList.scss';
import { SelectBox } from '../SelectBox';

type Props = {
  path: string;
  allItems: Product[];
  setAllItems: (el: Product[]) => void;
};

enum SortOptions {
  Newest = 'Newest',
  Alphabetically = 'Alphabetically',
  Cheapest = 'Cheapest',
}

// enum FilterOptions {
//   All = 'All',
//   Available = 'Available',
//   OutOfStock = 'OutOfStock',
// }

export const AllItemsList: React.FC<Props> = ({
  path,
  allItems,
  setAllItems,
}) => {
  const [sort, setSort] = useState<SortOptions>(SortOptions.Newest);
  const [perPageStr, setPerPageStr] = useState<string>('8'); 
  // const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await fetch(path);
        const json: Product[] = await res.json();

        setAllItems(json);
      } catch (e) {}
    };

    getItems();
  }, []);

  return (
    <div className="catalog">
      <div className="catalog__filters">
        <SelectBox
          value={sort}
          onChange={value => setSort(value as SortOptions)}
          options={[
            { label: 'Newest', value: SortOptions.Newest },
            { label: 'Alphabetically', value: SortOptions.Alphabetically },
            { label: 'Cheapest', value: SortOptions.Cheapest },
          ]}
          title="Sort by"
        />

        <SelectBox
          title="Items on page"
          value={perPageStr}
          onChange={setPerPageStr}
          options={[
            { label: '4', value: '4' },
            { label: '8', value: '8' },
            { label: '16', value: '16' },
            { label: 'All', value: 'all' },
          ]}
        />
      </div>

      <div className="catalog__list">
        {allItems.map(item => (
          <ProductCard product={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
