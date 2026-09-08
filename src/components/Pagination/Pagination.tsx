import './Pagination.module.scss';
import Chevron from '../../../public/img/icons/Chevron (Arrow Right).svg';

interface Props {
  totalPosts: number;
  itemsOnPage: number | 'all';
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  totalPosts,
  itemsOnPage,
  currentPage,
  onPageChange,
}) => {
  if (itemsOnPage === 'all') {
    return null;
  }

  const totalPages = Math.ceil(totalPosts / itemsOnPage);

  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="container">
      <div className="pagination">
        <button
          onClick={() => {
            onPageChange(currentPage - 1);
            scrollToTop();
          }}
          disabled={currentPage === 1}
          className="pagination_btn pagination_btn--side"
        >
          <img className="pagination_icon" src={Chevron} alt="icon" />
        </button>

        <div className="pagination_center">
          {pages.map(page => (
            <button
              key={page}
              className={
                page === currentPage
                  ? 'pagination_btn pagination_btn--active'
                  : 'pagination_btn'
              }
              onClick={() => {
                onPageChange(page);
                scrollToTop();
              }}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            onPageChange(currentPage + 1);
            scrollToTop();
          }}
          disabled={currentPage === totalPages}
          className="pagination_btn pagination_btn--side"
        >
          <img
            className="pagination_icon pagination_icon--right"
            src={Chevron}
            alt="icon"
          />
        </button>
      </div>
    </div>
  );
};
