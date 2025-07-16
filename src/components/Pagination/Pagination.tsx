import { useSearchParams } from 'react-router-dom';
import paginationStyle from './Pagination.module.scss';

interface Props {
  itemsLength: number;
  currentPage: number;
  setCurrentPage: (arg: number) => void;
}

const Pagination: React.FC<Props> = ({
  itemsLength,
  currentPage,
  setCurrentPage,
}) => {
  const [searchParams] = useSearchParams();

  const perItems = searchParams.get('quantity') || 16;
  const pageQuantity = Math.ceil(itemsLength / +perItems);

  return (
    <>
      <div className={paginationStyle.pagination}>
        {Array.from({ length: pageQuantity }).map((_, i) => {
          return (
            <button
              key={i}
              className={paginationStyle['pagination__button-simple']}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Pagination;
