import { ItemsPerPageFields } from '@/types/ItemsPerPageFields';
import { SortFields } from '@/types/SortFields';
import { useSearchParams } from 'react-router-dom';

export const usePaginationParams = () => {
  const [searchParams] = useSearchParams();

  const rawSort = searchParams.get('sort');
  const sort = Object.values(SortFields).includes(rawSort as SortFields)
    ? (rawSort as SortFields)
    : SortFields.Newest;

  const rawPerPage = searchParams.get('perPage');
  const perPage = Object.values(ItemsPerPageFields).includes(
    rawPerPage as ItemsPerPageFields,
  )
    ? (rawPerPage as ItemsPerPageFields)
    : ItemsPerPageFields.All;

  return { sort, perPage };
};
