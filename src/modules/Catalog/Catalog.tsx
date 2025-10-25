/* eslint-disable prettier/prettier */
import styles from './Catalog.module.scss';
import classNames from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Form } from './components/Form/Form';
import { ProductList } from '../shared/ProductList/ProductList';
import { SortDir, SortField } from './types/sort';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { getProducts } from '../../utils/fetchProducts';
import { CategoryTypes } from '../../types/CategoryTypes';
import { Product } from '../../types/data';
import { Pagination } from '../shared/Pagination/Pagination';
import { Error } from './components/Error/Error';
import { Loader } from '../shared/Loader/Loader';

const allowedCategories: string[] = Object.values(CategoryTypes);

function sort(list: Product[], sortField: SortField, backOrder: boolean) {
  const result = [...list];

  result.sort((a, b) => {
    switch (sortField) {
      case SortField.Name:
        return !backOrder
          ? a[sortField].localeCompare(b[sortField])
          : b[sortField].localeCompare(a[sortField]);
      case SortField.Year:
      case SortField.Price:
        return !backOrder
          ? a[sortField] - b[sortField]
          : b[sortField] - a[sortField];
      default:
        return 0;
    }
  });

  return result;
}

export const Catalor: React.FC = () => {
  const category = useParams().product;
  const isInvalidCategory = !category || !allowedCategories.includes(category);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [itemsList, setItemsList] = useState<Product[]>([]);
  const [sortField, setSortField] = useState<SortField>(SortField.Year);
  const [sortDirection, setSortDirection] = useState<SortDir>(SortDir.ASC);
  const section = useRef<HTMLElement>(null);
  const [pageCount, setPageCount] = useState(1);
  const [searchParams] = useSearchParams();
  const [errorKey, setErrorKey] = useState<number>(0);

  const filtredList: Product[] = useMemo(() => {
    const sortedList: Product[] = sort(
      itemsList,
      sortField,
      sortDirection === SortDir.DESC,
    );

    const perPage = searchParams.get('perPage');
    const page = searchParams.get('page');

    if (perPage && page) {
      const startIndex = +page * +perPage;
      const lastIndex = startIndex + +perPage;

      setPageCount(Math.ceil(itemsList.length / +perPage));

      return sortedList.slice(startIndex, lastIndex);
    } else {
      setPageCount(1);

      return sortedList;
    }
  }, [itemsList, sortField, sortDirection, searchParams]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    console.log(errorKey);

    if (isInvalidCategory) {
      return;
    }

    getProducts()
      .then(result => {
        const list = result.filter(p => p.category === category);

        setItemsList(list);
        setError(false);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [category, isInvalidCategory, errorKey]);

  if (isInvalidCategory) {
    return <Navigate to="/404" replace />;
  }

  return (
    <section className={classNames(styles.catalog)} ref={section}>
      <header className={classNames(styles.catalog__header)}>
        <h1 className={classNames(styles.catalog__title)}>{category}</h1>
        <div className={classNames(styles.catalog__caption)}>
          {itemsList.length} models
        </div>
      </header>
      <div className={classNames(styles.catalog__form)}>
        <Form
          sortFiled={sortField}
          setSort={setSortField}
          sortDitrection={sortDirection}
          setDirection={setSortDirection}
        />
      </div>
      {(loading && <Loader />) ||
        (error && <Error setKey={setErrorKey} />) || (
        <div className={classNames(styles.catalog__list)}>
          <ProductList list={filtredList} />
        </div>
      )}
      {pageCount > 1 && (
        <footer className={classNames(styles.catalog__pagination)}>
          <Pagination pagesCount={pageCount} />
        </footer>
      )}
    </section>
  );
};
