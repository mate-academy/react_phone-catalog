import { useState } from 'react';
import { Product } from '../../../api/types';
import { Dropdowns } from './Dropdowns';
import scss from './ProductsList.module.scss';
import { ProductCard } from '../../shared/components/ProductCard';
import { useSearchParams } from 'react-router-dom';

interface Props {
  items: Product[];
}

export const ProductsList: React.FC<Props> = ({ items }) => {
  const [sortedItems, setSortedItems] = useState(
    items.sort((a, b) => b.year - a.year),
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedValue = searchParams.get('sort') || 'age';

  const sortByOptions = [
    { value: 'age', label: 'Newest' },
    { value: 'price', label: 'Cheapest' },
    { value: 'title', label: 'Alphabetically' },
  ];

  const sortBy = (value: string) => {
    switch (value) {
      case 'age':
        setSortedItems([...sortedItems].sort((a, b) => b.year - a.year));
        break;
      case 'price':
        setSortedItems([...sortedItems].sort((a, b) => a.price - b.price));
        break;
      case 'title':
        setSortedItems(
          [...sortedItems].sort((a, b) => a.name.localeCompare(b.name)),
        );
        break;
    }

    setSearchParams(
      prevParams => {
        prevParams.set('sort', value);

        return prevParams;
      },
      { replace: true },
    );
  };

  return (
    <div className={scss.productsList}>
      <Dropdowns
        label="Sort by"
        options={sortByOptions}
        selectedValue={selectedValue}
        onSelect={value => sortBy(value)}
      />
      <ul className={scss.productsList__itemsList}>
        {sortedItems.map(item => (
          <li key={item.id} className={scss.productsList__item}>
            <ProductCard product={item} hasDiscount={false} />
          </li>
        ))}
      </ul>
    </div>
  );
};
