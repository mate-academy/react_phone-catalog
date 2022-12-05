import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsList } from '../components/ProductsList';
import { Product } from '../types/Product';
import { getProducts } from '../api/products';
import { filterProductByType } from '../helpers/filterProductByType';
import { Title } from '../components/UI/Title';
import { Settings } from '../components/Settings/Settings';

export const PhonesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const loadedProducts = await getProducts();
        const filteredProducts = filterProductByType(loadedProducts, 'phone');

        setProducts(filteredProducts);
      } catch (e) {
        throw new Error('getProducts error');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const sortedProducts = () => {
    switch (sort) {
      case 'name':
        return [...products]
          .sort((p1, p2) => p1.name.localeCompare(p2.name));

      case 'price':
        return [...products]
          .sort((p1, p2) => p1.price - p2.price);

      default:
        return [...products]
          .sort((p1, p2) => p1.age - p2.age);
    }
  };

  return (
    <main className="phones-page" data-cy="productList">
      <div className="phones-page__header">
        <Title title="Mobile phones" />
      </div>
      {!isLoading && (
        <span className="phones-page__count">{`${products.length} models`}</span>
      )}
      <ProductsList
        products={sortedProducts()}
        isLoading={isLoading}
      />
      <Settings />
    </main>
  );
};
