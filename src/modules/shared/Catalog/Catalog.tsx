import React, { useEffect, useMemo, useState } from 'react';
import './Catalog.scss';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../../types/Product';
import { getProductsByCategory } from '../../../services/products';
import { Pagination } from './components/Pagination';
import { Category } from '../../../types/Categories';
import { Dropdown } from './components/Dropdown';
import { ProductList } from '../ProductList';
import { getTitle, sortProducts } from './helpers/helpers';
import { BreadCrumb } from '../BreadCrumb/BreadCrumb';
import { Loader } from '../Loader';
import { ErrorSmthWrong } from '../ErrorMessage';

type Props = {
  category: Category;
};

export const sortBy = [
  { name: 'age', title: 'Newest' },
  { name: 'title', title: 'Alphabetically' },
  { name: 'price', title: 'Cheapest' },
];

export const itemsPerPage = [
  { name: '16', title: '16' },
  { name: '8', title: '8' },
  { name: '4', title: '4' },
  { name: 'all', title: 'All' },
];

const DEFAULT_PER_PAGE = 16;
const DEFAULT_CURRENT_PAGE = 1;

export const Catalog: React.FC<Props> = ({ category }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const title = getTitle(category);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();

  const perPageString = searchParams.get('perPage');
  const sortByParam = searchParams.get('sort') || null;
  const currentPage = searchParams.get('page') || DEFAULT_CURRENT_PAGE;
  const query = searchParams.get('query') || '';

  const perPage = perPageString !== null ? +perPageString : DEFAULT_PER_PAGE;

  const filteredProducts = useMemo(() => {
    if (query) {
      const preparedQuery = query.toLowerCase().split(' ');

      return products.filter(product =>
        preparedQuery.every(word => product.name.toLowerCase().includes(word)),
      );
    } else {
      return [...products];
    }
  }, [products, query]);

  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, sortByParam),
    [filteredProducts, sortByParam],
  );

  const [visibleItems, setVisibleItems] = useState<Product[]>([]);

  useEffect(() => {
    if (perPageString === 'all') {
      setVisibleItems([...sortedProducts]);
    } else {
      setVisibleItems(
        sortedProducts.filter((_, index) => {
          return (
            index >= (+currentPage - 1) * perPage &&
            index < +currentPage * perPage
          );
        }),
      );
    }
  }, [currentPage, perPage, sortedProducts, perPageString, sortByParam]);

  useEffect(() => {
    setError(false);
    setLoading(true);

    getProductsByCategory(Category[category].toLowerCase())
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 200);
      });
  }, [category]);

  const models = useMemo(() => {
    return filteredProducts.length === 1 ? 'model' : 'models';
  }, [filteredProducts.length]);

  const showContent = !error && !loading && !!visibleItems.length;
  const showPagination =
    perPageString !== 'All' && showContent && filteredProducts.length > perPage;

  return (
    <div className="catalog container">
      <BreadCrumb />

      {error && !loading && <ErrorSmthWrong />}

      {!error && <h1 className="catalog__title h1">{title}</h1>}

      {!error && !loading && !!visibleItems.length && (
        <p className="catalog__models">
          {!!products.length
            ? `${filteredProducts.length} ${models}`
            : `There are no ${Category[category].toLowerCase()}`}
        </p>
      )}

      {!error && !loading && !visibleItems.length && (
        <p className="catalog__models">
          {`There are no ${Category[category].toLowerCase()} matching the query`}
        </p>
      )}

      {loading && <Loader />}

      {showContent && (
        <div className="catalog__filter">
          <div className="catalog__filter-item">
            <Dropdown values={sortBy} param="sort" label="Sort by" />
          </div>
          <div className="catalog__filter-item catalog__filter-item--left">
            <Dropdown
              values={itemsPerPage}
              param="perPage"
              label="Items on page"
            />
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="catalog__product-list">
          <ProductList products={visibleItems} />
        </div>
      )}

      {showPagination && (
        <div className="catalog__pagination">
          <Pagination
            total={filteredProducts.length}
            perPage={perPage}
            currentPage={+currentPage}
          />
        </div>
      )}
    </div>
  );
};
