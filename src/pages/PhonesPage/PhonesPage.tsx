import { useState } from 'react';
import './PhonesPage.scss';
import { useProducts } from '../../context';
import { ProductCard } from '../../components/ProductCard';
import { Dropdown } from '../../bits';

const sortOptions = ['Alphabetically', 'Newest', 'Cheapest'];
const itemsOptions = ['All', '4', '8', '16'];

export const PhonesPage = () => {
  const { products } = useProducts();
  const [sortBy, setSortBy] = useState('');
  const [itemsToShow, setItemsToShow] = useState('');

  console.log('selekwn:', sortBy);
  console.log('selekwn:', itemsToShow);

  const handleSortBy = (option: string) => {
    setSortBy(option);
  };

  const handleItemToShow = (item: string) => {
    setItemsToShow(item);
  };

  return (
    <div className="phones">
      <div className="phones__selects-container">
        <Dropdown
          setSelection={handleSortBy}
          title="Sort by"
          options={sortOptions}
        />

        <Dropdown
          title="Items on page"
          options={itemsOptions}
          setSelection={handleItemToShow}
        />
      </div>

      <div className="phones__list">
        {products.map(phone => (
          <ProductCard
            key={phone.id}
            product={phone}
          />
        ))}
      </div>
    </div>
  );
};
