import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Title } from './UI/Title';
import { ProductsList } from './ProductsList';
import { Settings } from './Settings';
import { getProducts } from '../api/products';
import { filterProductByType } from '../helpers/filterProductByType';
import { Product } from '../types/Product';
import { updateSearch } from '../helpers/updateSearch';

type Props = {
  title: string;
};
export const Catalog: FC<Props> = ({ title }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const totalItems = products.length;

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '4';
  const page = searchParams.get('page') || '1';

  const start = +perPage * +page - (+perPage - 1);
  const end = (+perPage * +page) <= totalItems
    ? (+perPage * +page)
    : totalItems;

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
  const sortProducts = () => {
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

  const getVisibleProducts = () => {
    const sortedProducts = sortProducts();

    return sortedProducts.slice(start - 1, end);
  };

  const onChangeSortValue = (value: string) => {
    setSearchParams(
      updateSearch(
        searchParams,
        { sort: value },
      ),
    );
  };

  const onChangeProductsPerPage = (value: string) => {
    setSearchParams(
      updateSearch(
        searchParams,
        { perPage: value, page: null },
      ),
    );
  };

  return (
    <main className="catalog" data-cy="productList">
      <div className="catalog__header">
        <Title title={title} />
      </div>
      {!isLoading && (
        <span className="catalog__count">{`${products.length} models`}</span>
      )}
      <Settings
        sort={sort}
        perPage={perPage}
        page={page}
        totalItems={totalItems}
        setSort={onChangeSortValue}
        setPage={onChangeProductsPerPage}
      >
        <ProductsList
          products={getVisibleProducts()}
          isLoading={isLoading}
        />
      </Settings>
    </main>
  );
};
