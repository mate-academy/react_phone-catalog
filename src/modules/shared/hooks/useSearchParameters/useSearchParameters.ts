import { useSearchParams } from 'react-router-dom';

const SORT_OPTIONS = ['age', 'title', 'price'];
const PER_PAGE_OPTIONS = ['4', '8', '16', 'All'];

export const useSearchParameters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawSort = searchParams.get('sort') || 'age';
  const rawPerPage = searchParams.get('perPage') || 'All';
  const rawPage = searchParams.get('page') || '1';

  const sort = SORT_OPTIONS.includes(rawSort) ? rawSort : 'age';
  const perPage = PER_PAGE_OPTIONS.includes(rawPerPage) ? rawPerPage : 'All';
  const page = isNaN(Number(rawPage)) || Number(rawPage) < 1 ? 1 : Number(rawPage);

  const updateSearchWith = (params: { [key: string]: string | number | string[] | null }) => {
    const newParams = new URLSearchParams();
    const currentState = {
      sort: sort,
      perPage: perPage,
      page: String(page),
      ...params,
    };

    Object.entries(currentState).forEach(([key, value]) => {
      const isDefaultPage = key === 'page' && value === '1';
      const isDefaultPerPage = key === 'perPage' && value === 'All';
      const isRemoval = value === null || isDefaultPage || isDefaultPerPage;

      if (!isRemoval) {
        newParams.set(key, String(value));
      }
    });

    setSearchParams(newParams);
  };

  return {
    sort,
    perPage,
    page,
    updateSearchWith,
  };
};
