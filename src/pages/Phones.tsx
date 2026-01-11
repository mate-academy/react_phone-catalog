import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../services/productsApi';
import { selectPreparedProducts } from '../selectors/productsSelectors';
import { Catalog } from '../components/Catalog';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FC } from 'react';
import { Category, Sort } from '../types';
import { RootState } from '../store';
import { Pagination } from '../components/Pagination';

export const PhonesPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const perPageParam = searchParams.get('perPage') || 'all';

  useGetProductsQuery();

  const sortedPhones = useSelector((state: RootState) =>
    selectPreparedProducts(
      state,
      Category.Phones,
      searchParams.get('sort') as Sort,
    ),
  );

  const total = sortedPhones.length;
  const isAll = perPageParam === 'all';
  const itemsPerPage = isAll ? total : Number(perPageParam);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = isAll ? total : startIndex + itemsPerPage;
  const visiblePhones = sortedPhones.slice(startIndex, endIndex);
  const totalPages = Math.ceil(total / itemsPerPage);

  // 3. Функція для зміни параметрів URL
  const handleParamChange = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === 'all' || (name === 'page' && value === '1')) {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    // Якщо змінюємо кількість елементів на сторінці, скидаємо сторінку на 1
    if (name === 'perPage') {
      params.delete('page');
    }

    setSearchParams(params);
  };

  return (
    <div className="">
      <Breadcrumbs className="mt-6" />

      <h1 className="mt-6 text-h1 sm:mt-10">Phones</h1>

      <Catalog products={visiblePhones} />

      {!isAll && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={page => handleParamChange('page', page.toString())}
        />
      )}
    </div>
  );
};
