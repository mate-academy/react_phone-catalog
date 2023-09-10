import { useSearchParams } from 'react-router-dom';
import '../../styles/components/Pagination/Pagination.scss';
import { getNumbers } from '../../utils/getNumbers';
import { Button } from '../Button';
import { Params, getSearchWith } from '../../utils/routerService';

type Props = {
  total: number;
};

export const Pagination: React.FC<Props> = ({
  total,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = +(searchParams.get('page') || 0);
  const perPage = +(searchParams.get('perPage') || 16);

  const totalPages = Math.ceil(total / perPage);

  const setSearchWith = (params: Params) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const handleNextPage = () => {
    setSearchWith({ page: currentPage + 1 });
  };

  const handlePrevPage = () => {
    setSearchWith({ page: currentPage - 1 });
  };

  return (
    <section className="pagination">
      <Button
        style={{ width: '32px' }}
        content="arrow"
        arrowDirection="left"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      />
      <div className="pagination__buttons-container">
        {getNumbers(totalPages, 1).map(number => (
          <Button
            style={{ width: '32px' }}
            content="text"
            onClick={() => setSearchWith({ page: number })}
            isActive={currentPage === number}
          >
            {number}
          </Button>
        ))}
      </div>
      <Button
        style={{ width: '32px' }}
        content="arrow"
        arrowDirection="right"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      />
    </section>
  );
};
