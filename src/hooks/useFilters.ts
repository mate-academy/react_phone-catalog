import { useSearchParams } from 'react-router-dom';

export function useFilters() {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const items = searchParams.get('items') || '';
  const page = searchParams.get('page') || '';
  const query = searchParams.get('query') || '';

  return {
    sort,
    items,
    page,
    query,
  };
}
