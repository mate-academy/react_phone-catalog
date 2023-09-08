import { useState } from 'react';
import './PhonesPage.scss';
import { useProducts } from '../../context';
import { ProductCard } from '../../components/ProductCard';
import { Dropdown } from '../../bits';
import { PathDisplay } from '../../components';

const sortOptions = ['Alphabetically', 'Newest', 'Cheapest'];
const itemsOptions = ['All', '4', '8', '16'];

export const PhonesPage = () => {
  const { products } = useProducts();
  const [sortBy, setSortBy] = useState('');
  const [itemsToShow, setItemsToShow] = useState('');

  const phonesQuantity = products.length;

  const handleSortBy = (option: string) => {
    setSortBy(option);
  };

  const handleItemToShow = (item: string) => {
    setItemsToShow(item);
  };

  return (
    <div className="phones">
      <div>{`${sortBy} ${itemsToShow}`}</div>

      <div className="phones__path-container">
        <PathDisplay />
      </div>

      <div className="phones__heading">
        <h1 className="phones__title">Mobile Phones</h1>
        <p className="phones__quantity">{`${phonesQuantity} items`}</p>
      </div>

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

      <div
        className="phones__list"
        data-cy="productList"
      >
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
