import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useProductsParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Стан для сортування, кількості на сторінці та нинішньої сторінки
  const [sort, setSort] = useState('year');
  const [perPage, setPerPage] = useState<number | 'all'>(16);
  const [page, setPage] = useState(1);

  // Читаємо параметри з URL коли завантажується компонент
  useEffect(() => {
    const sortParam = searchParams.get('sort');
    const perPageParam = searchParams.get('perPage');
    const pageParam = searchParams.get('page');

    if (sortParam) {
      setSort(sortParam);
    }

    if (perPageParam === 'all') {
      setPerPage('all');
    } else if (perPageParam) {
      setPerPage(Number(perPageParam));
    }

    if (pageParam) {
      setPage(Number(pageParam));
    }
  }, [searchParams]);

  // Оновлюємо URL при зміні значень
  useEffect(() => {
    const params: Record<string, string> = {};

    if (sort !== 'year') {
      params.sort = sort;
    }

    if (perPage !== 16) {
      params.perPage = perPage.toString();
    }

    if (page !== 1) {
      params.page = page.toString();
    }

    setSearchParams(params);
  }, [sort, perPage, page, setSearchParams]);

  return {
    sort,
    setSort,
    perPage,
    setPerPage,
    page,
    setPage,
  };
};
