import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductList } from '../components/ProductList/ProductList';
import { AppContext } from '../context/AppContext';
import { Product } from '../type/Product';

export const PhonePage = () => {
  const { products, getPhones } = useContext(AppContext);
  const [sortBy, setSortBy] = useState<string>('age');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryParamValue = queryParams.get('query') || '';
  const [searchQuery, setSearchQuery] = useState<string>(queryParamValue);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    if (!products || products.length === 0) {
      getPhones();
    }
  }, [products, getPhones]);

  useEffect(() => {
    setSearchQuery(queryParamValue);
  }, [queryParamValue]);

  useEffect(() => {
    const filtered = products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
      || (product.color && product.color.toLowerCase().includes(searchQuery.toLowerCase())));

    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <div className="phone__page">
      <ProductList
        products={filteredProducts}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
    </div>
  );
};
