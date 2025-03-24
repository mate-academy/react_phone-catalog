import { useEffect, useState } from 'react';
import { CurrentPage } from '../../components/CurrentPage';
import s from './ModelsPage.module.scss';
import { getProducts } from '../../httpClient';
import { Card } from '../../components/Card';
import { Product } from '../../types/Product';
import { SORT_BY, SortByKeys } from '../../constants';
import { Button } from '../../components/Button';
import { useParams, useSearchParams } from 'react-router-dom';
import cl from 'classnames';
import { Filter } from '../../components/Filter';
import { getFilteredData } from '../../services/products';
import { Loader } from '../../components/Loader';
import { getUpperFirstChar } from '../../someMethods';
import { useSetError } from '../../context/ErrorContext';

export const ModelsPage: React.FC = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const page = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 16;
  const sortBy = (searchParams.get('sortBy') || SORT_BY.newest) as SortByKeys;
  const [loading, setIsLoading] = useState(false);
  const setError = useSetError();

  useEffect(() => {
    document.title = `Nice Gadgets | ${getUpperFirstChar(category as string)}`;
    getProducts()
      .then((data: Product[]) => {
        const defaultParams = {
          page: '1',
          perPage: '16',
          sortBy: 'newest',
        };

        const filteredData = getFilteredData(data, category as string, sortBy);

        setProducts(filteredData);

        setSearchParams(defaultParams, { replace: true });
      })
      .catch(() => setError('Something went wrong :('))
      .finally(() => setIsLoading(false));
  }, [category]);

  useEffect(() => {
    const filteredData = getFilteredData(products, category as string, sortBy);

    setProducts(filteredData);
  }, [sortBy]);

  const buttonsCount = Array.from(
    { length: Math.ceil(products.length / perPage) },
    (_, i) => i + 1,
  );

  const last = perPage * page;
  const start = last - perPage;
  const productsToShow = products.slice(start, last);

  const handleChangeSearch = async (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(key, value);
    setSearchParams(params, { replace: true });
  };

  const handleChangePage = (str: 'left' | 'right') => {
    if (str === 'left') {
      handleChangeSearch('page', String(page - 1));
    } else {
      handleChangeSearch('page', String(page + 1));
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={s.ModelsPage}>
      <div className={s.ModelsPage__currentPage}>
        <CurrentPage
          category={category as string}
          productsLength={products.length}
        />
      </div>

      <Filter sortField="sortBy" />
      <Filter sortField="perPage" />

      <div className={s.ModelsPage__cards}>
        {productsToShow.map(p => (
          <div key={p.id} className={s.ModelsPage__card}>
            <Card product={p} isHot />
          </div>
        ))}
      </div>

      <div className={s.ModelsPage__pagination}>
        <Button
          direction="arrowLeft"
          disabled={page === 1}
          onClick={() => handleChangePage('left')}
        />
        {buttonsCount.map((e, i) => (
          <button
            onClick={() => handleChangeSearch('page', String(e))}
            className={cl(s.ModelsPage__button, {
              [s.ModelsPage__buttonActive]: page === +e,
            })}
            key={i}
          >
            {e + ''}
          </button>
        ))}
        <Button
          direction="arrowRight"
          disabled={page === buttonsCount.length}
          onClick={() => handleChangePage('right')}
        />
      </div>
    </div>
  );
};
