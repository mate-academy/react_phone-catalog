import './ProductsPage.scss';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';

import { Pagination } from '../../components/pagination/Pagination';
import { Product } from '../../types/Product';
import { ProductCard } from '../../components/productCard/ProductCard';
import { getProductsByCategory } from '../../services/api/api';
import { Sorter } from '../../components/sorter/Sorter';
import { BreadCrumbs } from '../../components/breadcrumbs';
import { ProductsContext } from '../../context/ProductsContext';
import { ItemCardSkeleton } from '../../components/skeleton/ItemCardSkeleton';

type Props = {
  category: string;
};

export const ProductsPage: React.FC<Props> = ({ category }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('Newest');
  const [error, setError] = useState('');

  const context = useContext(ProductsContext);
  const { setIsLoading, isLoading } = context;

  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = searchParams.get('perPage') || 'all';
  const sort = searchParams.get('sort') || 'age';

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const products = await getProductsByCategory(category.toLowerCase());

      if (products.length === 0) {
        setError(`There are no ${category.toLowerCase()} yet.`);
      } else {
        setAllProducts(products);
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [category, setIsLoading]);

  useEffect(() => {
    fetchProducts();
  }, [category, fetchProducts]);

  const visibleProducts = useMemo(() => {
    const sortedProducts = [...allProducts].sort((a, b) => {
      switch (sort) {
        case 'age':
          return b.year - a.year;
        case 'title':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        default:
          return 0;
      }
    });

    if (perPage === 'all') {
      return sortedProducts;
    }

    const startIndex = (page - 1) * +perPage;

    return sortedProducts.slice(startIndex, startIndex + +perPage);
  }, [sort, perPage, page, allProducts]);

  useEffect(() => {
    switch (sort) {
      case 'age':
        setSortBy('Newest');
        break;
      case 'title':
        setSortBy('Alphabetically');
        break;
      case 'price':
        setSortBy('Cheapest');
        break;
      default:
        setSortBy('');
    }
  }, [sort]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams);

      if (newPage === 1) {
        params.delete('page');
      } else {
        params.set('page', newPage.toString());
      }

      setSearchParams(params);
    },
    [setSearchParams, searchParams],
  );

  const title = category !== 'Phones' ? category : 'Mobile phones';

  return (
    <main className="products-page">
      <BreadCrumbs category={category} />

      <h2 className="products-page__title">{title}</h2>
      <p className="products-page__models-title">{`${allProducts.length} models`}</p>

      <Sorter
        sortBy={sortBy}
        perPage={`${perPage}`}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />

      {error ? (
        <div className="products-page__error">
          <p>{error}</p>
          {error === 'Something went wrong' && (
            <button
              type="button"
              className="products-page__error-link"
              onClick={fetchProducts}
            >
              reload
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="products-page__phone-cards">
            {isLoading ? (
              <>
                <ItemCardSkeleton />
                <ItemCardSkeleton />
                <ItemCardSkeleton />
                <ItemCardSkeleton />
                <ItemCardSkeleton />
                <ItemCardSkeleton />
                <ItemCardSkeleton />
              </>
            ) : (
              visibleProducts.map(product => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  fullPrice={product.fullPrice}
                  screen={product.screen}
                  capacity={product.capacity}
                  ram={product.ram}
                  product={product}
                />
              ))
            )}
          </div>
          {`${perPage}` !== 'all' && +perPage < allProducts.length && (
            <Pagination
              total={allProducts.length}
              perPage={+perPage}
              currentPage={+page}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </main>
  );
};
