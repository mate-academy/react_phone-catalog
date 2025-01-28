import { scrollToTop } from '../../Tools/ScrollToTop';
import style from './Pagination.module.scss';

type Props = {
  currentPage: number;
  onCurrentPage: (page: number) => void;
  totalPages: number;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  onCurrentPage,
  totalPages,
}) => {
  return (
    <div className={style.pagination}>
      <button
        className={`${style.pagination__button} ${style['pagination__button--prev']}`}
        disabled={currentPage === 1}
        onClick={() => {
          onCurrentPage(currentPage - 1);
          scrollToTop();
        }}
      ></button>
      <div className={style.pagination__pages}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`${style.pagination__button} ${style['pagination__button--page']} ${currentPage === index + 1 ? style.active : ''}`}
            onClick={() => {
              onCurrentPage(index + 1);
              scrollToTop();
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        className={`${style.pagination__button} ${style['pagination__button--next']}`}
        disabled={currentPage === totalPages}
        onClick={() => {
          onCurrentPage(currentPage + 1);
          scrollToTop();
        }}
      ></button>
    </div>
  );
};
