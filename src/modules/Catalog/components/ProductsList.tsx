import { useState } from 'react';
import { Product } from '../../../api/types';
import { Dropdowns } from './Dropdowns';
import scss from './ProductsList.module.scss';
import { ProductCard } from '../../shared/components/ProductCard';

interface Props {
  items: Product[];
}

export const ProductsList: React.FC<Props> = ({ items }) => {
  const [sortedItems, setSortedItems] = useState(
    items.sort((a, b) => b.year - a.year),
  );

  const [selectedValue, setSelectedValue] = useState<string>('newest');

  const sortByOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price', label: 'Cheapest' },
    { value: 'name', label: 'Alphabetically' },
  ];

  const sortBy = (value: string) => {
    switch (value) {
      case 'newest':
        setSortedItems([...sortedItems].sort((a, b) => b.year - a.year));
        setSelectedValue('newest');
        break;
      case 'price':
        setSortedItems([...sortedItems].sort((a, b) => a.price - b.price));
        setSelectedValue('price');
        break;
      case 'name':
        setSortedItems(
          [...sortedItems].sort((a, b) => a.name.localeCompare(b.name)),
        );
        setSelectedValue('name');
        break;
    }
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
