import React, { useMemo, useState } from 'react';
import { ProductsList } from '../../Components/ProductsList/ProductsList';
import { Product } from '../../Helpers/types/Product';
import './SearchPage.scss';

type Props = {
  appliedQuery: string,
  products: Product[],
};

export const SearchPage: React.FC<Props> = ({ appliedQuery, products }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useMemo(() => {
    setFilteredProducts(products.filter((item: Product) => {
      return item.name.toLowerCase().includes(appliedQuery.toLowerCase());
    }));
  }, [appliedQuery, products]);

  return (
    <div className="SearchPage">
      <p className="body-text body-text--light SearchPage__qty">
        {`${filteredProducts.length} ${filteredProducts.length === 1 ? 'result' : 'results'}`}
      </p>
      <ProductsList products={filteredProducts} />
    </div>
  );
};
