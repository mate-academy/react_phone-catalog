import './PageSlider.scss';

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

export const PageSlider: React.FC<Props> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageClick = (newPage: number) => {
    onPageChange(newPage);
  };

  return (
    <div className="page-slider">
      {pages.map((pageNumber) => (
        <div
          key={pageNumber}
          role="button"
          tabIndex={0}
          className={`page-slider__item ${currentPage === pageNumber ? 'active' : ''}`}
          onClick={() => handlePageClick(pageNumber)}
          onKeyDown={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
        </div>
      ))}
    </div>
  );
};
