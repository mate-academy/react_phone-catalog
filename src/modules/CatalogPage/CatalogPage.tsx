import { useEffect, useState } from 'react';
import { CardList } from '../shared/CardList/CardList';
import type { Product } from '../../types/Product';
import { getProducts } from '../../api';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { capitalizeFirstLetter } from '../../utils/string';
import s from './CatalogPage.module.scss';
import { Dropdown } from '../shared/Dropdown';
import { Pagination } from '../shared/Pagination';

const sortOptions = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const paginationOptions = [
  { value: 'all', label: 'All' },
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
];

const getPreparedProducts = (
  products: Product[],
  sort: string,
  page: number,
  perPage: number | string,
) => {
  let preparedProducts = [...products];

  if (sort) {
    preparedProducts = preparedProducts.sort((p1, p2) => {
      switch (sort) {
        case 'title':
          return p1.name.localeCompare(p2.name);
        case 'price':
          return p1.price - p2.price;
        case 'age':
          return p2.year - p1.year;
        default:
          return 0;
      }
    });
  }

  if (perPage !== 'all') {
    const startItem = (+page - 1) * +perPage;
    const endItem = startItem + +perPage;

    return [...preparedProducts].slice(startItem, endItem);
  }

  return preparedProducts;
};

export const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const page = searchParams.get('page') || '1';
  const type = pathname.slice(1);

  useEffect(() => {
    getProducts<Product>('products').then(setProducts);
  }, []);

  const productsByType = products.filter(product => product.category === type);

  const preparedProducts = getPreparedProducts(
    productsByType,
    sortBy,
    +page,
    perPage,
  );

  return (
    <div>
      <Breadcrumbs type={type} />
      <h1 className={s.catalog__title}>{capitalizeFirstLetter(type)}</h1>
      <p className={s.catalog__amount}>{productsByType.length} models</p>

      <div className={s.catalog__filters}>
        <div className={s.catalog__filterSort}>
          <div className={s.catalog__filterName}>Sort by</div>
          <Dropdown options={sortOptions} value={sortBy} paramKey="sort" />
        </div>
        <div className={s.catalog__filterPage}>
          <div className={s.catalog__filterName}>Items on page</div>
          <Dropdown
            options={paginationOptions}
            value={perPage}
            paramKey="perPage"
          />
        </div>
      </div>

      <div className={s.catalog__products}>
        <CardList products={preparedProducts} />
      </div>

      {perPage !== 'all' && (
        <div className={s.catalog__pagination}>
          <Pagination
            total={productsByType.length}
            perPage={+perPage}
            currentPage={+page}
          />
        </div>
      )}
    </div>
  );
};
