import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export type SortType = 'newest' | 'oldest' | 'priceLow' | 'priceHigh';

interface Props {
  basePath: string;
  defaultItems?: number;
  defaultSort?: SortType;
}

export const usePaginationWithParams = ({
  basePath,
  defaultItems = 12,
  defaultSort = 'newest',
}: Props) => {
  const navigate = useNavigate();
  const { items, sort, page } = useParams();

  const itemsOnPage = items ? +items : defaultItems;
  const sortBy = (sort as SortType) || defaultSort;
  const currentPage = page ? +page : 1;

  useEffect(() => {
    if (!items || !sort || !page) {
      navigate(`${basePath}/${defaultItems}/${defaultSort}/1`, {
        replace: true,
      });
    }
  }, []);

  const changeSort = (value: SortType) => {
    navigate(`${basePath}/${itemsOnPage}/${value}/1`);
  };

  const changeItems = (value: number) => {
    navigate(`${basePath}/${value}/${sortBy}/1`);
  };

  const changePage = (value: number) => {
    navigate(`${basePath}/${itemsOnPage}/${sortBy}/${value}`);
  };

  return {
    sortBy,
    itemsOnPage,
    currentPage,
    changeSort,
    changeItems,
    changePage,
  };
};
