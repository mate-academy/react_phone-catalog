import { QUERY_PARAMS } from '@/shared/constants';
import { useUpdateSearchParams } from '@/shared/hooks/useUpdateSearchParams';

const PAGE_SIZE_OPTIONS = [4, 8, 16, 'all'];
const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 'all';

export const usePagination = () => {
  const { updateSearchParams, searchParams } = useUpdateSearchParams();

  const page = Number(searchParams.get(QUERY_PARAMS.page)) || DEFAULT_PAGE;
  const perPage: number | 'all' =
    Number(searchParams.get(QUERY_PARAMS.perPage)) || DEFAULT_SIZE;

  const handlePageChange = ({ selected }: { selected: number }) => {
    updateSearchParams({
      [QUERY_PARAMS.page]: selected === 0 ? null : String(selected + 1),
    });
  };

  const handleSizeChange = (newSize: number | string) => {
    updateSearchParams({
      [QUERY_PARAMS.page]: null,
      [QUERY_PARAMS.perPage]: newSize === 'all' ? null : String(newSize),
    });
  };

  return {
    page,
    perPage,
    handlePageChange,
    handleSizeChange,
    PAGE_SIZE_OPTIONS,
  };
};
