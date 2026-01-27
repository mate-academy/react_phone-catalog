import { useSearchParams } from 'react-router-dom';

export const useProductsSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'year';
  const perPage = searchParams.get('perPage') || 'all';
  const page = Number(searchParams.get('page') || 1);

  const updateParam = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams);

    if (!value || value === 'all') {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    if (key !== 'page') {
      params.delete('page');
    }

    setSearchParams(params);
  };

  return { sort, perPage, page, updateParam };
};
