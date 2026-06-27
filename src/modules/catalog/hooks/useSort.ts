import { useSearchParams } from 'react-router-dom';

export type SortOption = 'age' | 'title' | 'price';

export const useSort = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSort = searchParams.get('sort');

  const sort: SortOption =
    urlSort === 'age' || urlSort === 'title' || urlSort === 'price'
      ? urlSort
      : 'age';

  const setSort = (newSort: SortOption) => {
    const newParams = new URLSearchParams(searchParams);

    if (newSort === 'age') {
      newParams.delete('sort');
    } else {
      newParams.set('sort', newSort);
    }

    newParams.delete('page');

    setSearchParams(newParams);
  };

  return { sort, setSort };
};
