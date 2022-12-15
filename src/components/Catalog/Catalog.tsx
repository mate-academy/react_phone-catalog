import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Title } from '../UI/Title/Title';
import { ProductsList } from '../ProductList/ProductsList';
import { Settings } from '../Settings';
import { updateSearch } from '../../helpers/updateSearch';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/products';
import { filterProductByType } from '../../helpers/filterProductByType';
import './Catalog.scss';

type Props = {
  title: string;
  productType: 'phone' | 'tablet' | 'accessory';
};
export const Catalog: FC<Props> = (
  { title, productType },
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
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
      try {
        const loadedProducts = await getProducts();
        const filteredProducts = filterProductByType(
          loadedProducts, productType,
        );

        setProducts(filteredProducts);
      } catch (e) {
        throw new Error('getProducts error');
      } finally {
        setIsLoaded(true);
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
      {isLoaded && (
        <span className="catalog__count">{`${products.length} models`}</span>
      )}
      {isLoaded && totalItems === 0 ? (
        <p className="catalog__not-found">{`${title} not found`}</p>
      ) : (
        <Settings
          sort={sort}
          perPage={perPage}
          page={page}
          totalItems={totalItems}
          setSort={onChangeSortValue}
          setPage={onChangeProductsPerPage}
        >
          <div className="catalog__product-list">
            <ProductsList
              products={getVisibleProducts()}
              isLoaded={isLoaded}
            />
          </div>
        </Settings>
      )}
    </main>
  );
};
