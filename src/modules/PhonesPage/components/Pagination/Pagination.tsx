import './Pagination.scss';
import LeftArrow from './../../../../img/left-arrow.png';
import RightArrow from './../../../../img/right-arrow.png';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const visibleButtons = 4;

  let startPage =
    Math.floor((currentPage - 1) / visibleButtons) * visibleButtons + 1;

  if (startPage + visibleButtons - 1 > totalPages) {
    startPage = Math.max(totalPages - visibleButtons + 1, 1);
  }

  const pages = [];

  for (
    let i = startPage;
    i < startPage + visibleButtons && i <= totalPages;
    i++
  ) {
    pages.push(i);
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    onPageChange(page);
  };

  return (
    <div className="pagination">
      <button
        className={`pagination__prev ${currentPage === 1 ? 'is-disabled' : ''}`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src={LeftArrow} alt="arrow" />
      </button>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`pagination__button ${currentPage === page ? 'pagination__active' : ''}`}
        >
          {page}
        </button>
      ))}
      <button
        className={`pagination__next ${currentPage === totalPages ? 'is-disabled' : ''}`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img src={RightArrow} alt="arrow" />
      </button>
    </div>
  );
};
