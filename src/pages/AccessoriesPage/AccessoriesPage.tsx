import { useEffect, useRef, useState } from 'react';
import { PerPage } from '../../types/PerPage';
import { SortBy } from '../../types/SortBy';
import { Product } from '../../types/Product';
import { useSearchParams } from 'react-router-dom';
import { SearchParams } from '../../types/SearchParams';
import { getProducts } from '../../api/products';
import { ProductCategories } from '../../types/ProductCategories';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Filter } from '../../components/Filter';
import { ProductsList } from '../../components/ProductsList';
import { Pagination } from '../../components/Pagination';
import './AccessoriesPage.scss';

const DEF_SORT = SortBy.NEWEST;
const DEF_DISPLAYED = PerPage.EIGHT;

export const AccessoriesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagesNumber, setPagesNumber] = useState(1);
  const [searchParams] = useSearchParams();
  const [hasError, setHasError] = useState(false);
  const perPage = +(searchParams.get(SearchParams.PER_PAGE) ?? DEF_DISPLAYED);
  const listRef = useRef<HTMLDivElement>(null);

  const loadProducts = async () => {
    try {
      const productsFromServer = await getProducts();
      const accessories = productsFromServer.filter(
        product => product.category === ProductCategories.ACCESSORIES,
      );

      setProducts(accessories);
    } catch (error) {
      setHasError(true);
      throw error;
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (perPage === 0) {
      setPagesNumber(1);

      return;
    }

    setPagesNumber(Math.floor(products.length / perPage) || 1);
  }, [perPage, products.length]);

  const scrollToTop = () => {
    if (listRef.current) {
      const list = listRef.current as HTMLDivElement;

      list.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="accessories-page container">
      <div className="accessories-page__breadcrumbs">
        <Breadcrumbs />
      </div>

      <h1 className="accessories-page__title">Mobile phones</h1>
      <p className="accessories-page__models-count">
        {products.length > 0 ? `${products.length} models` : 'Loading...'}
      </p>

      <div className="accessories-page__filter">
        <Filter DEF_DISPLAYED={DEF_DISPLAYED} DEF_SORT={DEF_SORT} />
      </div>

      <div className="accessories-page__product-list" ref={listRef}>
        <ProductsList products={products} hasError={hasError} />
      </div>

      {pagesNumber > 1 && perPage > 0 && (
        <Pagination pagesNumber={pagesNumber} scrollToTop={scrollToTop} />
      )}
    </main>
  );
};
