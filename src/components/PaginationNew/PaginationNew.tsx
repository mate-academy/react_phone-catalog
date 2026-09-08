import { NumberPaginator } from '../NumberPaginator/NumberPaginator';

type Props = {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
};

export const PaginationNew: React.FC<Props> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <div className="paginationNew">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="paginationNew__arrow"
      >
        <img src="img/icons/arrow-left.svg" alt="arrow left" />
      </button>
      <NumberPaginator
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="paginationNew__arrow"
      >
        <img src="img/icons/arrow-right.svg" alt="arrow right" />
      </button>
    </div>
  );
};
