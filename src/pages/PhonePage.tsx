import { useContext, useEffect, useState } from 'react';
import { ProductList } from '../components/ProductList/ProductList';
import { AppContext } from '../context/AppContext';

export const PhonePage = () => {
  const { products, getPhones } = useContext(AppContext);
  const [sortBy, setSortBy] = useState<string>('');

  useEffect(() => {
    if (!products || products.length === 0) {
      getPhones();
    }
  }, [products, getPhones]);

  const handleSortChange = (selectedSort: string) => {
    setSortBy(selectedSort);
  };

  return (
    <div className="phone__page">

      <ProductList
        products={products}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        onSearch={() => {}}
      />
    </div>
  );
};
